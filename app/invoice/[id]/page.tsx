'use client';

import { useEffect, useState, use } from 'react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import InvoiceEditor from '@/components/InvoiceEditor';
import InvoicePreview from '@/components/InvoicePreview';
import AIAssistant from '@/components/AIAssistant';
import { ArrowLeft, Download, Eye, Edit3, Sparkles, Mail } from 'lucide-react';

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { invoices, setCurrentInvoice } = useAppStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const invoice = invoices.find((inv) => inv.id === resolvedParams.id);

  useEffect(() => {
    if (!invoice) {
      router.push('/');
    } else {
      setCurrentInvoice(resolvedParams.id);
      setEmailForm({
        to: invoice.toEmail || '',
        subject: `Invoice ${invoice.invoiceNumber} from ${invoice.fromName || 'us'}`,
        body: `Hi ${invoice.toName || 'there'},\n\nPlease find attached the invoice ${invoice.invoiceNumber} for the recent services/products.\n\nTotal Amount: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency }).format(invoice.items.reduce((sum, item) => sum + item.amount, 0) * (1 - invoice.discountPercent / 100) * (1 + invoice.taxPercent / 100))}\nDue Date: ${new Date(invoice.dueDate).toLocaleDateString()}\n\nThank you for your business!\n\nBest regards,\n${invoice.fromName}`
      });
    }
  }, [invoice, resolvedParams.id, router, setCurrentInvoice]);

  if (!invoice) return null;

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${emailForm.to}?subject=${encodeURIComponent(emailForm.subject)}&body=${encodeURIComponent(emailForm.body + '\n\n(Please find the PDF invoice attached)')}`;
    window.location.href = mailtoLink;
    setShowEmailModal(false);
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const sourceElement = document.getElementById('invoice-preview');
      const targetElement = document.getElementById('pdf-render-target');
      
      if (!sourceElement || !targetElement) return;

      // Copy HTML
      targetElement.innerHTML = sourceElement.innerHTML;

      // Fix inline styles on the template
      const allElements = targetElement.querySelectorAll('*');
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.maxWidth = 'none';
        
        // Remove overflow hidden if it exists
        if (getComputedStyle(htmlEl).overflow === 'hidden') {
          htmlEl.style.overflow = 'visible';
        }
        
        // Ensure tables are full width
        if (htmlEl.tagName.toLowerCase() === 'table') {
          htmlEl.style.width = '100%';
        }
      });

      // Ensure fonts are loaded
      await document.fonts.ready;
      
      // Ensure the element is fully rendered before capturing
      await new Promise(resolve => setTimeout(resolve, 100));

      // @ts-ignore
      const html2pdf = (await import('html2pdf.js')).default;

      const options = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `${invoice.invoiceNumber}_${invoice.toName.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          width: 794,
          windowWidth: 794
        },
        jsPDF: { 
          unit: 'mm' as const, 
          format: 'a4' as const, 
          orientation: 'portrait' as const 
        }
      };

      await html2pdf().set(options).from(targetElement).save();

      // Clear the target
      targetElement.innerHTML = '';
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              title="Back to Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">
              {invoice.invoiceNumber}
            </h1>
          </div>

          {/* Mobile Tabs */}
          <div className="flex lg:hidden bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'edit' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Edit3 size={16} />
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'preview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Eye size={16} />
              Preview
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowAIPanel(!showAIPanel)}
              className="flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              <Sparkles size={18} className="text-indigo-500" />
              <span className="hidden sm:inline">Auto-fill</span>
            </button>
            <button
              onClick={() => setShowEmailModal(true)}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              <Mail size={18} />
              <span className="hidden sm:inline">Send Email</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              <Download size={18} />
              <span className="hidden sm:inline">
                {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* Editor Column */}
        <div className={`lg:block ${activeTab === 'edit' ? 'block' : 'hidden'}`}>
          <InvoiceEditor invoice={invoice} />
        </div>

        {/* Preview Column */}
        <div className={`lg:block ${activeTab === 'preview' ? 'block' : 'hidden'}`}>
          <div className="lg:sticky lg:top-24">
            <InvoicePreview invoice={invoice} />
          </div>
        </div>

        {/* AI Assistant Panel */}
        {showAIPanel && (
          <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl border-l border-gray-200 z-40 transform transition-transform duration-300 ease-in-out">
            <AIAssistant invoice={invoice} onClose={() => setShowAIPanel(false)} />
          </div>
        )}
      </main>
      
      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Send Invoice via Email</h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-500">
                This will open your default email client with the details below. Don&apos;t forget to download and attach the PDF invoice!
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="email"
                  value={emailForm.to}
                  onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={emailForm.body}
                  onChange={(e) => setEmailForm({ ...emailForm, body: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border resize-none"
                  rows={8}
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Mail size={16} />
                Open Email Client
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-gray-400 pb-8 pt-4">
        Designed & Built by ZedTech +2348060541643
      </div>

      {/* Hidden PDF Render Target */}
      <div 
        id="pdf-render-target" 
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          visibility: 'hidden',
          width: '794px',
          backgroundColor: '#ffffff',
          padding: '40px'
        }}
      ></div>
    </div>
  );
}
