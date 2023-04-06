import {
  Container, Row, Col, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';
import notFound from '../../assets/notFound.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} xs={12} className="text-center">
          <Image fluid src={notFound} className="h-50" alt={t('notFound.title')} />
          <h1 className="text-light">{t('notFound.title')}</h1>
          <p className="text-light">
            {t('notFound.footer')}
            {' '}
            <a className="text-primary" href={routes.mainPage()}>{t('notFound.link')}</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
