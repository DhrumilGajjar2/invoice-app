import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

export default function InvoiceList({ invoices = [], onDelete = () => {} }) {
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      onDelete(id);
    }
  };

  if (invoices.length === 0) {
    return (
      <div className="no-invoices">
        <p>😕 No invoices found.</p>
        <Link to="/create" className="btn create-btn">Create Your First Invoice</Link>
      </div>
    );
  }

  return (
    <div className="invoice-list glass">
      <table className="invoice-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Client</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={invoice.id}>
              <td>{index + 1}</td>
              <td>{invoice.clientName}</td>
              <td>{formatCurrency(invoice.total)}</td>
              <td>{formatDate(invoice.date)}</td>
              <td className={`status ${invoice.status?.toLowerCase() || 'unpaid'}`}>
                {invoice.status || 'Unpaid'}
              </td>
              <td className="actions-cell">
                <Link to={`/invoice/${invoice.id}`} className="btn view-btn">View</Link>
                <Link to={`/edit/${invoice.id}`} className="btn edit-btn">Edit</Link>
                <button onClick={() => handleDelete(invoice.id)} className="btn delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
