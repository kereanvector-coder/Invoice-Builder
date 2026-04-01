'use client';

import { useEffect, useState, use } from 'react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import InvoiceEditor from '@/components/InvoiceEditor';
import InvoicePreview from '@/components/InvoicePreview';
import AIAssistant from '@/components/AIAssistant';
import { ArrowLeft, Download, Eye, Edit3, Sparkles } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { invoices, setCurrentInvoice } = useAppStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);

  const invoice = invoices.find((inv) => inv.id === resolvedParams.id);

  useEffect(() => {
    if (!invoice) {
      router.push('/');
    } else {
      setCurrentInvoice(resolvedParams.id);
    }
  }, [invoice, resolvedParams.id, router, setCurrentInvoice]);

  if (!invoice) return null;

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const element = document.getElementById('invoice-preview');
      if (!element) return;

      // Ensure fonts are loaded
      await document.fonts.ready;
      
      // Ensure the element is fully rendered before capturing
      await new Promise(resolve => setTimeout(resolve, 100));

      // Workaround for viewport cropping bug
      const originalScrollY = window.scrollY;
      const parentElement = element.parentElement;
      const originalParentScrollX = parentElement ? parentElement.scrollLeft : 0;
      const originalParentScrollY = parentElement ? parentElement.scrollTop : 0;
      
      window.scrollTo(0, 0);
      if (parentElement) {
        parentElement.scrollTo(0, 0);
      }

      const imgData = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: `${element.scrollWidth}px`,
          height: `${element.scrollHeight}px`,
        }
      });
      
      // Restore scroll position
      window.scrollTo(0, originalScrollY);
      if (parentElement) {
        parentElement.scrollTo(originalParentScrollX, originalParentScrollY);
      }

      // A4 width is 210 mm
      const pdfWidth = 210;
      
      // Calculate the height based on the element's aspect ratio
      // We need to get the image dimensions to calculate the exact height
      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      const pdfHeight = (img.height * pdfWidth) / img.width;

      // Create a PDF with a custom page size that exactly matches the invoice height
      // This prevents text overflow or clipping across multiple pages
      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      pdf.save(`${invoice.invoiceNumber}.pdf`);
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
        <div className={`lg:block ${activeTab === 'preview' ? 'block' : 'hidden'} overflow-hidden`}>
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
      
      <div className="text-center text-sm text-gray-400 pb-8 pt-4">
        Designed & Built by ZedTech +2348060541643
      </div>
    </div>
  );
}
