/* eslint-disable @next/next/no-img-element */
import { Invoice } from '@/lib/types';
import { format } from 'date-fns';

export default function InvoicePreview({ invoice }: { invoice: Invoice }) {
  const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
  const discountAmount = subtotal * (invoice.discountPercent / 100);
  const taxAmount = (subtotal - discountAmount) * (invoice.taxPercent / 100);
  const total = subtotal - discountAmount + taxAmount;

  const invoiceTitle = invoice.status === 'Proforma' ? 'PROFORMA INVOICE' : 'INVOICE';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: invoice.currency,
    }).format(amount);
  };

  const renderTemplate = () => {
    switch (invoice.template) {
      case 'minimal':
        return <MinimalTemplate invoice={invoice} formatCurrency={formatCurrency} subtotal={subtotal} discountAmount={discountAmount} taxAmount={taxAmount} total={total} invoiceTitle={invoiceTitle} />;
      case 'bold':
        return <BoldTemplate invoice={invoice} formatCurrency={formatCurrency} subtotal={subtotal} discountAmount={discountAmount} taxAmount={taxAmount} total={total} invoiceTitle={invoiceTitle} />;
      case 'corporate':
        return <CorporateTemplate invoice={invoice} formatCurrency={formatCurrency} subtotal={subtotal} discountAmount={discountAmount} taxAmount={taxAmount} total={total} invoiceTitle={invoiceTitle} />;
      case 'creative':
        return <CreativeTemplate invoice={invoice} formatCurrency={formatCurrency} subtotal={subtotal} discountAmount={discountAmount} taxAmount={taxAmount} total={total} invoiceTitle={invoiceTitle} />;
      case 'futuristic':
        return <FuturisticTemplate invoice={invoice} formatCurrency={formatCurrency} subtotal={subtotal} discountAmount={discountAmount} taxAmount={taxAmount} total={total} invoiceTitle={invoiceTitle} />;
      case 'ecommerce':
        return <EcommerceTemplate invoice={invoice} formatCurrency={formatCurrency} subtotal={subtotal} discountAmount={discountAmount} taxAmount={taxAmount} total={total} invoiceTitle={invoiceTitle} />;
      case 'elegant':
        return <ElegantTemplate invoice={invoice} formatCurrency={formatCurrency} subtotal={subtotal} discountAmount={discountAmount} taxAmount={taxAmount} total={total} invoiceTitle={invoiceTitle} />;
      case 'startup':
        return <StartupTemplate invoice={invoice} formatCurrency={formatCurrency} subtotal={subtotal} discountAmount={discountAmount} taxAmount={taxAmount} total={total} invoiceTitle={invoiceTitle} />;
      case 'monospace':
        return <MonospaceTemplate invoice={invoice} formatCurrency={formatCurrency} subtotal={subtotal} discountAmount={discountAmount} taxAmount={taxAmount} total={total} invoiceTitle={invoiceTitle} />;
      case 'modern':
        return <ModernTemplate invoice={invoice} formatCurrency={formatCurrency} subtotal={subtotal} discountAmount={discountAmount} taxAmount={taxAmount} total={total} invoiceTitle={invoiceTitle} />;
      case 'playful':
        return <PlayfulTemplate invoice={invoice} formatCurrency={formatCurrency} subtotal={subtotal} discountAmount={discountAmount} taxAmount={taxAmount} total={total} invoiceTitle={invoiceTitle} />;
      case 'classic':
      default:
        return <ClassicTemplate invoice={invoice} formatCurrency={formatCurrency} subtotal={subtotal} discountAmount={discountAmount} taxAmount={taxAmount} total={total} invoiceTitle={invoiceTitle} />;
    }
  };

  return (
    <div className="bg-gray-200 p-2 sm:p-4 md:p-8 rounded-xl flex justify-center overflow-x-auto min-h-[800px]">
      <div
        id="invoice-preview"
        className="bg-white shadow-2xl w-[210mm] min-h-[297mm] relative transform origin-top-left scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 mb-[-50%] sm:mb-[-30%] md:mb-[-10%] lg:mb-0"
        style={{ width: '210mm', minHeight: '297mm' }} // A4 dimensions
      >
        {renderTemplate()}
      </div>
    </div>
  );
}

// Helper props type
type TemplateProps = {
  invoice: Invoice;
  formatCurrency: (amount: number) => string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
  invoiceTitle: string;
};

// --- TEMPLATES ---

