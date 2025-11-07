'use client';

import Link from 'next/link';
import {
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';

interface CardItem {
  title: string;
  image: string;
  alt: string;
  text: string;
  link: string;
  border: 'success' | 'primary' | 'warning' | 'danger';
  icon: string;
}

const cards: CardItem[] = [
  {
    title: 'Create New Trip',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Create New Trip',
    text: 'Start booking your next trip to the United States!',
    link: '/new',
    border: 'success',
    icon: '✈️'
  },
  {
    title: 'Manage Existing Trip',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80',
    alt: 'Manage Existing Trip',
    text: 'Manage your existing trip and see all your bookings!',
    link: '/trips',
    border: 'primary',
    icon: '📋'
  },
  {
    title: 'Forums',
    image: 'https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Forums',
    text: 'Join our community and talk to other travelers about their experiences!',
    link: '/forums',
    border: 'warning',
    icon: '💬'
  },
  {
    title: 'Articles',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Articles',
    text: 'Learn more about traveling to the United States and how to plan your trip!',
    link: '/articles',
    border: 'danger',
    icon: '📚'
  },
];

export default function HomePage() {
  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container className="py-5">
        <Row className="mb-5 text-center">
          <Col>
            <h1 className="display-3 fw-bold text-white mb-3">
              Welcome to Almond Travel
            </h1>
            <p className="lead text-white-75 fs-5">
              Your all-in-one platform for planning unforgettable trips to the United States
            </p>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={2} className="g-4 mt-2">
          {
            cards.map((card, index) => (
              <Col key={index} className="d-flex">
                <Link href={card.link} style={{ cursor: 'pointer', textDecoration: 'none' }} className="w-100">
                  <Card
                    border={card.border}
                    className="h-100 card-modern shadow-lg border-0 overflow-hidden transition-all"
                    style={{
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease-in-out',
                    }}
                    onMouseEnter={(e) => {
                      const card = e.currentTarget;
                      card.style.transform = 'translateY(-10px)';
                      card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      const card = e.currentTarget;
                      card.style.transform = 'translateY(0)';
                      card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                    }}
                  >
                    <div className="position-relative h-100">
                      <Card.Img
                        className="opacity-50"
                        src={card.image}
                        alt={card.alt}
                        style={{
                          height: '300px',
                          objectFit: 'cover',
                          filter: 'brightness(0.7)',
                        }}
                      />
                      <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center text-center">
                        <div className="mb-3 fs-1">{card.icon}</div>
                        <Card.Title className="text-white fw-bold" style={{ fontSize: '1.8rem' }}>
                          {card.title}
                        </Card.Title>
                        <Card.Text className="text-white fw-5" style={{ fontSize: '1.1rem' }}>
                          {card.text}
                        </Card.Text>
                      </Card.ImgOverlay>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))
          }
        </Row>
      </Container>
    </div>
  );
}
