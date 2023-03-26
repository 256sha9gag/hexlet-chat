/* eslint-disable functional/no-expression-statements */
import React, { useRef, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const NewMessageForm = () => {
  // eslint-disable-next-line functional/no-expression-statements
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { newMessage: '' },

    validationSchema: Yup.object({
      newMessage: Yup.string()
        .required('Required.'),
    }),

    onSubmit: (values) => {
      formik.resetForm();
      console.log(values);
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            type="text"
            onChange={formik.handleChange}
            className="border-0 p-0 ps-2"
            placeholder="Enter a message..."
            name="newMessage"
            aria-label="New message"
            ref={inputRef}
            isInvalid={formik.errors.newMessage}
            value={formik.values.newMessage}
          />
          <Button
            disabled={formik.isSubmitting}
            variant=""
            type="submit"
            className="btn-group-vertical"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
            <span className="visually-hidden">Send</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default NewMessageForm;
