import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { actions as modalAction } from '../../store/slice/modalSlice';
import useChatApi from '../../hooks/chatApiContext';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const submitButton = useRef(null);
  useEffect(() => {
    submitButton.current.focus();
  }, []);
  const chatApi = useChatApi();
  const [isDisable, setIsDisable] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(modalAction.setModalAction('disableShow'));
  const handleSubmit = (id) => (e) => {
    e.preventDefault();
    setIsDisable(true);
    chatApi.removeChannel({ id });
    handleClose();
  };

  const selectedChannelId = useSelector(({ modalReducer }) => modalReducer.id);

  return (
    <Modal show="true" onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          {t('modal.removeBody')}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modal.cancelButton')}
        </Button>
        <Button
          ref={submitButton}
          variant="danger"
          type="submit"
          onClick={handleSubmit(selectedChannelId)}
          disabled={isDisable}
        >
          {t('modal.removeButton')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
