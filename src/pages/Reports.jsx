// pages/Reports.jsx
import React, { useEffect, useState } from 'react';
import '../styles/main.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Reports() {
  const [summary, setSummary] = useState({
    totalInvoices: 12,
    totalQuotes: 8,
    totalRevenue: 85000,
    paidInvoices: 8,
    unpaidInvoices: 4,
    monthlyRevenue: [
      { month: 'Jan', revenue: 5000 },
      { month: 'Feb', revenue: 7000 },
      { month: 'Mar', revenue: 12000 },
      { month: 'Apr', revenue: 10000 },
      { month: 'May', revenue: 18000 },
      { month: 'Jun', revenue: 33000 },
    ],
  });

  useEffect(() => {
    document.title = 'Reports | InvoiceGen';
  }, []);

  return (
    <div className="reports-container glass">
      <h2>Reports Dashboard</h2>

      <div className="summary-cards">
        <div className="card">
          <h4>Total Invoices</h4>
          <p>{summary.totalInvoices}</p>
        </div>
        <div className="card">
          <h4>Total Quotes</h4>
          <p>{summary.totalQuotes}</p>
        </div>
        <div className="card">
          <h4>Total Revenue</h4>
          <p>₹{summary.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="card">
          <h4>Paid Invoices</h4>
          <p>{summary.paidInvoices}</p>
        </div>
        <div className="card">
          <h4>Unpaid Invoices</h4>
          <p>{summary.unpaidInvoices}</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summary.monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
