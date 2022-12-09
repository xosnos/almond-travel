import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const cards = [
  {
    title: 'Create New Trip',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: '',
    text: 'Create a new trip and start planning your next adventure!',
    link: '/new',
    border: 'success'
  },
  {
    title: 'Manage Existing Trip',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80',
    alt: '',
    text: 'Create a new trip and start planning your next adventure!',
    link: '/trips',
    border: 'primary'
  },
  {
    title: 'Resources',
    image: 'https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: '',
    text: 'Create a new trip and start planning your next adventure!',
    link: '/resources',
    border: 'warning'
  },
  {
    title: 'Articles',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: '',
    text: 'Create a new trip and start planning your next adventure!',
    link: '/articles',
    border: 'danger'
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
      <Row xs={1} md={2}>
        {
          cards.map((card, index) => (
            <Col key={index}>
              <LinkContainer to={card.link}>
                <Card border={card.border} style={{}}>
                <Card.Img className="opacity-25"src={card.image} alt={card.alt} height={'300vw'}/>
                  <Card.ImgOverlay>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.text}</Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </LinkContainer>
              <br />
            </Col>
          ))
        }
      </Row>
    </Container>
  );
};