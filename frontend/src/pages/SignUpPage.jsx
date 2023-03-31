import React, { useRef, useEffect, useState } from 'react';
import {
  Form, FloatingLabel, Card, Button, Container, Row, Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import routes from '../routes';
import useAuth from '../hooks/authContext';

const SignUpPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirmation: '' },

    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, 'Username from 3 to 20 characters.')
        .min(3, 'Username from 3 to 20 characters.')
        .required('No username provided.'),
      password: Yup.string()
        .required('No password provided.')
        .min(6, 'Password is too short - should be 6 chars minimum.'),
      passwordConfirmation: Yup.string()
        .required('No password provided.')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),

    onSubmit: async (values) => {
      try {
        console.log(values);
        const response = await axios.post(routes.signUpPath(), values);
        auth.signIn(response.data);
        navigate({ pathname: routes.mainPage() });
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          setIsAuth(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container fluid className="bg-secondary h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Col className="col-8 col-md-6 col-xxl-4 mb-5">
          <Card className="text-center pt-3 mb-5">
            <Card.Body>
              <Card.Title as="h1" className="mb-4">Sign up</Card.Title>
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
                    isInvalid={isAuth || (formik.errors.username && formik.touched.username)}
                    onChange={formik.handleChange}
                    name="username"
                    value={formik.values.username}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-danger"
                  >
                    {formik.errors.username}
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
                    isInvalid={isAuth || (formik.errors.password && formik.touched.password)}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-danger"
                  >
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="passwordConfirmation"
                  label="Password Confirmation"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password Confirmation"
                    required
                    name="passwordConfirmation"
                    onBlur={formik.handleBlur}
                    isInvalid={isAuth
                      || (formik.errors.passwordConfirmation
                        && formik.touched.passwordConfirmation)}
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirmation}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-danger"
                  >
                    {isAuth ? 'Такой пользователь уже существует' : formik.errors.passwordConfirmation}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button type="submit" disabled={formik.isSubmitting}>Sign up</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
