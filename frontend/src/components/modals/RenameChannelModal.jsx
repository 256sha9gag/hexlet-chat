import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { actions as modalAction } from '../../store/slice/modalSlice';
import useSocket from '../../hooks/socketContext';

const RenameChannelModal = ({ channelsNames }) => {
  const socket = useSocket();
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
        .max(20, 'Must be 20 characters or less.')
        .min(3, 'Username is too short - should be 3 chars minimum.')
        .required('Required field.')
        .notOneOf(channelsNames, 'Must be unique'),
    }),
    onSubmit: (values) => {
      formik.setSubmitting(false);
      socket.renameChannel({
        id: selectedChannelId,
        name: values.renameChannel,
      });
      console.log(values);
      handleClose();
    },
  });

  return (
    <Modal show="true" onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rename Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="renameChannel">
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
          Сancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannelModal;
