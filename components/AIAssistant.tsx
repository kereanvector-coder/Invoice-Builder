'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Invoice, LineItem } from '@/lib/types';
import { X, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { v4 as uuidv4 } from 'uuid';

export default function AIAssistant({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) {
  const { setLineItems } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key is missing. Please configure it in your environment variables.');
      }

      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Extract line items for an invoice from the following text: "${prompt}". 
        If the user mentions a total amount but no rate, calculate the rate based on quantity (default quantity to 1 if not specified).
        If the user mentions a rate and quantity, calculate the amount.
        Return a JSON array of objects, where each object has 'description' (string), 'quantity' (number), 'rate' (number).`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                description: {
                  type: Type.STRING,
                  description: 'The description of the service or product.',
                },
                quantity: {
                  type: Type.NUMBER,
                  description: 'The quantity of the item. Default to 1 if not specified.',
                },
                rate: {
                  type: Type.NUMBER,
                  description: 'The unit price or hourly rate.',
                },
              },
              required: ['description', 'quantity', 'rate'],
            },
          },
        },
      });

      const text = response.text;
      if (!text) throw new Error('No response from AI');

      const parsedItems = JSON.parse(text);
      
      if (Array.isArray(parsedItems) && parsedItems.length > 0) {
        const newItems: LineItem[] = parsedItems.map((item: any) => ({
          id: uuidv4(),
          description: item.description || 'Item',
          quantity: Number(item.quantity) || 1,
          rate: Number(item.rate) || 0,
          amount: (Number(item.quantity) || 1) * (Number(item.rate) || 0),
        }));

        // Replace existing items or append? Let's replace if there's only one empty item, otherwise append.
        const currentItems = invoice.items;
        const hasOnlyEmptyItem = currentItems.length === 1 && !currentItems[0].description && currentItems[0].amount === 0;
        
        if (hasOnlyEmptyItem) {
          setLineItems(invoice.id, newItems);
        } else {
          setLineItems(invoice.id, [...currentItems, ...newItems]);
        }
        
        setPrompt('');
        onClose();
      } else {
        throw new Error('Could not extract any items from your description.');
      }

    } catch (err: any) {
      console.error('AI Generation Error:', err);
      setError(err.message || 'Failed to generate line items. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-indigo-50/50">
        <div className="flex items-center gap-2 text-indigo-700 font-semibold">
          <Sparkles size={20} />
          <h2>AI Auto-fill</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Describe your work</h3>
          <p className="text-sm text-gray-500">
            Tell us what you&apos;re billing for in plain English, and we&apos;ll automatically generate the line items for you.
          </p>
        </div>

        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 5 hours of UI design at $80/hr, plus a $200 setup fee and 2 hours of consulting at $100/hr."
            className="w-full h-40 p-4 rounded-xl border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none text-gray-700 placeholder-gray-400"
          />

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Examples</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                <span>&quot;Website redesign project: $2500 flat fee&quot;</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                <span>&quot;10 hours of development at $120/hr and 1 year of hosting for $300&quot;</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                <span>&quot;3 blog posts at $150 each, plus $50 for stock photos&quot;</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-sm"
        >
          {isGenerating ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Line Items
            </>
          )}
        </button>
      </div>
    </div>
  );
}
