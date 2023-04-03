import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import filter from 'leo-profanity';

import { actions as modalAction } from '../../store/slice/modalSlice';
import useSocket from '../../hooks/socketContext';

const AddChannelModal = ({ channelsNames }) => {
  const { t } = useTranslation();
  const socket = useSocket();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const handleClose = () => dispatch(modalAction.setModalAction('disableShow'));

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: { newChannel: '' },

    validateOnChange: false,
    validateOnSubmit: true,

    validationSchema: Yup.object({
      newChannel: Yup.string()
        .max(20, t('errors.textLength'))
        .min(3, t('errors.textLength'))
        .required(t('errors.required'))
        .notOneOf(channelsNames, t('errors.notOneOf')),
    }),

    onSubmit: (values) => {
      formik.setSubmitting(false);
      socket.addChannel(filter.clean(values.newChannel));
      console.log(values);
      handleClose();
    },
  });

  return (
    <Modal show="true" onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <div>
            <Form.Control
              name="name"
              id="name"
              className="mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newChannel}
              isInvalid={formik.errors.newChannel}
              ref={inputRef}
            />
            <Form.Label className="visually-hidden" controlId="name">
              {t('modal.formLabel')}
            </Form.Label>
            <Form.Control.Feedback
              type="invalid"
              className="text-danger"
            >
              {formik.errors.newChannel}
            </Form.Control.Feedback>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modal.cancelButton')}
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          {t('modal.sendButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
