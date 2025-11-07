import React, { FC } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Badge
} from 'react-bootstrap';
import { states } from './states';

export const ForumsPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <div className='d-flex justify-content-between align-items-center mb-5'>
        <Button
          onClick={() => navigate('/')}
          variant="outline-primary"
          size="lg"
        >
          Home
        </Button>
        <h1 className="text-center fw-bold m-0">Forums</h1>
        <div style={{ width: '100px' }}></div>
      </div>

      <div className="text-center mb-4">
        <p className="text-muted fs-5">
          Select a state to view community discussions and connect with others
        </p>
        <Badge bg="primary" className="badge-modern">
          {states.length} States Available
        </Badge>
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {states.map((state) => (
          <Col key={state}>
            <LinkContainer to={`/forums/${state}`}>
              <Card className="card-modern h-100 cursor-pointer">
                <Card.Body className="d-flex align-items-center justify-content-center p-4">
                  <Card.Title className="mb-0 text-center fw-semibold">
                    {state}
                  </Card.Title>
                </Card.Body>
              </Card>
            </LinkContainer>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
