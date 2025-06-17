import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import '../styles/main.css';

export default function InvoicePreview({ invoice }) {
  if (!invoice || !Array.isArray(invoice.items)) {
    return <p className="no-invoice">No invoice to preview.</p>;
  }

  const { clientName, projectDesc, date, items, taxRate, notes } = invoice;

  // Currency formatter
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

  // Memoized calculations
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.quantity * item.rate, 0), [items]);
  const tax = useMemo(() => subtotal * (taxRate / 100), [subtotal, taxRate]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  // Date formatting
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'N/A';

  return (
    <div className="invoice-preview glass">
      {/* Company Header */}
      <div className="company-info">
        <h2>Your Company Name</h2>
        <p>your@email.com | +91-99999-99999</p>
      </div>

      {/* Invoice Details */}
      <div className="invoice-header">
        <h3>Invoice</h3>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Client:</strong> {clientName}</p>
        <p><strong>Project:</strong> {projectDesc}</p>
      </div>

      {/* Invoice Table */}
      <table className="item-table" aria-label="Invoice Items Table">
        <caption>Invoice Item Details</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{formatCurrency(item.rate)}</td>
              <td>{formatCurrency(item.quantity * item.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="summary">
        <p><strong>Subtotal:</strong> {formatCurrency(subtotal)}</p>
        <p><strong>Tax ({taxRate}%):</strong> {formatCurrency(tax)}</p>
        <p><strong>Total:</strong> {formatCurrency(total)}</p>
      </div>

      {/* Notes Section */}
      {notes && (
        <div className="notes">
          <strong>Notes:</strong>
          <p>{notes}</p>
        </div>
      )}

      {/* Print Button */}
      <div className="invoice-actions">
        <button onClick={() => window.print()} className="print-btn">Print Invoice</button>
      </div>
    </div>
  );
}

// Prop validation
InvoicePreview.propTypes = {
  invoice: PropTypes.shape({
    clientName: PropTypes.string.isRequired,
    projectDesc: PropTypes.string,
    date: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        rate: PropTypes.number.isRequired,
      })
    ).isRequired,
    taxRate: PropTypes.number.isRequired,
    notes: PropTypes.string,
  }),
};
