import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

export const FeaturesPage = () => {
  return (
    <Container>
      <h1>Features</h1>
      <Row>
        <Col>
          <h2>High Priority</h2>
          <ul>
            <li>Flight Search & Booking</li>
            <li>Hotel Search & Booking</li>
            <li>Car Search & Booking</li>
            <li>Checklist</li>
            <li>Forums</li>
            <li>Articles</li>
          </ul>
        </Col>
        <Col>
          <h2>Low Priority</h2>
          <ul>
            <li>Profile</li>
            <li>Trips</li>
            <li>Static pages like this one</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}