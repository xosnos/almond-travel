import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';

export const Footer = () => {
  return (
    <Container fluid className="py-2 bg-dark text-muted">
      <Row>
        <Col lg={5} className="">
          &copy; 2022 The Almonds | xosnos
        </Col>
        <Col className="d-flex justify-content-around" lg={2}>
          <Image src={Logo} alt="" width="32" height="32" />
        </Col>
        <Col lg={5} className='d-flex justify-content-around'>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/features" className="nav-link">
            Features
          </Link>
          <Link to="/faq" className="nav-link">
            FAQ
          </Link>
          <a href="mailto:steyen@umich.edu" className="nav-link">
            Contact Us
          </a>
        </Col>
      </Row>
    </Container>
  );
};