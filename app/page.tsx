'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { FileText, Sparkles, Download, Smartphone, ArrowRight, CheckCircle2, Zap, Shield, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-shadow duration-500">
              <FileText size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Invoicer</span>
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <Sparkles size={14} className="text-indigo-400" />
          <span>Introducing AI-Powered Auto-fill</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-8 max-w-5xl leading-[1.05]"
        >
          Invoicing, reimagined for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">AI era.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed font-light tracking-wide"
        >
          Generate pixel-perfect, professional invoices in seconds. Describe your work in plain English and let our AI handle the line items, taxes, and formatting.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto z-10"
        >
          <Link 
            href="/dashboard" 
            className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Start Invoicing Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Hero Abstract Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10 h-full w-full pointer-events-none"></div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111111] shadow-2xl aspect-[16/9] md:aspect-[21/9] flex items-center justify-center">
            {/* Abstract UI representation */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            
            <div className="relative w-3/4 max-w-2xl bg-[#1A1A1A] rounded-xl border border-white/10 p-6 shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="w-24 h-4 bg-white/5 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="w-32 h-6 bg-white/10 rounded-md"></div>
                  <div className="w-16 h-6 bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center rounded-md border border-indigo-500/30">PAID</div>
                </div>
                <div className="w-full h-px bg-white/5 my-4"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex gap-4 items-center w-2/3">
                      <div className="w-8 h-8 rounded bg-white/5"></div>
                      <div className="w-full h-4 bg-white/5 rounded"></div>
                    </div>
                    <div className="w-16 h-4 bg-white/5 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Powerful features.<br/><span className="text-gray-500">Zero complexity.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Feature 1: Large AI Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50"></div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
                  <Sparkles className="text-indigo-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">AI-Powered Generation</h3>
                <p className="text-gray-400 max-w-md">Type "Built a website for 50 hours at $100/hr" and watch as our AI instantly creates perfectly formatted line items, calculates totals, and applies taxes.</p>
              </div>
              <div className="mt-8 p-4 rounded-xl bg-black/50 border border-white/5 font-mono text-sm text-gray-300">
                <span className="text-indigo-400">Prompt:</span> "Redesigned landing page, 12 hours at $150/hr"
                <br/>
                <span className="text-green-400 mt-2 block">→ Generated: Line Item 1 | Qty: 12 | Rate: $150 | Total: $1,800</span>
              </div>
            </motion.div>

            {/* Feature 2: PDF Export */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6">
                  <Download className="text-blue-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">1-Click PDF</h3>
                <p className="text-gray-400">Generate pixel-perfect, print-ready PDFs instantly without leaving your browser.</p>
              </div>
            </motion.div>

            {/* Feature 3: Mobile Ready */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6">
                  <Smartphone className="text-purple-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Mobile Native</h3>
                <p className="text-gray-400">Create, edit, and send invoices on the go. Our editor is fully optimized for your phone.</p>
              </div>
            </motion.div>

            {/* Feature 4: Wide Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden group gap-8"
            >
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6">
                  <Shield className="text-emerald-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Private & Secure</h3>
                <p className="text-gray-400 max-w-md">No sign-up required. Your data is stored securely in your browser. We don't track your clients or your revenue.</p>
              </div>
              <div className="flex-1 w-full flex justify-end">
                 <div className="w-full max-w-[200px] h-32 bg-black/50 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
                    <div className="w-full h-3 bg-white/10 rounded-full"></div>
                    <div className="w-3/4 h-3 bg-white/10 rounded-full"></div>
                    <div className="w-1/2 h-3 bg-white/10 rounded-full"></div>
                    <div className="mt-auto flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                      <span className="text-xs text-gray-400 font-mono">Local Storage</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/20 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Ready to get paid faster?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 mb-10"
          >
            Join thousands of freelancers and businesses who have upgraded their invoicing workflow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/dashboard" 
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              Create Your First Invoice
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0A0A0A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded flex items-center justify-center">
                <FileText size={12} className="text-white" />
              </div>
              <span className="font-semibold text-white tracking-tight">Invoicer</span>
            </div>
            <div className="text-gray-500 text-sm mt-2">
              Designed & Built by ZedTech +2348060541643
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Invoicer. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
