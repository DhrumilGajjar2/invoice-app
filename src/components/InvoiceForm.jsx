import React, { useState } from 'react';
import '../styles/main.css';

export default function InvoiceForm( { onSuccess}) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState('');

  const [items, setItems] = useState([
    { id: Date.now(), description: '', quantity: 1, rate: 0 }
  ]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    if (field === 'description') {
      updatedItems[index][field] = value;
    } else {
      updatedItems[index][field] = Math.max(0, parseFloat(value) || 0);
    }
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), description: '', quantity: 1, rate: 0 }]);
  };

  const handleRemoveItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const resetForm = () => {
    setClientName('');
    setClientEmail('');
    setProjectDesc('');
    setTaxRate(0);
    setNotes('');
    setItems([{ id: Date.now(), description: '', quantity: 1, rate: 0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoice = {
      id: `INV-${Date.now()}`, // unique invoice ID
      clientName,
      clientEmail,
      projectDesc,
      taxRate,
      notes,
      items,
      subtotal,
      total,
      date: new Date().toISOString().split('T')[0],
    };
    console.log('Invoice Created:', invoice);
    if (onSuccess) onSuccess();
    alert('✅ Invoice Created! (check console)');
    resetForm();
  };

  return (
    <form className="invoice-form glass" onSubmit={handleSubmit}>
      <h2>Create Invoice</h2>

      <div className="form-group">
        <label>Client Name</label>
        <input value={clientName} onChange={e => setClientName(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Client Email</label>
        <input
          type="email"
          value={clientEmail}
          onChange={e => setClientEmail(e.target.value)}
          placeholder="example@email.com"
        />
      </div>

      <div className="form-group">
        <label>Project Description</label>
        <textarea value={projectDesc} onChange={e => setProjectDesc(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Line Items</label>
        {items.map((item, index) => (
          <div className="item-row" key={item.id}>
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={e => handleItemChange(index, 'description', e.target.value)}
              required
            />
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={e => handleItemChange(index, 'quantity', e.target.value)}
              required
            />
            <input
              type="number"
              min="0"
              value={item.rate}
              onChange={e => handleItemChange(index, 'rate', e.target.value)}
              required
            />
            <span className="item-total">₹{(item.quantity * item.rate).toFixed(2)}</span>
            <button type="button" onClick={() => handleRemoveItem(item.id)}>🗑</button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem} className="add-item-btn">+ Add Item</button>
      </div>

      <div className="form-group">
        <label>Tax (%)</label>
        <input
          type="number"
          min="0"
          value={taxRate}
          onChange={e => setTaxRate(parseFloat(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} />
      </div>

      <div className="summary-box">
        <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
        <p><strong>Tax:</strong> ₹{tax.toFixed(2)}</p>
        <p><strong>Total:</strong> ₹{total.toFixed(2)}</p>
      </div>

      <button type="submit" className="submit-btn">💾 Save Invoice</button>
    </form>
  );
}
