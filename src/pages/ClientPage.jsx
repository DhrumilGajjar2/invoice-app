import React, { useState } from 'react';
import '../styles/main.css';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    gstin: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClient = { ...form, id: Date.now(), invoices: [], quotes: [] };
    setClients([newClient, ...clients]);
    setForm({ name: '', email: '', phone: '', gstin: '' });
  };

  return (
    <div className="clients-container glass">
      <h2>Clients</h2>

      <form className="client-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>GSTIN</label>
          <input name="gstin" value={form.gstin} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">Add Client</button>
      </form>

      <div className="clients-list">
        {clients.length === 0 && <p>No clients added yet.</p>}
        {clients.map(client => (
          <div className="client-card" key={client.id}>
            <h4>{client.name}</h4>
            <p>Email: {client.email}</p>
            <p>Phone: {client.phone}</p>
            <p>GSTIN: {client.gstin}</p>
            <p>Invoices Linked: {client.invoices.length}</p>
            <p>Quotes Linked: {client.quotes.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