function ClassicTemplate({ invoice, formatCurrency, subtotal, discountAmount, taxAmount, total, invoiceTitle }: TemplateProps) {
  return (
    <div className="p-12 text-slate-800 font-sans bg-white min-h-full flex flex-col">
      <div className="flex justify-between items-start mb-12">
        <div className="max-w-[50%]">
          {invoice.logoUrl ? (
            <div className="relative h-20 w-48 mb-6">
              <img src={invoice.logoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-contain object-left" />
            </div>
          ) : (
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{invoice.fromName || 'Company Name'}</h1>
          )}
          <div className="text-sm text-slate-500 whitespace-pre-wrap leading-relaxed">{invoice.fromAddress}</div>
          <div className="text-sm text-slate-500 mt-1">{invoice.fromEmail}</div>
          <div className="text-sm text-slate-500">{invoice.fromPhone}</div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-light text-slate-300 uppercase tracking-widest mb-6">{invoiceTitle}</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-600 text-right">
            <div className="font-medium text-slate-400 uppercase tracking-wider text-xs self-center">Invoice No.</div>
            <div className="font-medium text-slate-900">{invoice.invoiceNumber}</div>
            <div className="font-medium text-slate-400 uppercase tracking-wider text-xs self-center">Date</div>
            <div className="font-medium text-slate-900">{format(new Date(invoice.issueDate), 'MMM dd, yyyy')}</div>
            <div className="font-medium text-slate-400 uppercase tracking-wider text-xs self-center">Due Date</div>
            <div className="font-medium text-slate-900">{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</div>
          </div>
        </div>
      </div>

      <div className="mb-12 p-6 bg-slate-50 rounded-xl border border-slate-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Bill To</h3>
        <div className="font-semibold text-slate-900 text-lg mb-1">{invoice.toName || 'Client Name'}</div>
        <div className="text-sm text-slate-500 whitespace-pre-wrap leading-relaxed">{invoice.toAddress}</div>
        <div className="text-sm text-slate-500 mt-1">{invoice.toEmail}</div>
        <div className="text-sm text-slate-500">{invoice.toPhone}</div>
      </div>

      <table className="w-full mb-8 flex-grow">
        <thead>
          <tr className="border-b-2 border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <th className="text-left py-3 px-2">Description</th>
            <th className="text-right py-3 px-2">Qty</th>
            <th className="text-right py-3 px-2">Rate</th>
            <th className="text-right py-3 px-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i} className="border-b border-slate-100 text-sm">
              <td className="py-4 px-2 text-slate-800 font-medium">{item.description || '-'}</td>
              <td className="py-4 px-2 text-right text-slate-500">{item.quantity}</td>
              <td className="py-4 px-2 text-right text-slate-500">{formatCurrency(item.rate)}</td>
              <td className="py-4 px-2 text-right font-semibold text-slate-900">{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-12">
        <div className="w-80 space-y-3 text-sm">
          <div className="flex justify-between text-slate-500 px-2">
            <span>Subtotal</span>
            <span className="font-medium text-slate-900">{formatCurrency(subtotal)}</span>
          </div>
          {invoice.discountPercent > 0 && (
            <div className="flex justify-between text-slate-500 px-2">
              <span>Discount ({invoice.discountPercent}%)</span>
              <span className="font-medium text-red-500">-{formatCurrency(discountAmount)}</span>
            </div>
          )}
          {invoice.taxPercent > 0 && (
            <div className="flex justify-between text-slate-500 px-2">
              <span>Tax ({invoice.taxPercent}%)</span>
              <span className="font-medium text-slate-900">{formatCurrency(taxAmount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-xl text-slate-900 border-t-2 border-slate-800 pt-4 px-2 mt-4">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 text-sm text-slate-500 border-t border-slate-200 pt-8 mt-auto">
        {invoice.notes && (
          <div>
            <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wider text-xs">Notes</h4>
            <p className="whitespace-pre-wrap leading-relaxed">{invoice.notes}</p>
          </div>
        )}
        {invoice.paymentInfo && (
          <div>
            <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wider text-xs">Payment Information</h4>
            <p className="whitespace-pre-wrap leading-relaxed">{invoice.paymentInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MinimalTemplate({ invoice, formatCurrency, subtotal, discountAmount, taxAmount, total, invoiceTitle }: TemplateProps) {
  return (
    <div className="p-16 text-slate-900 font-sans bg-white min-h-full flex flex-col">
      <div className="flex justify-between items-end mb-16 border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-5xl font-extralight tracking-tight mb-3 text-slate-800">{invoiceTitle}</h1>
          <div className="text-slate-400 font-medium tracking-widest uppercase text-sm">No. {invoice.invoiceNumber}</div>
        </div>
        <div className="text-right text-sm text-slate-500 space-y-2">
          <div className="flex justify-end gap-4"><span className="text-slate-400 uppercase tracking-widest text-xs self-center">Issued</span> <span className="text-slate-800 font-medium">{format(new Date(invoice.issueDate), 'MMM dd, yyyy')}</span></div>
          <div className="flex justify-end gap-4"><span className="text-slate-400 uppercase tracking-widest text-xs self-center">Due</span> <span className="text-slate-800 font-medium">{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-16 mb-16 text-sm">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-6">From</div>
          {invoice.logoUrl && (
            <div className="relative h-12 w-32 mb-6">
              <img src={invoice.logoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-contain object-left" />
            </div>
          )}
          <div className="font-medium text-base text-slate-900 mb-2">{invoice.fromName}</div>
          <div className="text-slate-500 whitespace-pre-wrap leading-relaxed">{invoice.fromAddress}</div>
          <div className="text-slate-500 mt-1">{invoice.fromEmail}</div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-6">To</div>
          <div className="font-medium text-base text-slate-900 mb-2">{invoice.toName}</div>
          <div className="text-slate-500 whitespace-pre-wrap leading-relaxed">{invoice.toAddress}</div>
          <div className="text-slate-500 mt-1">{invoice.toEmail}</div>
        </div>
      </div>

      <div className="mb-16 flex-grow">
        <div className="grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-widest text-slate-300 border-b border-slate-100 pb-4 mb-4">
          <div className="col-span-6">Item</div>
          <div className="col-span-2 text-right">Qty</div>
          <div className="col-span-2 text-right">Rate</div>
          <div className="col-span-2 text-right">Amount</div>
        </div>
        {invoice.items.map((item, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 text-sm py-4 border-b border-slate-50">
            <div className="col-span-6 text-slate-700">{item.description}</div>
            <div className="col-span-2 text-right text-slate-400">{item.quantity}</div>
            <div className="col-span-2 text-right text-slate-400">{formatCurrency(item.rate)}</div>
            <div className="col-span-2 text-right font-medium text-slate-800">{formatCurrency(item.amount)}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mb-16">
        <div className="w-80 text-sm">
          <div className="flex justify-between py-3 text-slate-500 border-b border-slate-50">
            <span>Subtotal</span>
            <span className="text-slate-800 font-medium">{formatCurrency(subtotal)}</span>
          </div>
          {invoice.discountPercent > 0 && (
            <div className="flex justify-between py-3 text-slate-500 border-b border-slate-50">
              <span>Discount</span>
              <span className="text-red-400 font-medium">-{formatCurrency(discountAmount)}</span>
            </div>
          )}
          {invoice.taxPercent > 0 && (
            <div className="flex justify-between py-3 text-slate-500 border-b border-slate-50">
              <span>Tax</span>
              <span className="text-slate-800 font-medium">{formatCurrency(taxAmount)}</span>
            </div>
          )}
          <div className="flex justify-between py-6 mt-2 font-medium text-2xl text-slate-900">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-slate-500 max-w-xl space-y-8 mt-auto">
        {invoice.notes && (
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-3">Notes</div>
            <div className="leading-relaxed">{invoice.notes}</div>
          </div>
        )}
        {invoice.paymentInfo && (
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-3">Payment Info</div>
            <div className="leading-relaxed">{invoice.paymentInfo}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function BoldTemplate({ invoice, formatCurrency, subtotal, discountAmount, taxAmount, total, invoiceTitle }: TemplateProps) {
  return (
    <div className="font-sans bg-white min-h-full flex flex-col">
      <div className="bg-black text-white p-12 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">{invoiceTitle}</h1>
          <div className="text-xl font-bold text-gray-400">#{invoice.invoiceNumber}</div>
        </div>
        {invoice.logoUrl && (
          <div className="relative h-16 w-32 bg-white p-2 rounded">
            <img src={invoice.logoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-contain p-2" />
          </div>
        )}
      </div>

      <div className="p-12 flex-grow flex flex-col">
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-black">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">From</h3>
            <div className="font-bold text-xl mb-2 text-black">{invoice.fromName}</div>
            <div className="text-gray-600 whitespace-pre-wrap font-medium">{invoice.fromAddress}</div>
            <div className="text-gray-600 font-medium mt-1">{invoice.fromEmail}</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-black">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">To</h3>
            <div className="font-bold text-xl mb-2 text-black">{invoice.toName}</div>
            <div className="text-gray-600 whitespace-pre-wrap font-medium">{invoice.toAddress}</div>
            <div className="text-gray-600 font-medium mt-1">{invoice.toEmail}</div>
          </div>
        </div>

        <div className="flex justify-between mb-12 text-sm font-bold bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div><span className="text-gray-400 uppercase mr-2 tracking-wider">Issue Date:</span> <span className="text-black">{format(new Date(invoice.issueDate), 'MMM dd, yyyy')}</span></div>
          <div><span className="text-gray-400 uppercase mr-2 tracking-wider">Due Date:</span> <span className="text-black">{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</span></div>
          <div><span className="text-gray-400 uppercase mr-2 tracking-wider">Terms:</span> <span className="text-black">{invoice.paymentTerms}</span></div>
        </div>

        <table className="w-full mb-12 flex-grow">
          <thead>
            <tr className="bg-black text-white text-sm font-bold uppercase tracking-wider">
              <th className="text-left p-4 rounded-tl-lg">Description</th>
              <th className="text-right p-4">Qty</th>
              <th className="text-right p-4">Rate</th>
              <th className="text-right p-4 rounded-tr-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i} className="border-b-2 border-gray-100 font-medium text-black">
                <td className="p-4">{item.description}</td>
                <td className="p-4 text-right text-gray-500">{item.quantity}</td>
                <td className="p-4 text-right text-gray-500">{formatCurrency(item.rate)}</td>
                <td className="p-4 text-right font-bold">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-12">
          <div className="w-80 bg-gray-50 p-6 rounded-xl border-2 border-black">
            <div className="flex justify-between mb-3 font-bold text-gray-500">
              <span className="uppercase tracking-wider text-xs self-center">Subtotal</span>
              <span className="text-black text-base">{formatCurrency(subtotal)}</span>
            </div>
            {invoice.discountPercent > 0 && (
              <div className="flex justify-between mb-3 font-bold text-gray-500">
                <span className="uppercase tracking-wider text-xs self-center">Discount</span>
                <span className="text-red-500 text-base">-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            {invoice.taxPercent > 0 && (
              <div className="flex justify-between mb-4 font-bold text-gray-500">
                <span className="uppercase tracking-wider text-xs self-center">Tax</span>
                <span className="text-black text-base">{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-2xl pt-4 border-t-2 border-black text-black">
              <span className="uppercase tracking-tighter">Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="text-sm font-medium text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-100 mt-auto">
          {invoice.notes && <div className="mb-4"><span className="font-black text-black uppercase tracking-widest text-xs block mb-2">Notes</span>{invoice.notes}</div>}
          {invoice.paymentInfo && <div><span className="font-black text-black uppercase tracking-widest text-xs block mb-2">Payment Info</span>{invoice.paymentInfo}</div>}
        </div>
      </div>
    </div>
  );
}

function CorporateTemplate({ invoice, formatCurrency, subtotal, discountAmount, taxAmount, total, invoiceTitle }: TemplateProps) {
  return (
    <div className="p-12 font-sans text-slate-800 bg-white min-h-full flex flex-col">
      <div className="border-b-2 border-slate-900 pb-8 mb-8 flex justify-between items-start">
        <div>
          {invoice.logoUrl ? (
            <div className="relative h-16 w-40">
              <img src={invoice.logoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-contain object-left" />
            </div>
          ) : (
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{invoice.fromName}</h1>
          )}
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-slate-400 mb-2 tracking-tight uppercase">{invoiceTitle}</h2>
          <div className="font-semibold text-slate-900 text-lg">INV-{invoice.invoiceNumber}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-12">
        <div className="col-span-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Company Details</h3>
          <div className="text-sm leading-relaxed text-slate-600">
            <div className="font-semibold text-slate-900 mb-1">{invoice.fromName}</div>
            <div className="whitespace-pre-wrap">{invoice.fromAddress}</div>
            <div className="mt-1">{invoice.fromEmail}</div>
            <div>{invoice.fromPhone}</div>
          </div>
        </div>
        <div className="col-span-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Bill To</h3>
          <div className="text-sm leading-relaxed text-slate-600">
            <div className="font-semibold text-slate-900 mb-1">{invoice.toName}</div>
            <div className="whitespace-pre-wrap">{invoice.toAddress}</div>
            <div className="mt-1">{invoice.toEmail}</div>
            <div>{invoice.toPhone}</div>
          </div>
        </div>
        <div className="col-span-1 bg-slate-50 p-5 rounded-lg border border-slate-200">
          <div className="flex justify-between mb-3 text-sm">
            <span className="font-medium text-slate-500">Issue Date:</span>
            <span className="font-semibold text-slate-900">{format(new Date(invoice.issueDate), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex justify-between mb-3 text-sm">
            <span className="font-medium text-slate-500">Due Date:</span>
            <span className="font-semibold text-slate-900">{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex justify-between text-sm pt-3 border-t border-slate-200">
            <span className="font-medium text-slate-500">Terms:</span>
            <span className="font-semibold text-slate-900">{invoice.paymentTerms}</span>
          </div>
        </div>
      </div>

      <table className="w-full mb-12 border-collapse flex-grow">
        <thead>
          <tr className="bg-slate-900 text-white text-sm">
            <th className="text-left py-3 px-4 font-medium rounded-l-md">Description</th>
            <th className="text-right py-3 px-4 font-medium">Quantity</th>
            <th className="text-right py-3 px-4 font-medium">Unit Price</th>
            <th className="text-right py-3 px-4 font-medium rounded-r-md">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i} className="border-b border-slate-200 text-sm">
              <td className="py-4 px-4 text-slate-800 font-medium">{item.description}</td>
              <td className="py-4 px-4 text-right text-slate-600">{item.quantity}</td>
              <td className="py-4 px-4 text-right text-slate-600">{formatCurrency(item.rate)}</td>
              <td className="py-4 px-4 text-right font-semibold text-slate-900">{formatCurrency(item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-12">
        <div className="w-80">
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-2 text-right text-slate-500 pr-4">Subtotal</td>
                <td className="py-2 text-right font-medium text-slate-900">{formatCurrency(subtotal)}</td>
              </tr>
              {invoice.discountPercent > 0 && (
                <tr>
                  <td className="py-2 text-right text-slate-500 pr-4">Discount ({invoice.discountPercent}%)</td>
                  <td className="py-2 text-right font-medium text-red-600">-{formatCurrency(discountAmount)}</td>
                </tr>
              )}
              {invoice.taxPercent > 0 && (
                <tr>
                  <td className="py-2 text-right text-slate-500 pr-4">Tax ({invoice.taxPercent}%)</td>
                  <td className="py-2 text-right font-medium text-slate-900">{formatCurrency(taxAmount)}</td>
                </tr>
              )}
              <tr className="text-lg">
                <td className="py-4 text-right font-bold text-slate-900 pr-4 border-t-2 border-slate-900 mt-2 uppercase tracking-tight">Total Due</td>
                <td className="py-4 text-right font-bold text-slate-900 border-t-2 border-slate-900 mt-2">{formatCurrency(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 border-t border-slate-200 pt-8 text-sm mt-auto">
        {invoice.paymentInfo && (
          <div>
            <strong className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Payment Instructions</strong>
            <p className="whitespace-pre-wrap text-slate-600 leading-relaxed">{invoice.paymentInfo}</p>
          </div>
        )}
        {invoice.notes && (
          <div>
            <strong className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Notes</strong>
            <p className="whitespace-pre-wrap text-slate-600 leading-relaxed">{invoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CreativeTemplate({ invoice, formatCurrency, subtotal, discountAmount, taxAmount, total, invoiceTitle }: TemplateProps) {
  return (
    <div className="font-sans bg-amber-50 min-h-full flex flex-col">
      <div className="p-12 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-16">
          <div className="w-1/2">
            <h1 className="text-6xl font-black text-indigo-600 mb-4 tracking-tighter uppercase">{invoiceTitle}</h1>
            <div className="text-2xl font-bold text-slate-800 mb-8">#{invoice.invoiceNumber}</div>
            <div className="space-y-2 text-sm font-medium text-slate-600">
              <div><span className="text-indigo-600 mr-2 uppercase tracking-wider text-xs font-bold">Issue Date:</span> {format(new Date(invoice.issueDate), 'MMM dd, yyyy')}</div>
              <div><span className="text-indigo-600 mr-2 uppercase tracking-wider text-xs font-bold">Due Date:</span> {format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-end text-right">
            {invoice.logoUrl ? (
              <div className="relative h-24 w-48 mb-6 rounded-2xl shadow-lg overflow-hidden bg-white border-4 border-white">
                <img src={invoice.logoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-contain object-right p-2" />
              </div>
            ) : (
              <div className="text-3xl font-black text-slate-900 mb-6">{invoice.fromName}</div>
            )}
            <div className="text-sm font-medium text-slate-600 whitespace-pre-wrap">{invoice.fromAddress}</div>
            <div className="text-sm font-medium text-slate-600 mt-1">{invoice.fromEmail}</div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl mb-12 transform -rotate-1 border-2 border-indigo-100">
          <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-4">Billed To</h3>
          <div className="text-xl font-bold text-slate-900 mb-2">{invoice.toName}</div>
          <div className="text-slate-600 whitespace-pre-wrap font-medium">{invoice.toAddress}</div>
          <div className="text-slate-600 font-medium mt-1">{invoice.toEmail}</div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-12 border-2 border-indigo-100 flex-grow">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="text-left py-4 px-6 font-bold uppercase tracking-wider text-sm">Service / Product</th>
                <th className="text-right py-4 px-6 font-bold uppercase tracking-wider text-sm">Qty</th>
                <th className="text-right py-4 px-6 font-bold uppercase tracking-wider text-sm">Rate</th>
                <th className="text-right py-4 px-6 font-bold uppercase tracking-wider text-sm">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} className="border-b border-indigo-50 last:border-0">
                  <td className="py-4 px-6 font-bold text-slate-800">{item.description}</td>
                  <td className="py-4 px-6 text-right text-slate-500 font-medium">{item.quantity}</td>
                  <td className="py-4 px-6 text-right text-slate-500 font-medium">{formatCurrency(item.rate)}</td>
                  <td className="py-4 px-6 text-right font-black text-slate-900">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-16">
          <div className="w-80 bg-indigo-600 text-white p-8 rounded-3xl shadow-xl transform rotate-1">
            <div className="flex justify-between mb-3 text-indigo-200 font-medium">
              <span className="uppercase tracking-wider text-xs self-center">Subtotal</span>
              <span className="text-white">{formatCurrency(subtotal)}</span>
            </div>
            {invoice.discountPercent > 0 && (
              <div className="flex justify-between mb-3 text-indigo-200 font-medium">
                <span className="uppercase tracking-wider text-xs self-center">Discount</span>
                <span className="text-amber-300">-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            {invoice.taxPercent > 0 && (
              <div className="flex justify-between mb-6 text-indigo-200 font-medium">
                <span className="uppercase tracking-wider text-xs self-center">Tax</span>
                <span className="text-white">{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-3xl pt-6 border-t-2 border-indigo-400">
              <span className="uppercase tracking-tighter">Total</span>
              <span className="text-amber-300">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm mt-auto">
          {invoice.notes && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-indigo-50">
              <h4 className="font-black text-indigo-600 mb-2 uppercase tracking-widest text-xs">Notes</h4>
              <p className="text-slate-600 whitespace-pre-wrap font-medium">{invoice.notes}</p>
            </div>
          )}
          {invoice.paymentInfo && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-indigo-50">
              <h4 className="font-black text-indigo-600 mb-2 uppercase tracking-widest text-xs">Payment Details</h4>
              <p className="text-slate-600 whitespace-pre-wrap font-medium">{invoice.paymentInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MonospaceTemplate({ invoice, formatCurrency, subtotal, discountAmount, taxAmount, total, invoiceTitle }: TemplateProps) {
  return (
    <div className="font-mono p-12 text-gray-900 bg-gray-50 min-h-full flex flex-col">
      <div className="border-4 border-black p-8 flex-grow flex flex-col bg-white">
        <div className="flex justify-between items-start mb-12 border-b-4 border-black pb-8">
          <div>
            {invoice.logoUrl ? (
              <div className="relative h-16 w-40 mb-4 filter grayscale">
                <img src={invoice.logoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-contain object-left" />
              </div>
            ) : (
              <h1 className="text-2xl font-bold uppercase mb-2">{invoice.fromName}</h1>
            )}
            <div className="text-sm whitespace-pre-wrap">{invoice.fromAddress}</div>
            <div className="text-sm mt-1">{invoice.fromEmail}</div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold uppercase tracking-widest mb-4 bg-black text-white inline-block px-4 py-2">{invoiceTitle}</h2>
            <div className="text-sm mb-1">
              <span className="font-bold mr-2">NO:</span> {invoice.invoiceNumber}
            </div>
            <div className="text-sm mb-1">
              <span className="font-bold mr-2">DATE:</span> {format(new Date(invoice.issueDate), 'yyyy-MM-dd')}
            </div>
            <div className="text-sm">
              <span className="font-bold mr-2">DUE:</span> {format(new Date(invoice.dueDate), 'yyyy-MM-dd')}
            </div>
          </div>
        </div>

        <div className="mb-12 border-b-4 border-black pb-8">
          <h3 className="text-lg font-bold uppercase mb-4 bg-black text-white inline-block px-2 py-1">BILL TO</h3>
          <div className="font-bold text-xl mb-2">{invoice.toName}</div>
          <div className="text-sm whitespace-pre-wrap">{invoice.toAddress}</div>
          <div className="text-sm mt-1">{invoice.toEmail}</div>
        </div>

        <table className="w-full mb-12 flex-grow">
          <thead>
            <tr className="border-b-4 border-black text-sm font-bold uppercase">
              <th className="text-left py-2">DESC</th>
              <th className="text-right py-2">QTY</th>
              <th className="text-right py-2">RATE</th>
              <th className="text-right py-2">AMT</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i} className="border-b-2 border-dashed border-gray-300 text-sm">
                <td className="py-4 font-bold">{item.description}</td>
                <td className="py-4 text-right">{item.quantity}</td>
                <td className="py-4 text-right">{formatCurrency(item.rate)}</td>
                <td className="py-4 text-right font-bold bg-gray-100 px-2">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-12">
          <div className="w-72 text-sm font-bold">
            <div className="flex justify-between py-2 border-b-2 border-dashed border-gray-300">
              <span>SUBTOTAL</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {invoice.discountPercent > 0 && (
              <div className="flex justify-between py-2 border-b-2 border-dashed border-gray-300 text-red-600">
                <span>DISCOUNT</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            {invoice.taxPercent > 0 && (
              <div className="flex justify-between py-2 border-b-2 border-dashed border-gray-300">
                <span>TAX</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between py-4 mt-2 border-t-4 border-black text-2xl bg-black text-white px-4">
              <span>TOTAL</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="text-sm border-t-4 border-black pt-8 mt-auto">
          {invoice.notes && (
            <div className="mb-4">
              <span className="font-bold uppercase bg-black text-white px-2 py-1 mr-2 inline-block mb-2">NOTES</span>
              <div className="whitespace-pre-wrap">{invoice.notes}</div>
            </div>
          )}
          {invoice.paymentInfo && (
            <div>
              <span className="font-bold uppercase bg-black text-white px-2 py-1 mr-2 inline-block mb-2">PAYMENT</span>
              <div className="whitespace-pre-wrap">{invoice.paymentInfo}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FuturisticTemplate({ invoice, formatCurrency, subtotal, discountAmount, taxAmount, total, invoiceTitle }: TemplateProps) {
  return (
    <div className="font-sans bg-slate-950 text-slate-300 min-h-full flex flex-col p-12 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-16">
          <div>
            {invoice.logoUrl ? (
              <div className="relative h-16 w-40 mb-6">
                <img src={invoice.logoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-contain object-left" />
              </div>
            ) : (
              <h1 className="text-3xl font-bold text-white mb-6 tracking-wider">{invoice.fromName}</h1>
            )}
            <div className="text-sm text-slate-400 whitespace-pre-wrap">{invoice.fromAddress}</div>
            <div className="text-sm text-slate-400 mt-1">{invoice.fromEmail}</div>
          </div>
          <div className="text-right">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 tracking-tighter uppercase">{invoiceTitle}</h2>
            <div className="inline-block bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm font-mono text-cyan-400 mb-4">
              {invoice.invoiceNumber}
            </div>
            <div className="text-sm text-slate-400">
              <span className="uppercase tracking-widest text-xs mr-2">Issued:</span> {format(new Date(invoice.issueDate), 'yyyy-MM-dd')}
            </div>
            <div className="text-sm text-slate-400">
              <span className="uppercase tracking-widest text-xs mr-2">Due:</span> {format(new Date(invoice.dueDate), 'yyyy-MM-dd')}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-500"></div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-4">Invoice To</h3>
          <div className="font-bold text-xl text-white mb-2">{invoice.toName}</div>
          <div className="text-slate-400 whitespace-pre-wrap text-sm">{invoice.toAddress}</div>
          <div className="text-slate-400 text-sm mt-1">{invoice.toEmail}</div>
        </div>

        <div className="mb-12 flex-grow">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-800">
                <th className="text-left py-4 px-4">Description</th>
                <th className="text-right py-4 px-4">Qty</th>
                <th className="text-right py-4 px-4">Rate</th>
                <th className="text-right py-4 px-4 text-cyan-500">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i} className="border-b border-slate-800/50 text-sm">
                  <td className="py-4 px-4 text-slate-300">{item.description}</td>
                  <td className="py-4 px-4 text-right text-slate-500">{item.quantity}</td>
                  <td className="py-4 px-4 text-right text-slate-500">{formatCurrency(item.rate)}</td>
                  <td className="py-4 px-4 text-right font-mono text-cyan-400">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-12">
          <div className="w-80 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between mb-3 text-sm text-slate-400">
              <span>Subtotal</span>
              <span className="font-mono">{formatCurrency(subtotal)}</span>
            </div>
            {invoice.discountPercent > 0 && (
              <div className="flex justify-between mb-3 text-sm text-slate-400">
                <span>Discount</span>
                <span className="font-mono text-purple-400">-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            {invoice.taxPercent > 0 && (
              <div className="flex justify-between mb-4 text-sm text-slate-400">
                <span>Tax</span>
                <span className="font-mono">{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-2xl pt-4 border-t border-slate-800 text-white">
              <span>Total</span>
              <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm mt-auto">
          {invoice.notes && (
            <div>
              <h4 className="font-bold text-cyan-500 mb-2 uppercase tracking-widest text-xs">Notes</h4>
              <p className="text-slate-400 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
          {invoice.paymentInfo && (
            <div>
              <h4 className="font-bold text-cyan-500 mb-2 uppercase tracking-widest text-xs">Payment Details</h4>
              <p className="text-slate-400 whitespace-pre-wrap">{invoice.paymentInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EcommerceTemplate({ invoice, formatCurrency, subtotal, discountAmount, taxAmount, total, invoiceTitle }: TemplateProps) {
  return (
    <div className="font-sans bg-gray-50 min-h-full flex flex-col">
      <div className="bg-white p-12 border-b border-gray-200 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {invoice.logoUrl ? (
              <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                <img src={invoice.logoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ) : (
              <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
                {invoice.fromName.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900">{invoice.fromName}</h1>
              <div className="text-sm text-gray-500">{invoice.fromEmail}</div>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">{invoiceTitle}</h2>
            <div className="text-sm font-medium text-gray-500 mt-1">Order #{invoice.invoiceNumber}</div>
          </div>
        </div>
      </div>

      <div className="p-12 flex-grow flex flex-col">
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Customer Details
            </h3>
            <div className="font-bold text-gray-900">{invoice.toName}</div>
            <div className="text-gray-600 text-sm mt-1">{invoice.toEmail}</div>
            {invoice.toPhone && <div className="text-gray-600 text-sm mt-1">{invoice.toPhone}</div>}
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Shipping Address
            </h3>
            <div className="text-gray-600 text-sm whitespace-pre-wrap">{invoice.toAddress}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-12 flex-grow flex flex-col">
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500">
            <div className="col-span-2">Item</div>
            <div className="text-right">Qty</div>
            <div className="text-right">Total</div>
          </div>
          <div className="flex-grow">
            {invoice.items.map((item, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 last:border-0 items-center">
                <div className="col-span-2">
                  <div className="font-medium text-gray-900">{item.description}</div>
                  <div className="text-sm text-gray-500">{formatCurrency(item.rate)} each</div>
                </div>
                <div className="text-right text-gray-600">{item.quantity}</div>
                <div className="text-right font-bold text-gray-900">{formatCurrency(item.amount)}</div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex justify-end">
              <div className="w-64 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                {invoice.discountPercent > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Discount</span>
                    <span className="font-medium text-green-600">-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                {invoice.taxPercent > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span className="font-medium text-gray-900">{formatCurrency(taxAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-blue-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
          <div>
            <span className="font-medium text-gray-900 mr-2">Date:</span> {format(new Date(invoice.issueDate), 'MMM dd, yyyy')}
          </div>
          {invoice.paymentInfo && (
            <div className="text-right">
              <span className="font-medium text-gray-900 mr-2">Payment Method:</span> {invoice.paymentInfo}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ElegantTemplate({ invoice, formatCurrency, subtotal, discountAmount, taxAmount, total, invoiceTitle }: TemplateProps) {
  return (
    <div className="font-serif bg-[#fdfbf7] text-[#2c3e50] min-h-full flex flex-col p-16 relative">
      <div className="absolute top-0 left-0 w-full h-full border-[16px] border-white pointer-events-none z-10"></div>
      <div className="absolute top-4 left-4 w-[calc(100%-32px)] h-[calc(100%-32px)] border border-[#e8e6e1] pointer-events-none z-10"></div>

      <div className="relative z-20 flex-grow flex flex-col">
        <div className="text-center mb-16">
          {invoice.logoUrl ? (
            <div className="relative h-20 w-48 mx-auto mb-6">
              <img src={invoice.logoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-contain" />
            </div>
          ) : (
            <h1 className="text-4xl font-normal tracking-widest uppercase mb-6">{invoice.fromName}</h1>
          )}
          <div className="w-12 h-[1px] bg-[#d5d1c8] mx-auto mb-6"></div>
          <h2 className="text-2xl font-light tracking-[0.2em] uppercase text-[#7f8c8d] mb-2">{invoiceTitle}</h2>
          <div className="text-sm tracking-widest text-[#95a5a6]">NO. {invoice.invoiceNumber}</div>
        </div>

        <div className="flex justify-between mb-16 text-sm leading-relaxed">
          <div className="w-1/3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#95a5a6] mb-4">From</h3>
            <div className="font-medium mb-1">{invoice.fromName}</div>
            <div className="whitespace-pre-wrap text-[#7f8c8d]">{invoice.fromAddress}</div>
            <div className="text-[#7f8c8d] mt-1">{invoice.fromEmail}</div>
          </div>
          <div className="w-1/3 text-center">
            <div className="mb-4">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#95a5a6] mb-1">Date</span>
              <span className="text-[#7f8c8d]">{format(new Date(invoice.issueDate), 'MMMM dd, yyyy')}</span>
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-[#95a5a6] mb-1">Due</span>
              <span className="text-[#7f8c8d]">{format(new Date(invoice.dueDate), 'MMMM dd, yyyy')}</span>
            </div>
          </div>
          <div className="w-1/3 text-right">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#95a5a6] mb-4">To</h3>
            <div className="font-medium mb-1">{invoice.toName}</div>
            <div className="whitespace-pre-wrap text-[#7f8c8d]">{invoice.toAddress}</div>
            <div className="text-[#7f8c8d] mt-1">{invoice.toEmail}</div>
          </div>
        </div>

        <table className="w-full mb-16 flex-grow">
          <thead>
            <tr>
              <th className="text-left py-4 border-b border-[#e8e6e1] text-xs font-bold uppercase tracking-widest text-[#95a5a6] font-sans">Description</th>
              <th className="text-center py-4 border-b border-[#e8e6e1] text-xs font-bold uppercase tracking-widest text-[#95a5a6] font-sans">Qty</th>
              <th className="text-right py-4 border-b border-[#e8e6e1] text-xs font-bold uppercase tracking-widest text-[#95a5a6] font-sans">Price</th>
              <th className="text-right py-4 border-b border-[#e8e6e1] text-xs font-bold uppercase tracking-widest text-[#95a5a6] font-sans">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i}>
                <td className="py-6 border-b border-[#f0eee9] text-[#34495e]">{item.description}</td>
                <td className="py-6 border-b border-[#f0eee9] text-center text-[#7f8c8d] font-sans">{item.quantity}</td>
                <td className="py-6 border-b border-[#f0eee9] text-right text-[#7f8c8d] font-sans">{formatCurrency(item.rate)}</td>
                <td className="py-6 border-b border-[#f0eee9] text-right font-medium text-[#2c3e50] font-sans">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-16">
          <div className="w-72">
            <div className="flex justify-between py-3 text-sm text-[#7f8c8d] font-sans">
              <span className="uppercase tracking-widest text-xs">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {invoice.discountPercent > 0 && (
              <div className="flex justify-between py-3 text-sm text-[#7f8c8d] font-sans">
                <span className="uppercase tracking-widest text-xs">Discount</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            {invoice.taxPercent > 0 && (
              <div className="flex justify-between py-3 text-sm text-[#7f8c8d] font-sans border-b border-[#e8e6e1]">
                <span className="uppercase tracking-widest text-xs">Tax</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between py-4 text-xl font-medium text-[#2c3e50] font-sans">
              <span className="uppercase tracking-widest text-sm font-bold text-[#95a5a6]">Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-[#7f8c8d] mt-auto">
          {invoice.notes && <p className="mb-4 italic">&quot;{invoice.notes}&quot;</p>}
          {invoice.paymentInfo && <p className="font-sans text-xs tracking-wider uppercase">{invoice.paymentInfo}</p>}
        </div>
      </div>
    </div>
  );
}

function StartupTemplate({ invoice, formatCurrency, subtotal, discountAmount, taxAmount, total, invoiceTitle }: TemplateProps) {
  return (
    <div className="font-sans bg-white text-gray-900 min-h-full flex flex-col p-12">
      <div className="flex justify-between items-center mb-16">
        <div className="flex items-center gap-4">
          {invoice.logoUrl ? (
            <div className="relative h-12 w-12 rounded-xl overflow-hidden shadow-sm">
              <img src={invoice.logoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          ) : (
            <div className="h-12 w-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm">
              {invoice.fromName.charAt(0)}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{invoice.fromName}</h1>
            <div className="text-sm text-gray-500">{invoice.fromEmail}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold tracking-wide uppercase mb-2">
            {invoiceTitle}
          </div>
          <div className="text-gray-400 font-mono text-sm">#{invoice.invoiceNumber}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Billed To</h3>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="font-bold text-lg mb-1">{invoice.toName}</div>
            <div className="text-gray-600 text-sm whitespace-pre-wrap mb-2">{invoice.toAddress}</div>
            <div className="text-gray-500 text-sm">{invoice.toEmail}</div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-gray-500 text-sm">Issue Date</span>
            <span className="font-medium">{format(new Date(invoice.issueDate), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-gray-500 text-sm">Due Date</span>
            <span className="font-medium">{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Payment Terms</span>
            <span className="font-medium">{invoice.paymentTerms}</span>
          </div>
        </div>
      </div>

      <div className="mb-12 flex-grow">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-xs font-bold uppercase tracking-wider text-gray-500">
                <th className="text-left py-4 px-6">Description</th>
                <th className="text-right py-4 px-6">Qty</th>
                <th className="text-right py-4 px-6">Rate</th>
                <th className="text-right py-4 px-6">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoice.items.map((item, i) => (
                <tr key={i} className="text-sm">
                  <td className="py-4 px-6 font-medium text-gray-900">{item.description}</td>
                  <td className="py-4 px-6 text-right text-gray-500">{item.quantity}</td>
                  <td className="py-4 px-6 text-right text-gray-500">{formatCurrency(item.rate)}</td>
                  <td className="py-4 px-6 text-right font-bold text-gray-900">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-start mb-12">
        <div className="w-1/2 pr-12">
          {invoice.paymentInfo && (
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Payment Details</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 p-4 rounded-xl border border-gray-100">{invoice.paymentInfo}</p>
            </div>
          )}
          {invoice.notes && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Notes</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
        </div>
        <div className="w-80 bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            {invoice.discountPercent > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Discount</span>
                <span className="font-medium text-emerald-600">-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            {invoice.taxPercent > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span className="font-medium text-gray-900">{formatCurrency(taxAmount)}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Total</span>
            <span className="text-2xl font-black text-gray-900">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-auto text-center text-sm text-gray-400 border-t border-gray-100 pt-8">
        Thank you for your business!
      </div>
    </div>
  );
}

function ModernTemplate({ invoice, formatCurrency, subtotal, discountAmount, taxAmount, total, invoiceTitle }: TemplateProps) {
  return (
    <div className="font-sans bg-white text-gray-900 min-h-full flex flex-col p-12 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -z-10"></div>
      
      <div className="flex justify-between items-start mb-16">
        <div>
          {invoice.logoUrl ? (
            <div className="relative h-16 w-40 mb-6">
              <img src={invoice.logoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-contain object-left" />
            </div>
          ) : (
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                {invoice.fromName.charAt(0)}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{invoice.fromName}</h1>
            </div>
          )}
          <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed border-l-2 border-blue-600 pl-3">
            {invoice.fromAddress}
            <br />
            {invoice.fromEmail}
            <br />
            {invoice.fromPhone}
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-black text-blue-600 uppercase tracking-tight mb-2">{invoiceTitle}</h2>
          <div className="text-lg font-medium text-gray-900 mb-6">#{invoice.invoiceNumber}</div>
          
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 inline-block text-left">
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div className="text-gray-500">Issue Date</div>
              <div className="font-medium text-right">{format(new Date(invoice.issueDate), 'MMM dd, yyyy')}</div>
              <div className="text-gray-500">Due Date</div>
              <div className="font-medium text-right">{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="w-6 h-px bg-blue-600"></span> Billed To
        </h3>
        <div className="text-gray-900">
          <div className="font-bold text-lg mb-1">{invoice.toName}</div>
          <div className="text-gray-600 text-sm whitespace-pre-wrap mb-1">{invoice.toAddress}</div>
          <div className="text-gray-500 text-sm">{invoice.toEmail}</div>
        </div>
      </div>

      <div className="mb-12 flex-grow">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-900 text-sm font-bold text-gray-900">
              <th className="text-left py-3 px-2">Description</th>
              <th className="text-center py-3 px-2 w-24">Qty</th>
              <th className="text-right py-3 px-2 w-32">Rate</th>
              <th className="text-right py-3 px-2 w-32">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoice.items.map((item, i) => (
              <tr key={i} className="text-sm group hover:bg-gray-50 transition-colors">
                <td className="py-4 px-2 font-medium">{item.description}</td>
                <td className="py-4 px-2 text-center text-gray-600">{item.quantity}</td>
                <td className="py-4 px-2 text-right text-gray-600">{formatCurrency(item.rate)}</td>
                <td className="py-4 px-2 text-right font-bold text-gray-900">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-start mb-12">
        <div className="w-1/2 pr-12">
          {invoice.paymentInfo && (
            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Payment Info</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 p-4 rounded-xl">{invoice.paymentInfo}</p>
            </div>
          )}
          {invoice.notes && (
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-2">Notes</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
        </div>
        <div className="w-80">
          <div className="space-y-3 mb-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            {invoice.discountPercent > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Discount ({invoice.discountPercent}%)</span>
                <span className="font-medium text-red-500">-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            {invoice.taxPercent > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Tax ({invoice.taxPercent}%)</span>
                <span className="font-medium text-gray-900">{formatCurrency(taxAmount)}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center py-4 border-t-2 border-gray-900 bg-gray-50 px-4 rounded-xl">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-2xl font-black text-blue-600">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayfulTemplate({ invoice, formatCurrency, subtotal, discountAmount, taxAmount, total, invoiceTitle }: TemplateProps) {
  return (
    <div className="font-sans bg-[#fffdf7] text-gray-800 min-h-full flex flex-col p-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 flex justify-between items-start mb-16">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50 max-w-[50%]">
          {invoice.logoUrl ? (
            <div className="relative h-16 w-40 mb-4">
              <img src={invoice.logoUrl} alt="Logo" className="absolute inset-0 w-full h-full object-contain object-left" />
            </div>
          ) : (
            <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">{invoice.fromName}</h1>
          )}
          <div className="text-sm text-gray-600 whitespace-pre-wrap font-medium">{invoice.fromAddress}</div>
          <div className="text-sm text-gray-500 mt-1">{invoice.fromEmail}</div>
          <div className="text-sm text-gray-500">{invoice.fromPhone}</div>
        </div>
        
        <div className="text-right">
          <div className="inline-block bg-gray-900 text-white px-6 py-2 rounded-full mb-4 transform rotate-2 shadow-lg">
            <h2 className="text-2xl font-black uppercase tracking-widest">{invoiceTitle}</h2>
          </div>
          <div className="text-xl font-bold text-gray-800 mb-4">#{invoice.invoiceNumber}</div>
          
          <div className="flex flex-col gap-2 items-end text-sm font-medium">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-white/50 flex gap-4">
              <span className="text-gray-500">Issued</span>
              <span className="text-gray-900">{format(new Date(invoice.issueDate), 'MMM dd, yyyy')}</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-white/50 flex gap-4">
              <span className="text-gray-500">Due</span>
              <span className="text-gray-900">{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mb-12">
        <div className="inline-block bg-pink-100 text-pink-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 transform -rotate-1">
          Billed To
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/50 inline-block min-w-[300px]">
          <div className="font-black text-xl text-gray-900 mb-1">{invoice.toName}</div>
          <div className="text-gray-600 text-sm whitespace-pre-wrap font-medium mb-2">{invoice.toAddress}</div>
          <div className="text-gray-500 text-sm">{invoice.toEmail}</div>
        </div>
      </div>

      <div className="relative z-10 mb-12 flex-grow">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white/50 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr className="text-sm font-bold">
                <th className="text-left py-4 px-6 rounded-tl-3xl">Description</th>
                <th className="text-center py-4 px-6">Qty</th>
                <th className="text-right py-4 px-6">Rate</th>
                <th className="text-right py-4 px-6 rounded-tr-3xl">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoice.items.map((item, i) => (
                <tr key={i} className="text-sm">
                  <td className="py-4 px-6 font-bold text-gray-800">{item.description}</td>
                  <td className="py-4 px-6 text-center text-gray-600 font-medium">{item.quantity}</td>
                  <td className="py-4 px-6 text-right text-gray-600 font-medium">{formatCurrency(item.rate)}</td>
                  <td className="py-4 px-6 text-right font-black text-gray-900">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="relative z-10 flex justify-between items-start mb-12">
        <div className="w-1/2 pr-12">
          {invoice.paymentInfo && (
            <div className="mb-6">
              <div className="inline-block bg-teal-100 text-teal-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 transform rotate-1">
                Payment Info
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap bg-white/80 backdrop-blur-sm p-5 rounded-3xl shadow-sm border border-white/50 font-medium leading-relaxed">
                {invoice.paymentInfo}
              </p>
            </div>
          )}
          {invoice.notes && (
            <div>
              <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 transform -rotate-1">
                Notes
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap font-medium leading-relaxed">
                {invoice.notes}
              </p>
            </div>
          )}
        </div>
        <div className="w-80 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white/50 p-6">
          <div className="space-y-4 mb-6 text-sm font-medium">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            {invoice.discountPercent > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span className="text-pink-500 font-bold">-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            {invoice.taxPercent > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="text-gray-900">{formatCurrency(taxAmount)}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center pt-6 border-t-2 border-dashed border-gray-200">
            <span className="text-lg font-black text-gray-900 uppercase tracking-wider">Total</span>
            <span className="text-3xl font-black text-gray-900">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 mt-auto text-center">
        <span className="inline-block bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-bold transform -rotate-2 shadow-md">
          Thank you! 💖
        </span>
      </div>
    </div>
  );
}

