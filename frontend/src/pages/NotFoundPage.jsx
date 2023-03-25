import Card from 'react-bootstrap/Card';

const NotFound = () => (
  <div className="d-flex flex-column h-100">
    <Card className="mt-5 mx-auto">
      <Card.Body>
        <Card.Title className="text-center">Error 404</Card.Title>
        <Card.Text className="text-center">
          Something seems to have gone wrong!
          The page you requested does not exist.
          Perhaps it is out of date, has been deleted,
          or you entered the wrong URL in the address bar.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-center">
        But you can go to
        <a href="/"> the home page</a>
      </Card.Footer>
    </Card>
  </div>
);

export default NotFound;
