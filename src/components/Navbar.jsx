import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/main.css';

export default function Navbar() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/invoices', label: 'Invoices' },
    { path: '/create', label: 'Create Invoice' },
    { path: '/quotes', label: 'Quotes' },
    { path: '/clients', label: 'Clients' },
    { path: '/reports', label: 'Reports' },
    { path: '/settings', label: 'Settings' },
    {path: '/payments', label: 'Payments'},
    { path: '/profile', label: 'Profile' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">InvoiceGen</Link>
      </div>

      <ul className="navbar-right">
        {navLinks.map(link => (
          <li key={link.path} className={location.pathname === link.path ? 'active' : ''}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}

        <li>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? '🌙' : '☀️'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
