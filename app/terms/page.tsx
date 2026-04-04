import Link from 'next/link';
import { FileText, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service — Invoice Builda',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-shadow duration-500">
              <FileText size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Invoice Builda</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard" 
              className="group relative inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white transition-all duration-200 bg-white/10 border border-white/10 rounded-full hover:bg-white/20 hover:scale-105"
            >
              <span>Get Started</span>
              <ChevronRight size={16} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[680px] mx-auto text-gray-300 leading-relaxed space-y-8">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">TERMS OF SERVICE</h1>
            <p className="text-gray-400">Invoice Builda<br/>Last updated: April 4, 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. ACCEPTANCE OF TERMS</h2>
            <p>By accessing or using Invoice Builda (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. DESCRIPTION OF SERVICE</h2>
            <p>Invoice Builda is a free, browser-based invoice generation tool that allows users to create, customize, and download professional invoices as PDF files. The Service uses AI to assist with invoice content generation.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. NO ACCOUNT REQUIRED</h2>
            <p>Invoice Builda does not require you to create an account. All data you enter is stored locally in your browser (localStorage) and is never transmitted to or stored on our servers.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. YOUR DATA</h2>
            <p>All invoice data, business profiles, and signatures you create remain on your device. We do not collect, store, transmit, or have access to any information you enter into Invoice Builda. Clearing your browser data will permanently delete your saved information.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. AI-GENERATED CONTENT</h2>
            <p>Invoice Builda uses AI to help generate invoice content from your plain-language descriptions. You are solely responsible for reviewing, verifying, and approving all AI-generated content before downloading or sending any invoice. We make no guarantees about the accuracy of AI-generated line items, amounts, or dates.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. ACCEPTABLE USE</h2>
            <p>You agree not to use Invoice Builda to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Create fraudulent or misleading invoices</li>
              <li>Violate any applicable law or regulation</li>
              <li>Infringe the intellectual property rights of any third party</li>
              <li>Attempt to reverse engineer or compromise the Service</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">7. INTELLECTUAL PROPERTY</h2>
            <p>The Invoice Builda name, logo, templates, and underlying technology are the property of ZedTech. You retain full ownership of any invoices you create using the Service.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">8. DISCLAIMER OF WARRANTIES</h2>
            <p>Invoice Builda is provided &quot;as is&quot; without warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted, error-free, or suitable for any particular purpose.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">9. LIMITATION OF LIABILITY</h2>
            <p>To the fullest extent permitted by law, ZedTech shall not be liable for any indirect, incidental, or consequential damages arising from your use of Invoice Builda, including any financial loss resulting from reliance on AI-generated invoice content.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">10. CHANGES TO TERMS</h2>
            <p>We reserve the right to update these Terms at any time. Continued use of the Service after changes are posted constitutes acceptance of the new Terms.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">11. CONTACT</h2>
            <p>For questions about these Terms, contact us at: <a href="mailto:zedirastudio@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">zedirastudio@gmail.com</a></p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0A0A0A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center">
                <FileText size={12} className="text-white" />
              </div>
              <span className="font-semibold text-white tracking-tight">Invoice Builda</span>
            </div>
            <div className="text-gray-500 text-sm mt-2">
              Designed & Built by ZedTech <a href="mailto:zedirastudio@gmail.com" className="hover:text-white transition-colors">zedirastudio@gmail.com</a>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            &copy; 2026 Invoice Builda by ZedTech. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
