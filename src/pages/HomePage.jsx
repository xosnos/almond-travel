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
    text: 'Start booking your next trip to the United States!',
    link: '/new',
    border: 'success'
  },
  {
    title: 'Manage Existing Trip',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80',
    alt: '',
    text: 'Manage your existing trip and see all your bookings!',
    link: '/trips',
    border: 'primary'
  },
  {
    title: 'Forums',
    image: 'https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: '',
    text: 'Join our community and talk to other travelers about their experiences!',
    link: '/forums',
    border: 'warning'
  },
  {
    title: 'Articles',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: '',
    text: 'Learn more about traveling to the United States and how to plan your trip!',
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