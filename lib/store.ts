import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Invoice, LineItem, InvoiceTemplate, Currency, InvoiceStatus, Client } from './types';
import { v4 as uuidv4 } from 'uuid';

interface AppState {
  invoices: Invoice[];
  clients: Client[];
  currentInvoiceId: string | null;
  
  // Actions
  createInvoice: () => string;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  setCurrentInvoice: (id: string | null) => void;
  
  // Client Actions
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  // Line Item Actions
  addLineItem: (invoiceId: string) => void;
  updateLineItem: (invoiceId: string, itemId: string, updates: Partial<LineItem>) => void;
  removeLineItem: (invoiceId: string, itemId: string) => void;
  setLineItems: (invoiceId: string, items: LineItem[]) => void;
}

const generateInvoiceNumber = (invoices: Invoice[]) => {
  const count = invoices.length + 1;
  return `INV-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      invoices: [],
      clients: [],
      currentInvoiceId: null,
      
      createInvoice: () => {
        const id = uuidv4();
        const newInvoice: Invoice = {
          id,
          invoiceNumber: generateInvoiceNumber(get().invoices),
          status: 'Draft',
          template: 'classic',
          currency: 'USD',
          
          fromName: '',
          fromEmail: '',
          fromAddress: '',
          fromPhone: '',
          
          toName: '',
          toEmail: '',
          toAddress: '',
          toPhone: '',
          
          issueDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          paymentTerms: 'Net 14',
          
          items: [{ id: uuidv4(), description: '', quantity: 1, rate: 0, amount: 0 }],
          
          discountPercent: 0,
          taxPercent: 0,
          
          notes: '',
          paymentInfo: '',
          
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        
        set((state) => ({
          invoices: [newInvoice, ...state.invoices],
          currentInvoiceId: id,
        }));
        
        return id;
      },
      
      updateInvoice: (id, updates) => {
        set((state) => ({
          invoices: state.invoices.map((inv) =>
            inv.id === id ? { ...inv, ...updates, updatedAt: Date.now() } : inv
          ),
        }));
      },
      
      deleteInvoice: (id) => {
        set((state) => ({
          invoices: state.invoices.filter((inv) => inv.id !== id),
          currentInvoiceId: state.currentInvoiceId === id ? null : state.currentInvoiceId,
        }));
      },
      
      setCurrentInvoice: (id) => {
        set({ currentInvoiceId: id });
      },
      
      addClient: (client) => {
        const newClient: Client = {
          ...client,
          id: uuidv4(),
          createdAt: Date.now(),
        };
        set((state) => ({
          clients: [newClient, ...state.clients],
        }));
      },
      
      updateClient: (id, updates) => {
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },
      
      deleteClient: (id) => {
        set((state) => ({
          clients: state.clients.filter((c) => c.id !== id),
        }));
      },
      
      addLineItem: (invoiceId) => {
        set((state) => ({
          invoices: state.invoices.map((inv) => {
            if (inv.id === invoiceId) {
              return {
                ...inv,
                items: [...inv.items, { id: uuidv4(), description: '', quantity: 1, rate: 0, amount: 0 }],
                updatedAt: Date.now(),
              };
            }
            return inv;
          }),
        }));
      },
      
      updateLineItem: (invoiceId, itemId, updates) => {
        set((state) => ({
          invoices: state.invoices.map((inv) => {
            if (inv.id === invoiceId) {
              const newItems = inv.items.map((item) => {
                if (item.id === itemId) {
                  const updatedItem = { ...item, ...updates };
                  updatedItem.amount = updatedItem.quantity * updatedItem.rate;
                  return updatedItem;
                }
                return item;
              });
              return { ...inv, items: newItems, updatedAt: Date.now() };
            }
            return inv;
          }),
        }));
      },
      
      removeLineItem: (invoiceId, itemId) => {
        set((state) => ({
          invoices: state.invoices.map((inv) => {
            if (inv.id === invoiceId) {
              return {
                ...inv,
                items: inv.items.filter((item) => item.id !== itemId),
                updatedAt: Date.now(),
              };
            }
            return inv;
          }),
        }));
      },
      
      setLineItems: (invoiceId, items) => {
        set((state) => ({
          invoices: state.invoices.map((inv) => {
            if (inv.id === invoiceId) {
              return {
                ...inv,
                items,
                updatedAt: Date.now(),
              };
            }
            return inv;
          }),
        }));
      }
    }),
    {
      name: 'invoice-builder-storage',
    }
  )
);
