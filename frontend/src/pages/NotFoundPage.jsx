import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';

import routes from '../routes';

const NotFoundPage = () => (
  <Container className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-6 col-md-4 col-xxl-4">
        <Card className="mb-5 text-center">
          <Card.Body>
            <Card.Title>Error 404</Card.Title>
            <Card.Text>
              Something seems to have gone wrong!
              The page you requested does not exist.
              Perhaps it is out of date, has been deleted,
              or you entered the wrong URL in the address bar.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            But you can go to
            {' '}
            <a href={routes.mainPage()}>the home page</a>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default NotFoundPage;
