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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPayment = {
      ...form,
      id: Date.now()
    };
    setPayments([newPayment, ...payments]);
    setForm({
      invoiceId: '',
      clientName: '',
      amount: '',
      method: 'UPI',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  return (
    <div className="payments-container glass">
      <h2>Payments</h2>

      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Invoice ID</label>
          <input
            name="invoiceId"
            value={form.invoiceId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Client Name</label>
          <input
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>
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

        <div className="form-group">
          <label>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">Add Payment</button>
      </form>

      <div className="payments-list">
        {payments.length === 0 && <p>No payments recorded yet.</p>}
        {payments.map(payment => (
          <div className="payment-card" key={payment.id}>
            <h4>Invoice ID: {payment.invoiceId}</h4>
            <p>Client: {payment.clientName}</p>
            <p>Amount: ₹{payment.amount}</p>
            <p>Method: {payment.method}</p>
            <p>Date: {payment.date}</p>
            {payment.notes && <p>Note: {payment.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
