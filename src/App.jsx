import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';

// Pages
import Dashboard from './pages/Dashboard';
import CreateInvoice from './pages/CreateInvoice';
import InvoiceView from './pages/InvoiceView';
import InvoiceList from './pages/InvoiceList'; // If you decide to keep InvoiceList as a page
import Clients from './pages/ClientPage';
import Profile from './pages/Profile';
import Quotes from './pages/Quotes';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Payments from './pages/Payments';
import NotFound from './pages/NotFound';

// Styles
import './styles/main.css';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateInvoice />} />
          <Route path="/invoice/:id" element={<InvoiceView />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/payments" element={<Payments />} />
          <Route path='/login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}
