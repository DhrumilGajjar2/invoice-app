import React, { useState, useMemo } from 'react';
import '../styles/main.css';

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [form, setForm] = useState({
    client: '',
    description: '',
    tax: 0,
    items: [{ id: Date.now(), desc: '', qty: 1, rate: 0 }],
  });

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[index][field] = field === 'desc' ? value : parseFloat(value) || 0;
    setForm({ ...form, items: updatedItems });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { id: Date.now(), desc: '', qty: 1, rate: 0 }],
    });
  };

  const removeItem = (id) => {
    if (form.items.length === 1) return; // prevent removing last item
    setForm({
      ...form,
      items: form.items.filter(item => item.id !== id),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'tax' ? parseFloat(value) : value });
  };

  const { subtotal, taxAmount, total } = useMemo(() => {
    const subtotal = form.items.reduce((sum, item) => sum + item.qty * item.rate, 0);
    const taxAmount = subtotal * (form.tax / 100);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  }, [form.items, form.tax]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuote = {
      ...form,
      id: `QUOTE-${Date.now()}`,
      subtotal,
      tax: taxAmount,
      total,
      date: new Date().toLocaleDateString(),
    };
    setQuotes([newQuote, ...quotes]);
    setForm({
      client: '',
      description: '',
      tax: 0,
      items: [{ id: Date.now(), desc: '', qty: 1, rate: 0 }],
    });
  };

  return (
    <div className="quotes-container glass">
      <h2>Create Quote</h2>

      <form className="quote-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Client Name</label>
          <input name="client" value={form.client} onChange={handleChange} required placeholder="e.g., Acme Corp" />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Optional description" />
        </div>

        <div className="form-row">
          <label>Line Items</label>
          {form.items.map((item, index) => (
            <div className="item-row" key={item.id}>
              <input
                type="text"
                placeholder="Item description"
                value={item.desc}
                onChange={e => handleItemChange(index, 'desc', e.target.value)}
                required
              />
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={e => handleItemChange(index, 'qty', e.target.value)}
                required
              />
              <input
                type="number"
                min="0"
                value={item.rate}
                onChange={e => handleItemChange(index, 'rate', e.target.value)}
                required
              />
              <span className="item-total">₹{(item.qty * item.rate).toFixed(2)}</span>
              <button type="button" onClick={() => removeItem(item.id)}>🗑</button>
            </div>
          ))}
          <button type="button" className="add-item-btn" onClick={addItem}>+ Add Item</button>
        </div>

        <div className="form-row">
          <label>Tax (%)</label>
          <input
            type="number"
            name="tax"
            value={form.tax}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="quote-totals">
          <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
          <p><strong>Tax:</strong> ₹{taxAmount.toFixed(2)}</p>
          <p><strong>Total:</strong> ₹{total.toFixed(2)}</p>
        </div>

        <button type="submit" className="submit-btn">Save Quote</button>
      </form>

      <div className="quotes-list">
        <h3>Saved Quotes</h3>
        {quotes.length === 0 && <p>No quotes created yet.</p>}
        {quotes.map(quote => (
          <div className="quote-card" key={quote.id}>
            <h4>{quote.client}</h4>
            <p><strong>Date:</strong> {quote.date}</p>
            <p><strong>Description:</strong> {quote.description || '-'}</p>
            <p><strong>Subtotal:</strong> ₹{quote.subtotal.toFixed(2)}</p>
            <p><strong>Tax:</strong> ₹{quote.tax.toFixed(2)}</p>
            <p><strong>Total:</strong> ₹{quote.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
