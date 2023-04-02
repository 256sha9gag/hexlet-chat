import React, { useRef, useEffect, useState } from 'react';
import {
  Form, FloatingLabel, Card, Button, Container, Col, Row, Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import routes from '../routes';
import useAuth from '../hooks/authContext';
import signInImg from '../assets/signInImg.jpg';

const SignInPage = () => {
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { username: '', password: '' },

    validateOnChange: false,
    validateOnSubmit: true,

    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, t('errors.textLength'))
        .min(3, t('errors.textLength'))
        .required(t('errors.required')),
      password: Yup.string()
        .required(t('errors.required'))
        .min(5, t('errors.passSingInLength')),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.singInPath(), values);
        auth.signIn(response.data);
        navigate({ pathname: routes.mainPage() });
      } catch (err) {
        formik.setSubmitting(true);
        if (err.isAxiosError && err.response.status === 401) {
          setIsAuth(true);
          inputRef.current.select();
          return;
        }
        toast.error(t('toast.error'));
        rollbar.error(t('rollbar.login'), err);
        throw err;
      }
    },
  });

  return (
    <Container fluid className="bg-secondary h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} xs={12}>
          <Card>
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image src={signInImg} roundedCircle alt={t('signIn.title')} />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <Card.Title as="h1" className="mb-4 text-center">{t('signIn.title')}</Card.Title>
                <FloatingLabel
                  label={t('signIn.usernameLabel')}
                  className="mb-3"
                  controlId="username"
                >
                  <Form.Control
                    type="username"
                    ref={inputRef}
                    placeholder={t('signIn.usernameLabel')}
                    required
                    isInvalid={isAuth || (formik.errors.username)}
                    onChange={formik.handleChange}
                    name="username"
                    value={formik.values.username}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="password"
                  label={t('signIn.passwordLabel')}
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder={t('signIn.passwordLabel')}
                    required
                    name="password"
                    isInvalid={isAuth || (formik.errors.password)}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    className="text-danger"
                  >
                    {isAuth || (formik.errors.password || formik.errors.username) ? t('errors.authFail') : null}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button className="w-100 mb-3" variant="outline-primary" type="submit" disabled={formik.isSubmitting}>{t('signIn.button')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-muted p-4 text-center">
              {t('signIn.signUpFooter')}
              {' '}
              <Card.Link href={routes.signUpPage()}>{t('signIn.signUpLink')}</Card.Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
