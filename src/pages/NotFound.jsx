import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn’t exist.</p>
      <Link to="/" className="home-link">← Go back to Dashboard</Link>
    </div>
  );
}
