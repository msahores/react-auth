import React, { FC, MouseEvent } from 'react';

interface Props {
  message: string | undefined, 
  clearError: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void | undefined
}

const ErrorNotice: FC<Props> = ({ message, clearError }) => (
  <div className="error-notice">
    <span>{message}</span>
    <button type="button" onClick={clearError}>X</button>
  </div>
);

export default ErrorNotice;
