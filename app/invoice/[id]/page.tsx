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

      // Make the root template element stretch to fill the A4 page
      if (targetElement.firstElementChild) {
        const rootEl = targetElement.firstElementChild as HTMLElement;
        rootEl.style.flexGrow = '1';
        rootEl.style.width = '100%';
      }

      // Helper to convert any color to RGBA using Canvas
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      const convertColorToRgba = (color: string) => {
        if (!ctx || !color) return color;
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        const data = ctx.getImageData(0, 0, 1, 1).data;
        return `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
      };

      const convertOklchInString = (str: string) => {
        if (!str || (!str.includes('oklch') && !str.includes('color('))) return str;
        return str.replace(/(oklch\([^)]+\)|color\([^)]+\))/g, (match) => {
          return convertColorToRgba(match);
        });
      };

      // Fix inline styles on the template
      const allElements = targetElement.querySelectorAll('*');
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.maxWidth = 'none';
        
        const computedStyle = getComputedStyle(htmlEl);
        
        // Remove overflow hidden if it exists
        if (computedStyle.overflow === 'hidden') {
          htmlEl.style.overflow = 'visible';
        }
        
        // Ensure tables are full width
        if (htmlEl.tagName.toLowerCase() === 'table') {
          htmlEl.style.width = '100%';
        }

        // Convert oklch colors to rgba for html2canvas compatibility
        // Iterate over all computed properties to catch boxShadow, textShadow, etc.
        for (let i = 0; i < computedStyle.length; i++) {
          const prop = computedStyle[i];
          const val = computedStyle.getPropertyValue(prop);
          if (val && (val.includes('oklch') || val.includes('color('))) {
            htmlEl.style.setProperty(prop, convertOklchInString(val), computedStyle.getPropertyPriority(prop));
          }
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
          windowWidth: 794,
          scrollY: 0,
          scrollX: 0
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
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-0 sm:h-16 flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-2">
          <div className="flex items-center gap-1 sm:gap-4 order-1">
            <button
              onClick={() => router.push('/')}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              title="Back to Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors hidden sm:block"
              title="Back to Dashboard"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">
              {invoice.invoiceNumber}
            </h1>
          </div>

          {/* Mobile Tabs */}
          <div className="flex lg:hidden bg-gray-100 p-1 rounded-lg w-full sm:w-auto order-3 sm:order-2">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'edit' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Edit3 size={16} />
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'preview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Eye size={16} />
              Preview
            </button>
          </div>

          <div className="flex items-center gap-1 sm:gap-3 order-2 sm:order-3">
            <button
              onClick={() => setShowAIPanel(!showAIPanel)}
              className="flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
              title="Auto-fill"
            >
              <Sparkles size={18} className="text-indigo-500" />
              <span className="hidden sm:inline">Auto-fill</span>
            </button>
            <button
              onClick={() => setShowEmailModal(true)}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
              title="Send Email"
            >
              <Mail size={18} />
              <span className="hidden sm:inline">Send Email</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
              title="Download PDF"
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
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', overflow: 'visible' }}>
        <div 
          id="pdf-render-target" 
          style={{
            width: '794px',
            minHeight: '1123px',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column'
          }}
        ></div>
      </div>
    </div>
  );
}
