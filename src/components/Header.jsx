import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

export const Header = () => {
   return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
         <Navbar.Brand as={Link} to='/'>AlmondTravel</Navbar.Brand>
      </Container>
    </Navbar>
   );
};