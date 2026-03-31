import { useAppStore } from '@/lib/store';
import { Invoice, Currency, InvoiceTemplate, InvoiceStatus, Client } from '@/lib/types';
import { Plus, Trash2, Upload, Save } from 'lucide-react';

const CURRENCIES: { code: Currency; symbol: string; name: string }[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: '$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: '$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

const TEMPLATES: { id: InvoiceTemplate; name: string }[] = [
  { id: 'classic', name: 'Classic' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'bold', name: 'Bold' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'creative', name: 'Creative' },
  { id: 'futuristic', name: 'Futuristic' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'elegant', name: 'Elegant' },
  { id: 'startup', name: 'Startup' },
  { id: 'monospace', name: 'Monospace' },
];

const STATUSES: InvoiceStatus[] = ['Draft', 'Proforma', 'Final', 'Sent', 'Paid', 'Overdue'];

const PAYMENT_TERMS = ['Due on receipt', '7 days', '14 days', '30 days', '60 days', '90 days', 'Custom'];

const calculateDueDate = (issueDate: string, term: string) => {
  const date = new Date(issueDate);
  switch (term) {
    case '7 days': date.setDate(date.getDate() + 7); break;
    case '14 days': date.setDate(date.getDate() + 14); break;
    case '30 days': date.setDate(date.getDate() + 30); break;
    case '60 days': date.setDate(date.getDate() + 60); break;
    case '90 days': date.setDate(date.getDate() + 90); break;
    case 'Due on receipt':
    default: break;
  }
  return date.toISOString().split('T')[0];
};

export default function InvoiceEditor({ invoice }: { invoice: Invoice }) {
  const { updateInvoice, addLineItem, updateLineItem, removeLineItem, clients, addClient } = useAppStore();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateInvoice(invoice.id, { logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-20">
      {/* Settings Section */}
      <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Template</label>
            <select
              value={invoice.template}
              onChange={(e) => updateInvoice(invoice.id, { template: e.target.value as InvoiceTemplate })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              value={invoice.currency}
              onChange={(e) => updateInvoice(invoice.id, { currency: e.target.value as Currency })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.code} ({c.symbol}) - {c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={invoice.status}
              onChange={(e) => updateInvoice(invoice.id, { status: e.target.value as InvoiceStatus })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => updateInvoice(invoice.id, { invoiceNumber: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">Details</h2>
          <div className="relative self-start">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
              <Upload size={16} />
              {invoice.logoUrl ? 'Change Logo' : 'Upload Logo'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* From */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">From</h3>
            <input
              type="text"
              placeholder="Your Name / Company"
              value={invoice.fromName}
              onChange={(e) => updateInvoice(invoice.id, { fromName: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border font-medium"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={invoice.fromEmail}
              onChange={(e) => updateInvoice(invoice.id, { fromEmail: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
            />
            <textarea
              placeholder="Address"
              rows={2}
              value={invoice.fromAddress}
              onChange={(e) => updateInvoice(invoice.id, { fromAddress: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm resize-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={invoice.fromPhone}
              onChange={(e) => updateInvoice(invoice.id, { fromPhone: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
            />
          </div>

          {/* To */}
          <div className="space-y-3 md:space-y-4 mt-6 lg:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Bill To</h3>
              <button
                onClick={() => {
                  if (invoice.toName) {
                    addClient({
                      name: invoice.toName,
                      email: invoice.toEmail,
                      address: invoice.toAddress,
                      phone: invoice.toPhone,
                    });
                    alert('Client saved successfully!');
                  } else {
                    alert('Please enter a client name to save.');
                  }
                }}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                title="Save as new client"
              >
                <Save size={14} />
                Save Client
              </button>
            </div>
            
            {clients.length > 0 && (
              <select
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm bg-gray-50"
                onChange={(e) => {
                  const client = clients.find(c => c.id === e.target.value);
                  if (client) {
                    updateInvoice(invoice.id, {
                      toName: client.name,
                      toEmail: client.email,
                      toAddress: client.address,
                      toPhone: client.phone,
                    });
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>Select a saved client...</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            )}

            <input
              type="text"
              placeholder="Client Name / Company"
              value={invoice.toName}
              onChange={(e) => updateInvoice(invoice.id, { toName: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border font-medium"
            />
            <input
              type="email"
              placeholder="Client Email"
              value={invoice.toEmail}
              onChange={(e) => updateInvoice(invoice.id, { toEmail: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
            />
            <textarea
              placeholder="Client Address"
              rows={2}
              value={invoice.toAddress}
              onChange={(e) => updateInvoice(invoice.id, { toAddress: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm resize-none"
            />
            <input
              type="tel"
              placeholder="Client Phone"
              value={invoice.toPhone}
              onChange={(e) => updateInvoice(invoice.id, { toPhone: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
            <input
              type="date"
              value={invoice.issueDate}
              onChange={(e) => {
                const newIssueDate = e.target.value;
                const newDueDate = invoice.paymentTerms !== 'Custom' 
                  ? calculateDueDate(newIssueDate, invoice.paymentTerms) 
                  : invoice.dueDate;
                updateInvoice(invoice.id, { issueDate: newIssueDate, dueDate: newDueDate });
              }}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => updateInvoice(invoice.id, { dueDate: e.target.value, paymentTerms: 'Custom' })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
            <select
              value={invoice.paymentTerms}
              onChange={(e) => {
                const term = e.target.value;
                const newDueDate = term !== 'Custom' 
                  ? calculateDueDate(invoice.issueDate, term) 
                  : invoice.dueDate;
                updateInvoice(invoice.id, { paymentTerms: term, dueDate: newDueDate });
              }}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
            >
              {PAYMENT_TERMS.map(term => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Line Items Section */}
      <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Line Items</h2>
        
        <div className="space-y-4 md:space-y-3">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 px-2">
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-right">Qty</div>
            <div className="col-span-2 text-right">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>

          {/* Items */}
          {invoice.items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 items-start bg-gray-50 p-4 md:p-3 rounded-lg border border-gray-100 relative group">
              <div className="sm:col-span-2 md:col-span-6">
                <input
                  type="text"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => updateLineItem(invoice.id, item.id, { description: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-2">
                <span className="text-xs text-gray-500 md:hidden w-12">Qty:</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.quantity}
                  onChange={(e) => updateLineItem(invoice.id, item.id, { quantity: parseFloat(e.target.value) || 0 })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm text-right"
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-2">
                <span className="text-xs text-gray-500 md:hidden w-12">Rate:</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.rate}
                  onChange={(e) => updateLineItem(invoice.id, item.id, { rate: parseFloat(e.target.value) || 0 })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm text-right"
                />
              </div>
              <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2 h-10 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-200">
                <span className="text-xs text-gray-500 md:hidden">Amount:</span>
                <span className="font-medium text-gray-900">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency }).format(item.amount)}
                </span>
                
                {/* Delete button (absolute on desktop, inline on mobile) */}
                <button
                  onClick={() => removeLineItem(invoice.id, item.id)}
                  className="md:absolute md:-right-3 md:-top-3 md:opacity-0 md:group-hover:opacity-100 bg-white md:shadow-md border border-gray-200 text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-full transition-all ml-auto md:ml-0"
                  title="Remove item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => addLineItem(invoice.id)}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Plus size={16} />
          Add Line Item
        </button>

        {/* Totals */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-end space-y-4">
          <div className="w-full md:w-64 flex items-center justify-between">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="font-medium">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency })
                .format(invoice.items.reduce((sum, item) => sum + item.amount, 0))}
            </span>
          </div>
          
          <div className="w-full md:w-64 flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600 whitespace-nowrap">Discount (%)</span>
            <input
              type="number"
              min="0"
              max="100"
              value={invoice.discountPercent}
              onChange={(e) => updateInvoice(invoice.id, { discountPercent: parseFloat(e.target.value) || 0 })}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1.5 border text-sm text-right"
            />
          </div>
          
          <div className="w-full md:w-64 flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600 whitespace-nowrap">Tax (%)</span>
            <input
              type="number"
              min="0"
              max="100"
              value={invoice.taxPercent}
              onChange={(e) => updateInvoice(invoice.id, { taxPercent: parseFloat(e.target.value) || 0 })}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1.5 border text-sm text-right"
            />
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              placeholder="Thanks for your business!"
              rows={3}
              value={invoice.notes}
              onChange={(e) => updateInvoice(invoice.id, { notes: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Information</label>
            <textarea
              placeholder="Bank details, PayPal link, etc."
              rows={3}
              value={invoice.paymentInfo}
              onChange={(e) => updateInvoice(invoice.id, { paymentInfo: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm resize-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
