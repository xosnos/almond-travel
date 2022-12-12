import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Button
} from 'react-bootstrap';
import { states } from './states'

export const ForumsPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className='d-flex justify-content-between align-items-start'>
        <Button
          onClick={() => navigate('/')}
          variant="outline-primary"
        >
          Home
        </Button>
        <h1>Forums</h1>
        <Button variant="white">{' '}</Button>
      </div>
      {
        states.map(state => (
          <LinkContainer to={`/forums/${state}`} key={state}>
            <Card>
              <Card.Body>
                <Card.Title>{state}</Card.Title>
              </Card.Body>
            </Card>
          </LinkContainer>
        ))
      }
    </Container>
  );
}