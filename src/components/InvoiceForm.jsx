import React, { useState, useEffect, useCallback } from 'react';
import '../styles/main.css';

export default function InvoiceForm({ onSuccess }) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [currency, setCurrency] = useState('₹');
  const [items, setItems] = useState([
    { id: Date.now(), description: '', quantity: 1, rate: 0 }
  ]);

  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem('invoiceDraft'));
    if (draft) {
      setClientName(draft.clientName);
      setClientEmail(draft.clientEmail);
      setProjectDesc(draft.projectDesc);
      setTaxRate(draft.taxRate);
      setDiscount(draft.discount);
      setNotes(draft.notes);
      setItems(draft.items);
      setInvoiceNumber(draft.invoiceNumber);
      setCurrency(draft.currency);
    }
  }, []);

  useEffect(() => {
    const draft = {
      clientName,
      clientEmail,
      projectDesc,
      taxRate,
      discount,
      notes,
      items,
      invoiceNumber,
      currency
    };
    localStorage.setItem('invoiceDraft', JSON.stringify(draft));
  }, [clientName, clientEmail, projectDesc, taxRate, discount, notes, items, invoiceNumber, currency]);

  const handleItemChange = useCallback((index, field, value) => {
    setItems(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: field === 'description' ? value : Math.max(0, parseFloat(value) || 0)
      };
      return updated;
    });
  }, []);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), description: '', quantity: 1, rate: 0 }]);
  };

  const handleRemoveItem = (id) => {
    if (items.length === 1) return;
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const tax = subtotal * (taxRate / 100);
  const discountAmount = (subtotal + tax) * (discount / 100);
  const total = subtotal + tax - discountAmount;

  const resetForm = () => {
    setClientName('');
    setClientEmail('');
    setProjectDesc('');
    setTaxRate(0);
    setDiscount(0);
    setNotes('');
    setInvoiceNumber('');
    setCurrency('₹');
    setItems([{ id: Date.now(), description: '', quantity: 1, rate: 0 }]);
    localStorage.removeItem('invoiceDraft');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim() || items.some(i => !i.description.trim())) {
      alert('Please complete all required fields.');
      return;
    }

    const invoice = {
      id: invoiceNumber || `INV-${Date.now()}`,
      clientName,
      clientEmail,
      projectDesc,
      taxRate,
      discount,
      notes,
      items,
      subtotal,
      total,
      currency,
      date: new Date().toISOString().split('T')[0]
    };

    console.log('Invoice Created:', invoice);
    if (onSuccess) onSuccess(invoice);
    alert('✅ Invoice Created! (check console)');
    resetForm();
  };

  return (
    <form className="invoice-form glass" onSubmit={handleSubmit}>
      <h2>Create Invoice</h2>

      <div className="form-group">
        <label>Invoice Number</label>
        <input value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} placeholder="INV-2025-001" />
      </div>

      <div className="form-group">
        <label>Client Name *</label>
        <input value={clientName} onChange={e => setClientName(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Client Email</label>
        <input type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Project Description</label>
        <textarea value={projectDesc} onChange={e => setProjectDesc(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Currency</label>
        <select value={currency} onChange={e => setCurrency(e.target.value)}>
          <option value="₹">₹ INR</option>
          <option value="$">$ USD</option>
          <option value="€">€ EUR</option>
        </select>
      </div>

      <div className="form-group">
        <label>Line Items *</label>
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
            <span className="item-total">{currency}{(item.quantity * item.rate).toFixed(2)}</span>
            <button type="button" onClick={() => handleRemoveItem(item.id)}>🗑</button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem} className="add-item-btn">+ Add Item</button>
      </div>

      <div className="form-group">
        <label>Tax (%)</label>
        <input type="number" min="0" value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value))} />
      </div>

      <div className="form-group">
        <label>Discount (%)</label>
        <input type="number" min="0" value={discount} onChange={e => setDiscount(parseFloat(e.target.value))} />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} />
      </div>

      <div className="summary-box">
        <p><strong>Subtotal:</strong> {currency}{subtotal.toFixed(2)}</p>
        <p><strong>Tax:</strong> {currency}{tax.toFixed(2)}</p>
        <p><strong>Discount:</strong> {currency}{discountAmount.toFixed(2)}</p>
        <p><strong>Total:</strong> {currency}{total.toFixed(2)}</p>
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={!clientName.trim() || items.some(i => !i.description.trim())}
      >
        Save Invoice
      </button>
    </form>
  );
}
