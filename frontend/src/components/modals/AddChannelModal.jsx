import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import filter from 'leo-profanity';

import useChatApi from '../../hooks/useChatApi';

const AddChannelModal = ({ channelsNames, handleClose }) => {
  const { t } = useTranslation();
  const chatApi = useChatApi();
  const inputRef = useRef(null);

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
      chatApi.addChannel(filter.clean(values.newChannel));
      handleClose();
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="newChannel">
            <Form.Label className="visually-hidden">{t('modal.formLabel')}</Form.Label>
            <Form.Control
              type="text"
              name="newChannel"
              className="mb-2"
              onChange={formik.handleChange}
              value={formik.values.newChannel}
              isInvalid={formik.errors.newChannel}
              ref={inputRef}
            />
            <Form.Control.Feedback
              type="invalid"
              className="text-danger"
            >
              {formik.errors.newChannel}
            </Form.Control.Feedback>
          </Form.Group>
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
    </>
  );
};

export default AddChannelModal;
