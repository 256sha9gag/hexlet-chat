import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';

import useChatApi from '../../hooks/useChatApi';

const RenameChannelModal = ({ channelsNames, id, handleClose }) => {
  const rollbar = useRollbar();
  const chatApi = useChatApi();
  const { t } = useTranslation();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const renameChannelCb = (response) => {
    if (response.status === 'ok') {
      toast.success(t('toast.rename'));
    } else {
      toast.error(t('toast.error'));
      rollbar.error(t('rollbar.renameChannel'));
    }
  };

  const formik = useFormik({
    initialValues: { renameChannel: '' },

    validateOnChange: false,
    validateOnSubmit: true,

    validationSchema: Yup.object({
      renameChannel: Yup.string()
        .max(20, t('errors.textLength'))
        .min(3, t('errors.textLength'))
        .required(t('errors.required'))
        .notOneOf(channelsNames, t('errors.notOneOf')),
    }),
    onSubmit: (values) => {
      formik.setSubmitting(false);
      chatApi.renameChannel({
        id,
        name: filter.clean(values.renameChannel),
      }, renameChannelCb);
      handleClose();
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="renameChannel">
            <Form.Label className="visually-hidden">
              {t('modal.formLabel')}
            </Form.Label>
            <Form.Control
              name="renameChannel"
              onChange={formik.handleChange}
              type="text"
              onBlur={formik.handleBlur}
              value={formik.values.renameChannel}
              isInvalid={formik.errors.renameChannel}
              ref={inputRef}
            />
            <Form.Control.Feedback
              type="invalid"
              className="text-danger"
            >
              {formik.errors.renameChannel}
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
          {t('modal.removeButton')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RenameChannelModal;
