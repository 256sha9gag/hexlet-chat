import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Navbar, Button } from 'react-bootstrap';
import useAuth from '../hooks';

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.signedIn
      ? <Button onClick={auth.signOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Sign in</Button>
  );
};

const NavBar = () => (
  <Navbar expand="lg" variant="dark" bg="dark">
    <Container>
      <Navbar.Brand as={Link} to="/">My Chat</Navbar.Brand>
      <AuthButton />
    </Container>
  </Navbar>
);

export default NavBar;