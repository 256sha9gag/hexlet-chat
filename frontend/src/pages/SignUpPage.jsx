import React, { useRef, useEffect, useState } from 'react';
import {
  Form, FloatingLabel, Card, Button, Container, Row, Col, Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import routes from '../routes';
import useAuth from '../hooks/authContext';
import signUpImg from '../assets/signUpImg.jpg';

const SignUpPage = () => {
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
    initialValues: { username: '', password: '', passwordConfirmation: '' },

    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, t('errors.textLength'))
        .min(3, t('errors.textLength'))
        .required(t('errors.required')),
      password: Yup.string()
        .required(t('errors.required'))
        .min(6, t('errors.passLength')),
      passwordConfirmation: Yup.string()
        .required(t('errors.required'))
        .oneOf([Yup.ref('password'), null], t('errors.passConfirmation')),
    }),

    onSubmit: async (values) => {
      try {
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
        rollbar.error(t('rollbar.creatUser'), err);
        toast.error(t('toast.error'));
        throw err;
      }
    },
  });

  return (
    <Container fluid className="bg-secondary h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} xs={12}>
          <Card>
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Image src={signUpImg} roundedCircle alt={t('signUp.title')} />
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <Card.Title as="h1" className="text-center mb-4">{t('signUp.title')}</Card.Title>
                <FloatingLabel
                  label={t('signUp.usernameLabel')}
                  className="mb-3"
                >
                  <Form.Control
                    type={t('signUp.usernameLabel')}
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
                  label={t('signUp.passwordLabel')}
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder={t('signUp.passwordLabel')}
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
                  label={t('signUp.passwordConfirmationLabel')}
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder={t('signUp.passwordConfirmationLabel')}
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
                    {isAuth ? t('errors.signUpFail') : formik.errors.passwordConfirmation}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button className="w-100 mb-3" variant="outline-primary" type="submit" disabled={formik.isSubmitting}>{t('signUp.button')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
