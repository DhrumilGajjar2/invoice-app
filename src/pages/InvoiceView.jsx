import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import InvoicePreview from '../components/InvoicePreview';
import '../styles/main.css';

export default function InvoiceView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated dummy data (can be moved to a shared file later)
  useEffect(() => {
    const dummyInvoices = [
      {
        id: '1',
        clientName: 'Raj Sharma',
        projectDesc: 'Website redesign',
        date: '2025-06-10',
        taxRate: 18,
        notes: 'Payment due in 15 days.',
        items: [
          { description: 'Design', quantity: 2, rate: 3000 },
          { description: 'Development', quantity: 5, rate: 2500 },
        ],
      },
      {
        id: '2',
        clientName: 'Ayush Gupta',
        projectDesc: 'Mobile App UI',
        date: '2025-06-08',
        taxRate: 12,
        notes: 'Urgent delivery. Payment on delivery.',
        items: [
          { description: 'UI/UX', quantity: 3, rate: 4000 },
          { description: 'Prototyping', quantity: 1, rate: 2000 },
        ],
      },
    ];

    setLoading(true);
    const timeout = setTimeout(() => {
      const found = dummyInvoices.find(inv => inv.id === id);
      if (found) {
        setInvoice(found);
      } else {
        navigate('/notfound');
      }
      setLoading(false);
    }, 600); // Simulate delay

    return () => clearTimeout(timeout); // Clean up on unmount
  }, [id, navigate]);

  const handleBack = () => navigate(-1);

  return (
    <div className="invoice-view-container">
      <button onClick={handleBack} className="back-btn">← Back</button>
      <h2>Invoice #{id}</h2>

      {loading ? (
        <div className="loading">Loading invoice...</div>
      ) : (
        <InvoicePreview invoice={invoice} />
      )}
    </div>
  );
}
