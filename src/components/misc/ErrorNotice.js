import React from 'react';

const ErrorNotice = ({ message, clearError }) => (
  <div className="error-notice">
    <span>{message}</span>
    <button type="button" onClick={clearError}>X</button>
  </div>
);

export default ErrorNotice;
