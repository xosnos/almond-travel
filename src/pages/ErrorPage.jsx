import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
} from 'react-bootstrap';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Error 404</h1>
      <p>You've landed on a page that doesn't exist</p>
      <Button onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Container>
  );
}