'use client'

import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert
} from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppDispatch.ts';
import { handleLogout } from './authAPI.ts';
import { User } from '../../types';

export const ProfilePage: React.FC = () => {
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Protected route logic - redirect to login if not authenticated
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogoutClick = () => {
    dispatch(handleLogout()).then(() => {
      router.push("/login");
    });
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // Don't render anything if user is null (will redirect in useEffect)
  if (!user) {
    return null;
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="card-modern">
            <h1 className="text-center mb-4">Profile</h1>

            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <Row className="mb-3">
                  <Col xs={4} className="fw-bold text-muted">
                    Email:
                  </Col>
                  <Col xs={8}>
                    {user.email}
                  </Col>
                </Row>
                <Row>
                  <Col xs={4} className="fw-bold text-muted">
                    User ID:
                  </Col>
                  <Col xs={8}>
                    <code className="text-muted small">{user.uid}</code>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="d-grid gap-2">
              <Button
                variant="outline-primary"
                size="lg"
                onClick={() => router.push('/trips')}
                style={{ transition: "all 0.3s ease" }}
              >
                View My Trips
              </Button>
              <Button
                variant="outline-danger"
                size="lg"
                onClick={handleLogoutClick}
                style={{ transition: "all 0.3s ease" }}
              >
                Logout
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
