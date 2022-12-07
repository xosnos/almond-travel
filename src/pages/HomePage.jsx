import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Test from '../components/search/test';

const cards = [
  {
    title: '1 Start a new trip',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    text: 'Create a new trip and start planning your next adventure!',
    button: 'New Trip',
    variant: 'primary',
    link: '/new'
  },
  {
    title: '2 Start a new trip',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    text: 'Create a new trip and start planning your next adventure!',
    button: 'New Trip',
    variant: 'primary',
    link: '/new'
  },
  {
    title: '3 Start a new trip',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    text: 'Create a new trip and start planning your next adventure!',
    button: 'New Trip',
    variant: 'primary',
    link: '/new'
  },
  {
    title: '4 Start a new trip',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    text: 'Create a new trip and start planning your next adventure!',
    button: 'New Trip',
    variant: 'primary',
    link: '/new'
  },
];

export const HomePage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to Almond Travel!</h1>
          <p>Your place to organize all your travel necesities! Check out our hotel and flight booking pages, or read up on our blog page to see what people think about our popular travel destinations!</p>
        </Col>
      </Row>
      <Row>
        {
          cards.map((card, index) => {
            return (
              <Col md={6} key={index}>
                <Card style={{}}>
                  <Card.Img variant="top" src={card.image} height={100} />
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.text}</Card.Text>
                    <LinkContainer to={card.link}>
                      <Button variant={card.variant}>{card.button}</Button>
                    </LinkContainer>
                  </Card.Body>
                </Card>
                <br />
              </Col>
            )
          })
        }
      </Row>
    </Container>
  );
};