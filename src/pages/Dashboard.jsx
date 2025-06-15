import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import InvoiceList from '../pages/InvoiceList';

export default function Dashboard() {
  const [invoices, setInvoices] = useState([
    {
      id: '1',
      clientName: 'Raj Sharma',
      total: 1500,
      date: '2025-06-10',
      status: 'Paid',
    },
    {
      id: '2',
      clientName: 'Ayush Gupta',
      total: 3200,
      date: '2025-06-08',
      status: 'Unpaid',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this invoice?');
    if (confirmed) {
      setInvoices(prev => prev.filter(inv => inv.id !== id));
      setToast('Invoice deleted successfully.');
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || invoice.id.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-container glass">
      <div className="dashboard-header">
        <h2>Invoice Dashboard</h2>
        <Link to="/create" className="create-btn">+ New Invoice</Link>
      </div>

      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Search by client or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      {toast && <div className="toast">{toast}</div>}

      <InvoiceList invoices={filteredInvoices} onDelete={handleDelete} />
    </div>
  );
}
