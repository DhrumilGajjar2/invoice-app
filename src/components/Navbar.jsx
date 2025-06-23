import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, PlusSquare, File, Users,
  BarChart, Settings, Wallet, User, Menu, LogIn, UserPlus, ChevronDown
} from 'lucide-react';
import '../styles/main.css';

export default function Navbar() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);
  const [billingMenu, setBillingMenu] = useState(false);

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

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">InvoiceGen</Link>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={22} />
        </button>
      </div>

      <ul className={`navbar-right ${menuOpen ? 'open' : ''}`}>
        <li className={isActive('/') ? 'active' : ''}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <LayoutDashboard size={18} /> <span>Dashboard</span>
          </Link>
        </li>

        <li className="dropdown">
          <button onClick={() => setBillingMenu(!billingMenu)}>
            <FileText size={18} /> <span>Billing</span> <ChevronDown size={14} />
          </button>
          {billingMenu && (
            <ul className="dropdown-menu">
              <li className={isActive('/invoices') ? 'active' : ''}>
                <Link to="/invoices"><FileText size={16} /> Invoices</Link>
              </li>
              <li className={isActive('/create') ? 'active' : ''}>
                <Link to="/create"><PlusSquare size={16} /> Create Invoice</Link>
              </li>
              <li className={isActive('/quotes') ? 'active' : ''}>
                <Link to="/quotes"><File size={16} /> Quotes</Link>
              </li>
              <li className={isActive('/payments') ? 'active' : ''}>
                <Link to="/payments"><Wallet size={16} /> Payments</Link>
              </li>
            </ul>
          )}
        </li>

        <li className={isActive('/clients') ? 'active' : ''}>
          <Link to="/clients">
            <Users size={18} /> <span>Clients</span>
          </Link>
        </li>

        <li className={isActive('/reports') ? 'active' : ''}>
          <Link to="/reports">
            <BarChart size={18} /> <span>Reports</span>
          </Link>
        </li>

        <li className={isActive('/settings') ? 'active' : ''}>
          <Link to="/settings">
            <Settings size={18} /> <span>Settings</span>
          </Link>
        </li>

        <li className="dropdown">
          <button onClick={() => setAccountMenu(!accountMenu)}>
            <User size={18} /> <span>Account</span> <ChevronDown size={14} />
          </button>
          {accountMenu && (
            <ul className="dropdown-menu">
              <li className={isActive('/profile') ? 'active' : ''}>
                <Link to="/profile"><User size={16} /> Profile</Link>
              </li>
              <li className={isActive('/login') ? 'active' : ''}>
                <Link to="/login"><LogIn size={16} /> Login</Link>
              </li>
              <li className={isActive('/signup') ? 'active' : ''}>
                <Link to="/signup"><UserPlus size={16} /> Signup</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? '🌙' : '☀️'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
