import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InvoiceForm from '../components/InvoiceForm';
import '../styles/main.css';

export default function CreateInvoice() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    document.title = 'Create Invoice | InvoiceGen';
  }, []);

  useEffect(() => {
    if (showMessage) {
      const timeout = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showMessage]);

  const handleSuccess = () => {
    setShowMessage(true);
  };

  return (
    <div className="create-invoice-container glass">
      <div className="header-row">
        <Link to="/" className="back-btn">← Back to Dashboard</Link>
        <h2>Create New Invoice</h2>
      </div>

      {showMessage && (
        <div className="success-msg">✅ Invoice Created Successfully!</div>
      )}

      <InvoiceForm onSuccess={handleSuccess} />
    </div>
  );
}
