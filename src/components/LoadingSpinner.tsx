import React from 'react';
import { Spinner } from './ui/spinner';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'lg',
  fullScreen = false,
  message = 'Loading...',
}) => {
  const content = (
    <div className="text-center">
      <Spinner size={size} />
      {message && (
        <p className="mt-3 text-muted-foreground font-medium">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
