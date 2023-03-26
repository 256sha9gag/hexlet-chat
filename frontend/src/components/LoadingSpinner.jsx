import React from 'react';
import { Spinner, Row } from 'react-bootstrap';

const LoadingSpinner = () => (
  <Row className="justify-content-center align-content-center h-100">
    <Spinner animation="border" variant="primary" />
  </Row>
);

export default LoadingSpinner;
