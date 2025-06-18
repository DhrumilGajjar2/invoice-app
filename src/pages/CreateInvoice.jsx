import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InvoiceForm from '../components/InvoiceForm';
import '../styles/main.css';

export default function CreateInvoice() {
  const [showMessage, setShowMessage] = useState(false);
  const location = useLocation();

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
    localStorage.removeItem('invoiceDraft');
  };

  const from = location.state?.from || '/dashboard';

  return (
    <div className="create-invoice-container glass">
      <div className="header-row">
        <Link to={from} className="back-btn"> Back to Dashboard</Link>
        <div>
          <h2 className="page-title"> Create a Professional Invoice</h2>
          <p className="subtitle">Fill in the details and preview in real-time.</p>
        </div>
      </div>

      {showMessage && (
        <div className="toast-success">
           Invoice Created Successfully!
        </div>
      )}

      <div className="invoice-body-layout">
        <div className="form-column">
          <InvoiceForm onSuccess={handleSuccess} />
        </div>
        <div className="preview-column">
          {/*  Add a PreviewInvoice component later */}
          <p className="preview-placeholder">Live Preview (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
}
