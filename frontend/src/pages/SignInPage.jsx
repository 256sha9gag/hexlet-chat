import React, { useRef, useEffect, useState } from 'react';
import {
  Form, FloatingLabel, Card, Button, Container, Col, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import routes from '../routes';
import useAuth from '../hooks/authContext';

const SignInPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '' },

    validateOnChange: false,
    validateOnSubmit: true,

    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, 'Username from 3 to 20 characters.')
        .min(3, 'Username from 3 to 20 characters.')
        .required('No username provided.'),
      password: Yup.string()
        .required('No password provided.')
        .min(5, 'Password is too short - should be 5 chars minimum.'),
    }),

    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.singInPath(), values);
        auth.signIn(response.data);
        navigate({ pathname: routes.mainPage() });
      } catch (err) {
        formik.setSubmitting(true);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container className="container-fluid bg-secondary h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col className="col-8 col-md-6 col-xxl-4 mb-5">
          <Card className="text-center pt-3 mb-5">
            <Card.Body>
              <Card.Title as="h1" className="mb-4">Sign in</Card.Title>
              <Form onSubmit={formik.handleSubmit}>
                <FloatingLabel
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="username"
                    ref={inputRef}
                    placeholder="Username"
                    required
                    isInvalid={authFailed || (formik.errors.username)}
                    onChange={formik.handleChange}
                    name="username"
                    value={formik.values.username}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="password"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    isInvalid={authFailed || (formik.errors.password)}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-danger"
                  >
                    {authFailed || (formik.errors.password || formik.errors.username) ? 'The username or password is incorrect.' : null}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button type="submit" disabled={formik.isSubmitting}>Sign in</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-muted px-3">
              No account?
              {' '}
              <a href={routes.signUpPage()}> Sign up</a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
