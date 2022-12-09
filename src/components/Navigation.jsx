import React from 'react';
import Logo from '../assets/logo.svg';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { handleLogout } from '../features/auth/authAPI';
import { useDispatch } from 'react-redux';

export const Navigation = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                alt="logo"
                src={Logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Almond Travel
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to='/new'>
                <Nav.Link>New Trip</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              {
                user ? (
                  <>
                    <LinkContainer to='/profile'>
                      <Nav.Link>Profile</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/'>
                      <Nav.Link
                        onClick={() => dispatch(handleLogout())}
                      >Logout</Nav.Link>
                    </LinkContainer>
                  </>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  )
};