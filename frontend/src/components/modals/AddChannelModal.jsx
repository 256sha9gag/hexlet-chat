/* eslint-disable functional/no-expression-statements */
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { actions as modalAction } from '../../store/slice/modalSlice';
import useSocket from '../../hooks/socketContext';

const AddChannelModal = ({ channelsNames }) => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalAction.setModalAction('disableShow'));

  const formik = useFormik({
    initialValues: { newChannel: '' },

    validateOnChange: false,
    validateOnSubmit: true,

    validationSchema: Yup.object({
      newChannel: Yup.string()
        .max(20, 'Must be 20 characters or less.')
        .min(3, 'Username is too short - should be 3 chars minimum.')
        .required('Required field.')
        .notOneOf(channelsNames, 'Must be unique'),
    }),
    onSubmit: (values) => {
      formik.setSubmitting(false);
      socket.addChannel(values.newChannel);
      console.log(values);
      handleClose();
    },
  });

  return (
    <Modal show="true" onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="addChannel">
            <Form.Control
              name="newChannel"
              onChange={formik.handleChange}
              type="text"
              onBlur={formik.handleBlur}
              value={formik.values.newChannel}
              isInvalid={formik.errors.newChannel}
              autoFocus
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

export default AddChannelModal;
