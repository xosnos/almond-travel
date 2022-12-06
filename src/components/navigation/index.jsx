import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.svg';
import { Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Navigation = () => {

  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href='/'>
            <img
              alt="logo"
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Almond Travel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Container>
      </Navbar>
  )
};

export default Navigation;