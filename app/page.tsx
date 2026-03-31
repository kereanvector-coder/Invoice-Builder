'use client';

import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Plus, FileText, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

export default function Home() {
  const { invoices, createInvoice, deleteInvoice } = useAppStore();
  const router = useRouter();

  const handleCreate = () => {
    const id = createInvoice();
    router.push(`/invoice/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
            <p className="text-gray-500 mt-1">Manage and create your professional invoices.</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">New Invoice</span>
          </button>
        </div>

        {invoices.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No invoices yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Create your first invoice to get started. You can use our AI assistant to quickly generate line items.
            </p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Plus size={20} />
              Create Invoice
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 hidden md:table-row">
                    <th className="p-4 font-medium text-gray-600">Invoice</th>
                    <th className="p-4 font-medium text-gray-600">Client</th>
                    <th className="p-4 font-medium text-gray-600">Date</th>
                    <th className="p-4 font-medium text-gray-600">Status</th>
                    <th className="p-4 font-medium text-gray-600 text-right">Amount</th>
                    <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => {
                    const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
                    const discount = subtotal * (invoice.discountPercent / 100);
                    const tax = (subtotal - discount) * (invoice.taxPercent / 100);
                    const total = subtotal - discount + tax;

                    return (
                      <tr key={invoice.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors flex flex-col md:table-row">
                        <td className="p-4 md:py-4 flex justify-between md:table-cell">
                          <span className="md:hidden font-medium text-gray-500">Invoice</span>
                          <div className="font-medium text-gray-900">{invoice.invoiceNumber}</div>
                        </td>
                        <td className="p-4 md:py-4 flex justify-between md:table-cell">
                          <span className="md:hidden font-medium text-gray-500">Client</span>
                          <div className="text-right md:text-left">
                            <div className="text-gray-900">{invoice.toName || 'Unnamed Client'}</div>
                            {invoice.toEmail && <div className="text-sm text-gray-500">{invoice.toEmail}</div>}
                          </div>
                        </td>
                        <td className="p-4 md:py-4 text-gray-600 flex justify-between md:table-cell">
                          <span className="md:hidden font-medium text-gray-500">Date</span>
                          {format(new Date(invoice.issueDate), 'MMM d, yyyy')}
                        </td>
                        <td className="p-4 md:py-4 flex justify-between md:table-cell">
                          <span className="md:hidden font-medium text-gray-500">Status</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${invoice.status === 'Draft' ? 'bg-gray-100 text-gray-800' : ''}
                            ${invoice.status === 'Proforma' ? 'bg-purple-100 text-purple-800' : ''}
                            ${invoice.status === 'Final' ? 'bg-indigo-100 text-indigo-800' : ''}
                            ${invoice.status === 'Sent' ? 'bg-blue-100 text-blue-800' : ''}
                            ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : ''}
                            ${invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' : ''}
                          `}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="p-4 md:py-4 text-right font-medium text-gray-900 flex justify-between md:table-cell">
                          <span className="md:hidden font-medium text-gray-500">Amount</span>
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency }).format(total)}
                        </td>
                        <td className="p-4 md:py-4 text-right flex justify-end md:table-cell">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => router.push(`/invoice/${invoice.id}`)}
                              className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this invoice?')) {
                                  deleteInvoice(invoice.id);
                                }
                              }}
                              className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
