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
import useAuth from '../hooks/index.jsx';

const LoginPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '' },

    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less.')
        .min(3, 'Username is too short - should be 3 chars minimum.')
        .required('Required.'),
      password: Yup.string()
        .required('No password provided.')
        .min(5, 'Password is too short - should be 5 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    }),

    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const data = await axios.post(routes.loginPath(), values);
        auth.signIn(data);
        navigate({ pathname: '/' });
      } catch (err) {
        formik.setSubmitting(false); // не понятно зачем
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
    <div className="d-flex flex-column h-100">
      <div className="container-fluid bg-light h-100">
        <div className="row justify-content-center vertical-align: middle h-100">
          <div className="col-12 col-md-8 col-xxl-4 h-100">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Sign in</Card.Title>
                <Form onSubmit={formik.handleSubmit}>
                  <FloatingLabel
                    controlId="username"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control
                      type="username"
                      ref={inputRef}
                      placeholder="Username"
                      required
                      onBlur={formik.handleBlur}
                      isInvalid={authFailed || (formik.touched.username && formik.errors.username)}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger"
                    >
                      {authFailed || (formik.touched.username && formik.errors.username)}

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
                      onBlur={formik.handleBlur}
                      isInvalid={authFailed || (formik.touched.password && formik.errors.password)}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger"
                    >
                      {authFailed ? 'The username or password is incorrect.' : (formik.touched.username && formik.errors.username)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Button type="submit">Sign in</Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted">
                No account?
                {' '}
                <a href="/signup"> Sign up</a>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;