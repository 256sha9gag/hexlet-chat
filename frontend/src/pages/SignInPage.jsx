/* eslint-disable functional/no-expression-statements */
import React, { useRef, useEffect, useState } from 'react';
import {
  Form, FloatingLabel, Card, Button,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
        .max(15, 'Must be 15 characters or less.')
        .min(3, 'Username is too short - should be 3 chars minimum.')
        .required('No username provided.'),
      password: Yup.string()
        .required('No password provided.')
        .min(5, 'Password is too short - should be 5 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    }),

    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.singInPath(), values);
        auth.signIn(res.data);
        navigate({ pathname: routes.mainPage() });
      } catch (err) {
        formik.setSubmitting(false);
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
    <div className="container-fluid bg-secondary h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-8 col-md-6 col-xxl-4 mb-5">
          <Card className="text-center pt-3 mb-5">
            <Card.Body>
              <Card.Title>Sign in</Card.Title>
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
                    onBlur={formik.handleBlur}
                    isInvalid={authFailed || (formik.errors.username)}
                    onChange={formik.handleChange}
                    name="username"
                    value={formik.values.username}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-danger"
                  >
                    {authFailed || (formik.errors.username)}

                  </Form.Control.Feedback>
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
                    onBlur={formik.handleBlur}
                    isInvalid={authFailed || (formik.errors.password)}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-danger"
                  >
                    {authFailed ? 'The username or password is incorrect.' : (formik.errors.password)}
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
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
