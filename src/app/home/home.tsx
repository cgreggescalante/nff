import UploadList from '../components/upload-list/upload-list';
import { Col, Container, Row } from 'react-bootstrap';
import { UserSummary } from '../user-data/user-summary';
import useUser from '../../providers/useUser';
import { useEffect, useState } from 'react';
import './home.module.scss';

const Home = () => {
  const user = useUser();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user) return <UploadList />;

  return <div>{width < 768 ? <HomeSmall /> : <HomeLarge />}</div>;
};

const HomeSmall = () => {
  const user = useUser();

  return (
    <>
      {user && <UserSummary />}
      <UploadList />
    </>
  );
};

const HomeLarge = () => {
  return (
    <Container fluid>
      <Row>
        {/* Fixed Left Column */}
        <Col md={3} style={{ position: 'sticky', top: 60, height: '100vh' }}>
          <UserSummary />
        </Col>

        {/* Scrollable Right Column */}
        <Col md={9}>
          <UploadList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
