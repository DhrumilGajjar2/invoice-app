import React, { useEffect, useState } from 'react';
import '../styles/main.css';

const DEFAULT_SETTINGS = {
  businessName: '',
  address: '',
  email: '',
  phone: '',
  currency: 'INR',
  taxEnabled: true,
  taxRate: 18,
  invoicePrefixEnabled: true,
  invoicePrefix: 'INV-',
};

export default function Settings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState('general');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('invoicegen-settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('invoicegen-settings', JSON.stringify(settings));
  }, [settings]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'taxRate' ? parseFloat(value) || 0 : value,
    }));
  };

  const validate = () => {
    const errs = {};
    if (!settings.email.includes('@')) errs.email = 'Invalid email address';
    if (!settings.phone.match(/^[0-9]{10,15}$/)) errs.phone = 'Phone must be 10–15 digits';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert(' Settings saved successfully!');
    }
  };

  return (
    <div className="settings-container glass">
      <h2>Business Settings</h2>

      <div className="tabs">
        {['general', 'tax', 'invoice'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        {activeTab === 'general' && (
          <>
            <div className="form-group">
              <label>Business Name</label>
              <input name="businessName" value={settings.businessName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea name="address" value={settings.address} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={settings.email} onChange={handleChange} />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={settings.phone} onChange={handleChange} />
              {errors.phone && <small className="error">{errors.phone}</small>}
            </div>
            <div className="form-group">
              <label>Currency</label>
              <select name="currency" value={settings.currency} onChange={handleChange}>
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
              </select>
            </div>
          </>
        )}

        {activeTab === 'tax' && (
          <>
            <div className="form-group checkbox">
              <label>
                <input type="checkbox" name="taxEnabled" checked={settings.taxEnabled} onChange={handleChange} />
                Enable Tax Calculation
              </label>
            </div>
            {settings.taxEnabled && (
              <div className="form-group">
                <label>Default Tax Rate (%)</label>
                <input type="number" name="taxRate" value={settings.taxRate} onChange={handleChange} min="0" />
              </div>
            )}
          </>
        )}

        {activeTab === 'invoice' && (
          <>
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="invoicePrefixEnabled"
                  checked={settings.invoicePrefixEnabled}
                  onChange={handleChange}
                />
                Enable Invoice Prefix
              </label>
            </div>
            {settings.invoicePrefixEnabled && (
              <div className="form-group">
                <label>Invoice Prefix</label>
                <input
                  name="invoicePrefix"
                  value={settings.invoicePrefix}
                  onChange={handleChange}
                  placeholder="e.g. INV-, BILL-"
                />
              </div>
            )}
            <p className="preview">Preview: {settings.invoicePrefixEnabled ? settings.invoicePrefix : ''}1001</p>
          </>
        )}

        <button type="submit" className="submit-btn">Save Settings</button>
      </form>
    </div>
  );
}
