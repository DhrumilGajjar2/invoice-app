import React from 'react';
import '../styles/main.css';

export default function InvoicePreview({ invoice }) {
  if (!invoice) return <p className="no-invoice">No invoice to preview.</p>;

  const { clientName, projectDesc, date, items, taxRate, notes } = invoice;

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

  const formattedDate = new Date(date).toLocaleDateString('en-IN');

  return (
    <div className="invoice-preview glass">
      <div className="invoice-header">
        <h2>Invoice</h2>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Client:</strong> {clientName}</p>
        <p><strong>Project:</strong> {projectDesc}</p>
      </div>

      <table className="item-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{formatCurrency(item.rate)}</td>
              <td>{formatCurrency(item.quantity * item.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary">
        <p><strong>Subtotal:</strong> {formatCurrency(subtotal)}</p>
        <p><strong>Tax ({taxRate}%):</strong> {formatCurrency(tax)}</p>
        <p><strong>Total:</strong> {formatCurrency(total)}</p>
      </div>

      {notes && (
        <div className="notes">
          <strong>Notes:</strong>
          <p>{notes}</p>
        </div>
      )}
    </div>
  );
}
