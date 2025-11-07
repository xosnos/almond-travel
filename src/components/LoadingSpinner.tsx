import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

interface LoadingSpinnerProps {
  size?: 'sm' | 'lg';
  fullScreen?: boolean;
  message?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'lg',
  fullScreen = false,
  message = 'Loading...',
  variant = 'primary'
}) => {
  const content = (
    <div className="text-center">
      <Spinner
        animation="border"
        role="status"
        variant={variant}
        size={size === 'lg' ? undefined : 'sm'}
        style={size === 'lg' ? { width: '3rem', height: '3rem' } : undefined}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {message && (
        <p className="mt-3 text-muted fw-medium">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <Container className="min-vh-100 d-flex align-items-center justify-content-center">
        {content}
      </Container>
    );
  }

  return content;
};

export default LoadingSpinner;
