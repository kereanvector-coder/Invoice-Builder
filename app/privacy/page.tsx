import Link from 'next/link';
import { FileText, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — Invoice Builda',
};

export default function PrivacyPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">PRIVACY POLICY</h1>
            <p className="text-gray-400">Invoice Builda<br/>Last updated: April 4, 2026</p>
          </div>

          <section className="space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white">THE SHORT VERSION:</h2>
            <p className="text-lg">We don&apos;t collect your data. We can&apos;t see your invoices. We don&apos;t know who your clients are. That&apos;s the whole policy.</p>
          </section>

          <div className="pt-8">
            <h2 className="text-2xl font-bold text-white mb-8">THE FULL VERSION:</h2>
            
            <div className="space-y-8">
              <section className="space-y-3">
                <h3 className="text-xl font-bold text-white">1. WHO WE ARE</h3>
                <p>Invoice Builda is operated by ZedTech. We build tools for freelancers and small businesses. Contact: <a href="mailto:zedirastudio@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">zedirastudio@gmail.com</a></p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-white">2. WHAT DATA WE COLLECT</h3>
                <p>We collect no personal data. Invoice Builda runs entirely in your browser.</p>
                <p>Specifically, we do NOT collect:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Your name, email address, or any contact information</li>
                  <li>Your business name, client names, or invoice content</li>
                  <li>Your financial data, amounts, or payment information</li>
                  <li>Your IP address or device identifiers</li>
                  <li>Any usage analytics or behavioral data</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-white">3. LOCAL STORAGE</h3>
                <p>Invoice Builda stores your business profile, saved signatures, and preferences in your browser&apos;s localStorage. This data:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Never leaves your device</li>
                  <li>Is not accessible to us or any third party</li>
                  <li>Can be deleted at any time by clearing your browser data</li>
                  <li>Is lost permanently if you clear your browser or switch devices</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-white">4. AI PROCESSING</h3>
                <p>When you use the AI invoice generation feature, your description text is sent to Google&apos;s Gemini API solely to generate invoice content. This transmission is governed by Google&apos;s Privacy Policy (policies.google.com/privacy). We do not store or log any prompts or responses.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-white">5. COOKIES</h3>
                <p>Invoice Builda does not use cookies for tracking or advertising purposes.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-white">6. THIRD-PARTY SERVICES</h3>
                <p>Invoice Builda is hosted on Netlify. Netlify may collect standard server logs (IP addresses, access times) as part of their hosting infrastructure. This is governed by Netlify&apos;s Privacy Policy (netlify.com/privacy).</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-white">7. CHILDREN&apos;S PRIVACY</h3>
                <p>Invoice Builda is not directed at children under 13. We do not knowingly collect data from children.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-white">8. YOUR RIGHTS</h3>
                <p>Since we collect no personal data, there is nothing for us to delete, export, or correct on our end. To remove your data, simply clear your browser&apos;s localStorage.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-white">9. CHANGES TO THIS POLICY</h3>
                <p>We will update this page if our privacy practices change. The &quot;last updated&quot; date at the top will reflect any changes.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-bold text-white">10. CONTACT</h3>
                <p>Questions about this Privacy Policy?<br/>Email us: <a href="mailto:zedirastudio@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">zedirastudio@gmail.com</a></p>
              </section>
            </div>
          </div>
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
