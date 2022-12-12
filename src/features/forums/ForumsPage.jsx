import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Container,
  Card,
  Button
} from 'react-bootstrap';
import { states } from './states'

export const ForumsPage = () => {
  return (
    <Container>
      <h1>Forums</h1>
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