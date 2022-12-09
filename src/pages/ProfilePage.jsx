import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Profile</h1>
          <p>
            This is a dashboard page. You can only access this page if you are logged in.
          </p>
          <h2>Email: {user ? user.email : undefined}</h2>
          <h2>UID: {user ? user.uid : undefined}</h2>
        </Col>
      </Row>
    </Container>
  );
}