import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Navbar, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/authContext';
import routes from '../routes';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand as={Link} to={routes.mainPage()}>{t('header.logo')}</Navbar.Brand>
        {auth.signedIn
          ? <Button onClick={auth.signOut}>{t('header.signOutButton')}</Button>
          : null}
      </Container>

    </Navbar>
  );
};

export default Header;
