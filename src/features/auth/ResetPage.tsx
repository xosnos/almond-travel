'use client'

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { Container, Row, Col, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { handleReset } from "./authAPI";
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';

export const ResetPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleResetSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      dispatch(handleReset(email))
        .unwrap()
        .then(() => {
          setSent(true);
        })
        .catch((error: unknown) => {
          console.error("Failed to send reset email:", error);
        });
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <div className="card-modern">
            <h1 className="text-center mb-4">Reset Password</h1>

            {error && !sent && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            {sent && (
              <Alert variant="success" className="mb-3">
                <Alert.Heading>Email Sent!</Alert.Heading>
                <p className="mb-0">
                  If an account exists with <strong>{email}</strong>, you will receive a password reset email shortly.
                  Please check your inbox and follow the instructions.
                </p>
              </Alert>
            )}

            {!sent ? (
              <>
                <p className="text-muted mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <Form onSubmit={handleResetSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) validateEmail(e.target.value);
                      }}
                      onBlur={(e) => validateEmail(e.target.value)}
                      isInvalid={!!emailError}
                      disabled={loading}
                      style={{ transition: "border-color 0.3s ease" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {emailError}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="my-4">
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      disabled={loading || !!emailError || !email}
                      style={{ transition: "all 0.3s ease" }}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Sending email...
                        </>
                      ) : (
                        'Send password reset email'
                      )}
                    </Button>
                  </Form.Group>
                </Form>
              </>
            ) : (
              <div className="text-center">
                <Button
                  variant="primary"
                  className="w-100 mb-3"
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                    setEmailError("");
                  }}
                >
                  Send another reset email
                </Button>
              </div>
            )}

            <div className="text-center mt-4">
              Go back to{' '}
              <Link href="/login" className="text-decoration-none">
                login
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
