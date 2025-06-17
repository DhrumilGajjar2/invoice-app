import React, { useState } from 'react';
import '../styles/main.css';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    invoiceId: '',
    clientName: '',
    amount: '',
    method: 'UPI',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPayment = { ...form, id: Date.now() };
    setPayments(prev => [newPayment, ...prev]);

    setForm({
      invoiceId: '',
      clientName: '',
      amount: '',
      method: 'UPI',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const totalReceived = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  return (
    <div className="payments-container glass">
      <h2>Payments</h2>

      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Invoice ID</label>
            <input name="invoiceId" value={form.invoiceId} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Client Name</label>
            <input name="clientName" value={form.clientName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Amount (₹)</label>
            <input type="number" name="amount" value={form.amount} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Method</label>
            <select name="method" value={form.method} onChange={handleChange}>
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>Card</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} />
          </div>
          <div className="form-group full-width">
            <label>Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="submit-btn">+ Add Payment</button>
      </form>

      <div className="summary">
        <h4>Total Payments Received: ₹{totalReceived.toFixed(2)}</h4>
      </div>

      <div className="payments-list">
        {payments.length === 0 ? (
          <p className="no-data">No payments recorded yet.</p>
        ) : (
          <table className="payments-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.invoiceId}</td>
                  <td>{payment.clientName || '-'}</td>
                  <td>₹{payment.amount}</td>
                  <td>
                    <span className={`badge ${payment.method.toLowerCase()}`}>
                      {payment.method}
                    </span>
                  </td>
                  <td>{payment.date}</td>
                  <td>{payment.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
