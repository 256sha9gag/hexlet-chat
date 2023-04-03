import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import filter from 'leo-profanity';

import { actions as modalAction } from '../../store/slice/modalSlice';
import useSocket from '../../hooks/socketContext';

const RenameChannelModal = ({ channelsNames }) => {
  const socket = useSocket();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalAction.setModalAction('disableShow'));

  const selectedChannelId = useSelector(({ modalReducer }) => modalReducer.id);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
      socket.renameChannel({
        id: selectedChannelId,
        name: filter.clean(values.renameChannel),
      });
      handleClose();
    },
  });

  return (
    <Modal show="true" onHide={handleClose} centered>
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
    </Modal>
  );
};

export default RenameChannelModal;
