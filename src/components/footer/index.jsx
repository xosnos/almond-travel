import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <Container fluid className="py-2 bg-dark fixed-bottom">
      <Row>
        <p className="col-lg-6 text-center text-white">&copy; 2022 The Almonds</p>
        <ul className="col-lg-6 nav justify-content-end">
          <li className="nav-item">
            <a href="/about" className="nav-link text-muted">About</a>
          </li>
          <li className="nav-item"><a href="/features" className="nav-link text-muted">Features</a></li>
          <li className="nav-item"><a href="/faq" className="nav-link text-muted">FAQs</a></li>
          <li className="nav-item"><a href="mailto:thealmondsdevteam@gmail.com" className="nav-link text-muted">Contact Us</a></li>
        </ul>
      </Row>
    </Container>
  );
}

export default Footer;