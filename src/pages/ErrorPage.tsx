import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

export const ErrorPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            {/* Error Code */}
            <div className="mb-4">
              <h1
                className="display-1 fw-bold"
                style={{
                  fontSize: '8rem',
                  color: 'white',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  marginBottom: '0.5rem',
                }}
              >
                404
              </h1>
              <div
                className="w-100"
                style={{
                  height: '4px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  marginBottom: '2rem',
                }}
              />
            </div>

            {/* Error Message */}
            <h2 className="text-white fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
              Oops! Page Not Found
            </h2>

            <p className="text-white-75 fs-5 mb-4" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              You've landed on a page that doesn't exist. Don't worry, let us help you get back on track!
            </p>

            {/* Buttons */}
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Button
                onClick={() => navigate(-1)}
                className="px-5 py-3 fw-bold"
                style={{
                  background: 'white',
                  color: '#667eea',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                ← Go Back
              </Button>

              <Button
                onClick={() => navigate('/')}
                className="px-5 py-3 fw-bold"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Go to Home
              </Button>
            </div>

            {/* Decorative Elements */}
            <div className="mt-5 pt-5">
              <p className="text-white-50 small">
                Need help? Check out our <span className="text-white fw-bold">FAQ</span> or <span className="text-white fw-bold">Contact Us</span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
