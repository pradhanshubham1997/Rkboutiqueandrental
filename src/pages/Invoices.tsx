import { useState } from 'react';
import { Eye, Printer, Download, FileText, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const statusColor: Record<string, string> = {
  paid: 'bg-green-100 text-green-700', unpaid: 'bg-red-100 text-red-700', partial: 'bg-amber-100 text-amber-700',
};
const typeColors: Record<string, string> = {
  retail: 'bg-blue-50 text-blue-700', rental: 'bg-purple-50 text-purple-700', mixed: 'bg-emerald-50 text-emerald-700',
};

export default function Invoices() {
  const { invoices } = useApp();
  const [selectedInvoice, setSelectedInvoice] = useState<typeof invoices[0] | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Invoices</h2>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Invoice</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Order</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{invoice.orderId}</td>
                  <td className="py-3 px-4 text-gray-600">{invoice.customerName}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${typeColors[invoice.orderType]}`}>{invoice.orderType}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{invoice.date}</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">₹{invoice.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[invoice.paymentStatus]}`}>{invoice.paymentStatus}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => setSelectedInvoice(invoice)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Eye className="w-4 h-4 text-gray-500" /></button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Printer className="w-4 h-4 text-gray-500" /></button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Download className="w-4 h-4 text-gray-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedInvoice(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-gray-900">Invoice</h3>
              <button onClick={() => setSelectedInvoice(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6 pb-4 border-b border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-lg">RK</span>
                </div>
                <h4 className="font-bold text-lg text-gray-900">RK BOUTIQUE & RENTALS</h4>
                <p className="text-xs text-gray-500">42 MG Road, Raipur, Chhattisgarh 492001</p>
                <p className="text-xs text-gray-500">Phone: +91 98765 43210</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div><p className="text-gray-500 text-xs">Invoice No</p><p className="font-semibold">{selectedInvoice.id}</p></div>
                <div><p className="text-gray-500 text-xs">Order No</p><p className="font-semibold">{selectedInvoice.orderId}</p></div>
                <div><p className="text-gray-500 text-xs">Customer</p><p className="font-semibold">{selectedInvoice.customerName}</p></div>
                <div><p className="text-gray-500 text-xs">Date</p><p className="font-semibold">{selectedInvoice.date}</p></div>
                <div><p className="text-gray-500 text-xs">Type</p>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${typeColors[selectedInvoice.orderType]}`}>{selectedInvoice.orderType}</span>
                </div>
                <div><p className="text-gray-500 text-xs">Payment</p>
                  <span className={`font-semibold ${selectedInvoice.paymentStatus === 'paid' ? 'text-green-600' : selectedInvoice.paymentStatus === 'partial' ? 'text-amber-600' : 'text-red-600'}`}>{selectedInvoice.paymentStatus}</span>
                </div>
              </div>

              {selectedInvoice.items.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Items</p>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3">Product</th>
                          <th className="text-center py-2 px-3">Type</th>
                          <th className="text-center py-2 px-3">Qty</th>
                          <th className="text-right py-2 px-3">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoice.items.map((item, i) => (
                          <tr key={i} className="border-b border-gray-100 last:border-0">
                            <td className="py-2 px-3 font-medium">{item.productName}</td>
                            <td className="py-2 px-3 text-center">
                              <span className={`px-1 py-0.5 rounded text-[8px] font-bold uppercase ${item.type === 'retail' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{item.type}</span>
                            </td>
                            <td className="py-2 px-3 text-center">{item.quantity}</td>
                            <td className="py-2 px-3 text-right font-medium">₹{(item.price * item.quantity).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-medium">₹{selectedInvoice.subtotal.toLocaleString()}</span></div>
                {selectedInvoice.discount > 0 && <div className="flex justify-between"><span className="text-gray-500">Discount</span><span className="font-medium text-green-600">-₹{selectedInvoice.discount.toLocaleString()}</span></div>}
                {selectedInvoice.rentalCharges > 0 && <div className="flex justify-between"><span className="text-gray-500">Rental Charges</span><span className="font-medium text-purple-600">₹{selectedInvoice.rentalCharges.toLocaleString()}</span></div>}
                {selectedInvoice.securityDeposit > 0 && <div className="flex justify-between"><span className="text-gray-500">Security Deposit</span><span className="font-medium">₹{selectedInvoice.securityDeposit.toLocaleString()}</span></div>}
                <div className="flex justify-between"><span className="text-gray-500">Tax (18%)</span><span className="font-medium">₹{selectedInvoice.tax.toLocaleString()}</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200"><span>Total</span><span>₹{selectedInvoice.amount.toLocaleString()}</span></div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">Thank you for your business!</p>
                <p className="text-[10px] text-gray-400 mt-1">RK Boutique & Rentals · Raipur, Chhattisgarh</p>
              </div>

              <div className="mt-4 flex gap-3">
                <button onClick={() => setSelectedInvoice(null)} className="flex-1 py-2.5 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-200">Close</button>
                <button className="flex-1 py-2.5 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
