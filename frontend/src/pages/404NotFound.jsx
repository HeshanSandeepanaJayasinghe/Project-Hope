import React from 'react';
import { useNavigate } from 'react-router-dom';
import './404NotFound.css';
import undrawNotFound from '../assets/not-found/404notfound.svg';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <img src={undrawNotFound} alt="Not found illustration" className="notfound-image" />
        <div className="notfound-copy">
          <h1>404 — Page not found</h1>
          <p>We couldn’t find the page you’re looking for. It may have been moved or deleted.</p>
          <div className="notfound-actions">
            <button className="btn-primary" onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
