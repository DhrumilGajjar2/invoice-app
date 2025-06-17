import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import InvoiceList from '../pages/InvoiceList';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

export default function Dashboard() {
  const [invoices, setInvoices] = useState([
    { id: '1', clientName: 'Raj Sharma', total: 1500, date: '2025-06-10', status: 'Paid' },
    { id: '2', clientName: 'Ayush Gupta', total: 3200, date: '2025-06-08', status: 'Unpaid' },
    { id: '3', clientName: 'Anjali Mehta', total: 2100, date: '2025-06-06', status: 'Paid' },
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

  // Stats
  const totalRevenue = invoices.reduce((sum, i) => sum + i.total, 0);
  const totalPaid = invoices.filter(i => i.status === 'Paid').length;
  const totalUnpaid = invoices.filter(i => i.status === 'Unpaid').length;

  const recentInvoices = invoices.slice(0, 3);
  const monthlyRevenue = [
    { month: 'Jan', revenue: 5000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 4500 },
    { month: 'Apr', revenue: 6000 },
    { month: 'May', revenue: 7500 },
    { month: 'Jun', revenue: totalRevenue },
  ];

  return (
    <div className="dashboard-container glass">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="quick-actions">
          <Link to="/create" className="create-btn">+ New Invoice</Link>
          <Link to="/clients" className="create-btn secondary">+ Add Client</Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-cards">
        <div className="card">
          <h4>Total Invoices</h4>
          <p>{invoices.length}</p>
        </div>
        <div className="card">
          <h4>Paid</h4>
          <p>{totalPaid}</p>
        </div>
        <div className="card">
          <h4>Unpaid</h4>
          <p>{totalUnpaid}</p>
        </div>
        <div className="card">
          <h4>Total Revenue</h4>
          <p>₹{totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Graph */}
      <div className="chart-section">
        <h3>Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#00a86b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Controls */}
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

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}

      {/* Recent */}
      <div className="recent-section">
        <h3>Recent Invoices</h3>
        {recentInvoices.map(inv => (
          <div key={inv.id} className="recent-invoice">
            <strong>{inv.clientName}</strong> - ₹{inv.total} - <em>{inv.status}</em>
          </div>
        ))}
      </div>

      {/* Invoice List */}
      <InvoiceList invoices={filteredInvoices} onDelete={handleDelete} />
    </div>
  );
}
