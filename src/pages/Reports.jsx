import React, { useEffect, useState } from 'react';
import '../styles/main.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#4CAF50', '#F44336'];

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

  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    document.title = 'Reports | InvoiceGen';
  }, []);

  const invoiceStatusData = [
    { name: 'Paid', value: summary.paidInvoices },
    { name: 'Unpaid', value: summary.unpaidInvoices },
  ];

  return (
    <div className="reports-container glass">
      <h2 className="page-title">Reports Dashboard</h2>

      {/* Filters */}
      <div className="filters">
        <select>
          <option>Last 6 Months</option>
          <option>This Year</option>
          <option>Custom Range</option>
        </select>
        <select>
          <option>All Clients</option>
          <option>Client A</option>
          <option>Client B</option>
        </select>
        <select>
          <option>Status: All</option>
          <option>Paid</option>
          <option>Unpaid</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h4>Total Invoices</h4>
          <p>{summary.totalInvoices}</p>
        </div>
        <div className="card">
          <h4>Total Quotes</h4>
          <p>{summary.totalQuotes}</p>
        </div>
        <div className="card revenue">
          <h4>Total Revenue</h4>
          <p>₹{summary.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="card paid">
          <h4>Paid Invoices</h4>
          <p>{summary.paidInvoices}</p>
        </div>
        <div className="card unpaid">
          <h4>Unpaid Invoices</h4>
          <p>{summary.unpaidInvoices}</p>
        </div>
      </div>

      {/* Chart Toggle */}
      <div className="chart-toggle">
        <button onClick={() => setChartType('bar')}>Bar</button>
        <button onClick={() => setChartType('line')}>Line</button>
        <button onClick={() => setChartType('pie')}>Pie</button>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <h3>Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          {chartType === 'bar' && (
            <BarChart data={summary.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#007bff" />
            </BarChart>
          )}
          {chartType === 'line' && (
            <LineChart data={summary.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4CAF50" />
            </LineChart>
          )}
          {chartType === 'pie' && (
            <PieChart>
              <Pie
                data={invoiceStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {invoiceStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Export Options */}
      <div className="export-buttons">
        <button className="export-btn">Export PDF</button>
        <button className="export-btn">Export CSV</button>
      </div>
    </div>
  );
}
