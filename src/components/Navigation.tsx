'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { handleLogout } from '../features/auth/authAPI';
import './Navigation.scss';

interface NavLinkItemProps {
  to: string;
  label: string;
  onClick?: () => void;
}

const NavLinkItem: FC<NavLinkItemProps> = ({ to, label, onClick }) => (
  <Nav.Link
    as={Link}
    href={to}
    onClick={onClick}
    className="nav-link-custom"
  >
    {label}
  </Nav.Link>
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
        <Navbar.Brand as={Link} href="/" className="brand-logo">
          <Image
            alt="Almond Travel Logo"
            src="/almond-travel-icon.png"
            width={32}
            height={32}
            className="d-inline-block align-top me-2 logo-img"
          />
          <span className="brand-text">Almond Travel</span>
        </Navbar.Brand>

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
                <Nav.Link as={Link} href="/login" className="nav-link-login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
