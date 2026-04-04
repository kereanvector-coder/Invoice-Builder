export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'INR' | 'NGN';

export type InvoiceStatus = 'Draft' | 'Proforma' | 'Final' | 'Sent' | 'Paid' | 'Overdue';

export type InvoiceTemplate =
  | 'classic'
  | 'minimal'
  | 'bold'
  | 'corporate'
  | 'creative'
  | 'futuristic'
  | 'ecommerce'
  | 'elegant'
  | 'startup'
  | 'monospace'
  | 'modern'
  | 'playful';

export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  createdAt: number;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  template: InvoiceTemplate;
  currency: Currency;
  
  logoUrl?: string;
  signatureUrl?: string;
  
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  fromPhone: string;
  
  toName: string;
  toEmail: string;
  toAddress: string;
  toPhone: string;
  
  issueDate: string;
  dueDate: string;
  paymentTerms: string;
  
  items: LineItem[];
  
  discountPercent: number;
  taxPercent: number;
  
  notes: string;
  paymentInfo: string;
  
  createdAt: number;
  updatedAt: number;
}
