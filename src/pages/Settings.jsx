import React, { useState } from 'react';
import '../styles/main.css';

export default function Settings() {
  const [settings, setSettings] = useState({
    businessName: '',
    address: '',
    email: '',
    phone: '',
    currency: 'INR',
    taxRate: 0,
    invoicePrefix: 'INV-'
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(' Settings saved:', settings);
    alert(' Settings updated!');
  };

  return (
    <div className="settings-container glass">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-group">
          <label>Business Name</label>
          <input name="businessName" value={settings.businessName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea name="address" value={settings.address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={settings.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input name="phone" value={settings.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Currency</label>
          <select name="currency" value={settings.currency} onChange={handleChange}>
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
          </select>
        </div>
        <div className="form-group">
          <label>Default Tax Rate (%)</label>
          <input type="number" name="taxRate" value={settings.taxRate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Invoice Prefix</label>
          <input name="invoicePrefix" value={settings.invoicePrefix} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-btn"> Save Settings</button>
      </form>
    </div>
  );
}
