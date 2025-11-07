import React, { FC } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import './Footer.scss';

interface FooterLinkProps {
  to?: string;
  href?: string;
  label: string;
  external?: boolean;
}

const FooterLink: FC<FooterLinkProps> = ({
  to,
  href,
  label,
  external = false,
}) => {
  if (external && href) {
    return (
      <a
        href={href}
        className="footer-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={to || '#'} className="footer-link">
      {label}
    </Link>
  );
};

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
                  src={Logo}
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
                src={Logo}
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
                  <FooterLink to="/about" label="About Us" />
                  <FooterLink to="/features" label="Features" />
                  <FooterLink to="/faq" label="FAQ" />
                </div>
              </div>
              <div className="links-column">
                <h5 className="footer-links-title">Connect</h5>
                <div className="footer-links-list">
                  <FooterLink
                    href="mailto:steyen@umich.edu"
                    label="Contact Us"
                    external
                  />
                  <FooterLink to="/forums" label="Community" />
                  <FooterLink to="/articles" label="Articles" />
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
              <Link to="#" className="legal-link">
                Privacy Policy
              </Link>
              <Link to="#" className="legal-link">
                Terms of Service
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
