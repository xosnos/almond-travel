'use client'

import React, { FC } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Link from 'next/link';
import './Footer.scss';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-modern">
      <Container fluid className="footer-container">
        {/* Main Footer Content */}
        <Row className="footer-content py-5">
          {/* Brand Section */}
          <Col lg={5} md={6} className="footer-brand mb-4 mb-lg-0">
            <div className="footer-brand-content">
              <div className="footer-brand-header">
                <Image
                  src="/almond-travel-icon.png"
                  alt="Almond Travel"
                  width="36"
                  height="36"
                  className="footer-logo"
                />
                <h3 className="footer-brand-title">Almond Travel</h3>
              </div>
              <p className="footer-brand-description">
                Discover the world's most beautiful destinations with seamless
                trip planning and community insights.
              </p>
              <div className="footer-badge-container">
                <span className="footer-badge">Trusted by Travelers</span>
                <span className="footer-badge">Global Community</span>
              </div>
            </div>
          </Col>

          {/* Logo Center Section */}
          <Col lg={2} md={6} className="d-flex justify-content-center align-items-center mb-4 mb-lg-0">
            <div className="footer-logo-center">
              <Image
                src="/almond-travel-icon.png"
                alt="Almond Travel"
                width="48"
                height="48"
                className="footer-logo-large"
              />
            </div>
          </Col>

          {/* Links Section */}
          <Col lg={5} md={12} className="footer-links">
            <div className="links-grid">
              <div className="links-column">
                <h5 className="footer-links-title">Navigation</h5>
                <div className="footer-links-list">
                  <Link href="/about" className="footer-link">About Us</Link>
                  <Link href="/features" className="footer-link">Features</Link>
                  <Link href="/faq" className="footer-link">FAQ</Link>
                </div>
              </div>
              <div className="links-column">
                <h5 className="footer-links-title">Connect</h5>
                <div className="footer-links-list">
                  <a
                    href="mailto:steyen@umich.edu"
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Us
                  </a>
                  <Link href="/forums" className="footer-link">Community</Link>
                  <Link href="/articles" className="footer-link">Articles</Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Footer Bottom */}
        <Row className="footer-bottom py-4">
          <Col md={6} className="footer-copyright">
            <p>
              &copy; {currentYear} The Almonds | xosnos. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="footer-legal">
            <div className="legal-links">
              <Link href="#" className="legal-link">
                Privacy Policy
              </Link>
              <Link href="#" className="legal-link">
                Terms of Service
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
