import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-5 min-vh-100 d-flex align-items-center justify-content-center">
          <Card className="card-modern text-center" style={{ maxWidth: '600px' }}>
            <Card.Body className="p-5">
              <div className="mb-4">
                <h1 className="display-1 text-gradient">😵</h1>
              </div>
              <h2 className="mb-3">Oops! Something went wrong</h2>
              <p className="text-muted mb-4">
                We're sorry, but something unexpected happened. Our team has been notified.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Card className="mb-4 text-start" bg="light">
                  <Card.Body>
                    <h6 className="text-danger">Error Details:</h6>
                    <pre className="mb-0 text-wrap" style={{ fontSize: '0.875rem' }}>
                      {this.state.error.toString()}
                    </pre>
                    {this.state.errorInfo && (
                      <>
                        <h6 className="text-danger mt-3">Stack Trace:</h6>
                        <pre className="mb-0 text-wrap" style={{ fontSize: '0.75rem' }}>
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </>
                    )}
                  </Card.Body>
                </Card>
              )}

              <div className="d-flex gap-3 justify-content-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={this.handleReset}
                >
                  Go to Home
                </Button>
                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
