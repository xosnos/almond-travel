import React, { FC } from 'react';
import Logo from '../assets/logo.svg';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { handleLogout } from '../features/auth/authAPI';
import './Navigation.scss';

interface NavLinkItemProps {
  to: string;
  label: string;
  onClick?: () => void;
}

const NavLinkItem: FC<NavLinkItemProps> = ({ to, label, onClick }) => (
  <LinkContainer to={to}>
    <Nav.Link
      onClick={onClick}
      className="nav-link-custom"
    >
      {label}
    </Nav.Link>
  </LinkContainer>
);

export const Navigation: FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleLogoutClick = (): void => {
    dispatch(handleLogout() as any);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      className="navbar-modern glass-dark"
    >
      <Container fluid className="px-4">
        <LinkContainer to="/">
          <Navbar.Brand className="brand-logo">
            <img
              alt="Almond Travel Logo"
              src={Logo}
              width="32"
              height="32"
              className="d-inline-block align-top me-2 logo-img"
            />
            <span className="brand-text">Almond Travel</span>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="navbar-toggle-custom"
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Primary Navigation Links */}
          <Nav className="me-auto nav-primary">
            <NavLinkItem to="/new" label="New Trip" />
            <NavLinkItem to="/trips" label="Trips" />
            <NavLinkItem to="/forums" label="Forums" />
            <NavLinkItem to="/articles" label="Articles" />
          </Nav>

          {/* Secondary Navigation - Auth Links */}
          <Nav className="nav-secondary ms-auto">
            {user ? (
              <>
                <NavLinkItem to="/profile" label="Profile" />
                <NavLinkItem
                  to="/"
                  label="Logout"
                  onClick={handleLogoutClick}
                />
              </>
            ) : (
              <>
                <NavLinkItem to="/register" label="Register" />
                <LinkContainer to="/login">
                  <Nav.Link className="nav-link-login">Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
