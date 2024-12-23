import React from 'react';
import { Link } from 'react-router-dom';

const APIPage = () => {
  return (
    <div className="main-layout">
      <header className="header">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Logo" />
        </Link>
        <nav className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/api">API</Link>
            </li>
            <li>
              <Link to="/doc-api">Documentation API</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>API Page</h1>
        <p>This page provides information about the API.</p>
      </main>
    </div>
  );
};

export default APIPage;
