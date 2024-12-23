import React from 'react';
import { Link } from 'react-router-dom';

const APIPage = () => {
  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          <Link to="/">Yossi Chat</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/api">API Page</Link>
            </li>
            <li>
              <Link to="/doc-api">Documentation API Page</Link>
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
