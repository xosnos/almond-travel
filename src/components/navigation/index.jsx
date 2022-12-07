import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.svg';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

const Navigation = () => {
  const user = useSelector(selectUser);
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn, user);
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
    console.log('user signed out');
    })
    .catch((error) => {
      console.log('error signing out');
    });
  }

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [auth, user]);

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
                loggedIn ? (
                  <LinkContainer to='/'>
                    <Nav.Link
                      onClick={handleSignOut}
                    >Logout</Nav.Link>
                  </LinkContainer>
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

export default Navigation;