import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Button, Form } from 'react-bootstrap';
import { handleReset } from "./authAPI";

export const ResetPage = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleResetSubmit = () => {
    dispatch(handleReset(email));
    setSent(true);
  }

  const dispatch = useDispatch();

  return (
    <Container>
      <h1>Reset Password</h1><br />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-4">
          <Button
            variant={sent ? "success" : "primary"}
            onClick={handleResetSubmit}
            disabled={sent}
          >
            {sent ? 'Password reset email sent' : 'Send password reset email'}
          </Button>
        </Form.Group>
      </Form>
      <br />
      Go back to <Link to="/login">login</Link>
      <br />
    </Container>
  );
};