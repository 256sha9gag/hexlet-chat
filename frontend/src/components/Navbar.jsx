import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Navbar, Button,
} from 'react-bootstrap';

import useAuth from '../hooks/authContext';
import routes from '../routes';

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.signedIn
      ? <Button onClick={auth.signOut}>Log out</Button>
      : null
  );
};

const NavBar = () => (
  <Navbar expand="lg" variant="dark" bg="dark">
    <Container>
      <Navbar.Brand as={Link} to={routes.mainPage()}>Hexlet Chat</Navbar.Brand>
      <AuthButton />
    </Container>
  </Navbar>
);

export default NavBar;
