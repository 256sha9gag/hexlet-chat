import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';

import useChatApi from '../../hooks/useChatApi';

const RemoveChannelModal = ({ id, handleClose }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const submitButton = useRef(null);

  const removeChannelCb = (response) => {
    if (response.status === 'ok') {
      toast.success(t('toast.remove'));
    } else {
      toast.error(t('toast.error'));
      rollbar.error(t('rollbar.removeChannel'));
    }
  };

  useEffect(() => {
    submitButton.current.focus();
  }, []);
  const chatApi = useChatApi();
  const [isDisable, setIsDisable] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisable(true);
    chatApi.removeChannel({ id }, removeChannelCb);
    handleClose();
  };

  return (
    <>
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
          onClick={handleSubmit}
          disabled={isDisable}
        >
          {t('modal.removeButton')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default RemoveChannelModal;
