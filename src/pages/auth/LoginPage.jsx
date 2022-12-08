import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap';
import Google from '../../assets/google.svg';
import { handleLoginEmailAndPassword, handleLoginGoogle } from "../../features/auth/authSlice";


export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
    

  return (
    <Container>
      <h1>Login</h1><br />
      <Row>
        <Col>
          <Button
            variant="dark"
            onClick={() => dispatch(handleLoginGoogle({email, password}))}
          >
            <img
              alt="Google"
              src={Google}
              width="20"
              height="20"
              className="d-inline-block align-top"
            />{' '}
            Sign in with Google
          </Button>
        </Col>
      </Row>
      <p className="text-center">or</p>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text>
            <Link to="/reset">Forgot password?</Link>
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Show password"
            onChange={(e) => setShowPassword(!showPassword)}
          />
        </Form.Group>
        <Form.Group className="my-4">
          <Button
            variant="primary"
            onClick={() => dispatch(handleLoginEmailAndPassword({email, password}))}
          >
            Sign in
          </Button>
        </Form.Group>
      </Form>
      <br />
      Don't have an account? <Link to="/register">Create one</Link>
      <br />
    </Container>
  );
};