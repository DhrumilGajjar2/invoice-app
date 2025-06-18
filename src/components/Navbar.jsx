import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, PlusSquare, File, Users,
  BarChart, Settings, Wallet, User, Menu, LogIn, UserPlus
} from 'lucide-react';
import '../styles/main.css';

export default function Navbar() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
    if (savedTheme) document.body.classList.add('dark-mode');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', newMode);
  };

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/invoices', label: 'Invoices', icon: <FileText size={18} /> },
    { path: '/create', label: 'Create Invoice', icon: <PlusSquare size={18} /> },
    { path: '/quotes', label: 'Quotes', icon: <File size={18} /> },
    { path: '/clients', label: 'Clients', icon: <Users size={18} /> },
    { path: '/reports', label: 'Reports', icon: <BarChart size={18} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={18} /> },
    { path: '/payments', label: 'Payments', icon: <Wallet size={18} /> },
    { path: '/profile', label: 'Profile', icon: <User size={18} /> },
    { path: '/login', label: 'Login', icon: <LogIn size={18} /> },
    { path: '/signup', label: 'Signup', icon: <UserPlus size={18} /> }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">InvoiceGen</Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={22} />
        </button>
      </div>

      <ul className={`navbar-right ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <li key={link.path} className={location.pathname === link.path ? 'active' : ''}>
            <Link to={link.path} onClick={() => setMenuOpen(false)}>
              {link.icon} <span>{link.label}</span>
            </Link>
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
