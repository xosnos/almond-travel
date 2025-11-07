'use client';

import { useRouter } from 'next/navigation';
import { Container, Button } from 'react-bootstrap';

export const ErrorPage = () => {
  const router = useRouter();

  return (
    <Container className="py-5 text-center">
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="display-1 fw-bold" style={{ color: '#667eea' }}>404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="lead text-muted mb-4">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <div className="d-flex gap-3">
          <Button
            variant="outline-primary"
            onClick={() => router.back()}
            size="lg"
          >
            Go Back
          </Button>
          <Button
            variant="primary"
            onClick={() => router.push('/')}
            size="lg"
          >
            Go Home
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ErrorPage;
