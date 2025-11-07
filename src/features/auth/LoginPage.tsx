import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Alert,
  Spinner
} from 'react-bootstrap';
import Google from '../../assets/google.svg';
import { handleLoginEmailAndPassword, handleLoginGoogle } from "./authAPI.ts";
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch.ts';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailPasswordLogin = (e: FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      dispatch(handleLoginEmailAndPassword({ email, password }));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(handleLoginGoogle());
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <div className="card-modern">
            <h1 className="text-center mb-4">Login</h1>

            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            <Button
              variant="dark"
              className="w-100 mb-3 d-flex align-items-center justify-content-center"
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{ transition: "all 0.3s ease" }}
            >
              <img
                alt="Google"
                src={Google}
                width="20"
                height="20"
                className="me-2"
              />
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
                  Signing in...
                </>
              ) : (
                'Sign in with Google'
              )}
            </Button>

            <div className="text-center my-3">
              <span className="text-muted">or</span>
            </div>

            <Form onSubmit={handleEmailPasswordLogin}>
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
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) validatePassword(e.target.value);
                  }}
                  onBlur={(e) => validatePassword(e.target.value)}
                  isInvalid={!!passwordError}
                  disabled={loading}
                  style={{ transition: "border-color 0.3s ease" }}
                />
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
                <Form.Text>
                  <Link to="/reset" className="text-decoration-none">
                    Forgot password?
                  </Link>
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Show password"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="my-4">
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading || !!emailError || !!passwordError}
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
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </Form.Group>
            </Form>

            <div className="text-center mt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-decoration-none">
                Create one
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
