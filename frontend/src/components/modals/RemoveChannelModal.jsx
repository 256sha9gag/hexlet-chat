/* eslint-disable functional/no-expression-statements */
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { actions as modalAction } from '../../store/slice/modalSlice';
import useSocket from '../../hooks/socketContext';

const RemoveChannelModal = () => {
  const submitButton = useRef(null);
  useEffect(() => {
    submitButton.current.focus();
  }, []);
  const socket = useSocket();
  const [isDisable, setIsDisable] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalAction.setModalAction('disableShow'));
  const handleSubmit = (id) => (e) => {
    console.log('wow');
    e.preventDefault();
    setIsDisable(true);
    socket.removeChannel({ id });
    handleClose();
  };

  const selectedChannelId = useSelector(({ modalReducer }) => modalReducer.id);

  return (
    <Modal show="true" onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Remove Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          Are you sure?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Сancel
        </Button>
        <Button
          ref={submitButton}
          variant="danger"
          type="submit"
          onClick={handleSubmit(selectedChannelId)}
          disabled={isDisable}
        >
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
