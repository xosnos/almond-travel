import React, { FC, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Collapse,
} from 'react-bootstrap';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon: string;
}

const faqItems: FaqItem[] = [
  {
    id: 'account',
    question: 'How do I use my account?',
    answer: `First, either log in to your existing account or sign up to create a new account by clicking the link in the navigation bar at the top of the screen. After doing this, you will be able to book hotels and flights, use our checklist and forums features, and view your account information.`,
    icon: '👤'
  },
  {
    id: 'flight-booking',
    question: 'How do I book a flight only?',
    answer: `The main purpose of this application is to guide you in booking an entire trip to the United States. This is the main difference between this application and other flight booking applications. To book a flight, you must first create a trip. To do this, click the "New Trip" link in the navigation bar or the Create New Trip card on the home page. It's recommended you follow through all the steps in the trip creation process, but you can skip the hotel booking step if you only want to book a flight.`,
    icon: '✈️'
  },
  {
    id: 'payments',
    question: 'Will I be making any payments through the app?',
    answer: `No. We do not handle any payments. We only provide you with links to the websites of our partners, where you can complete your bookings and make your payments. We do not keep track of your credit card information.`,
    icon: '💳'
  },
  {
    id: 'data',
    question: 'What data do you keep track of?',
    answer: `We only keep track of the data you provide us, including your email address, inputs you provide in the trip creation process, and any posts/responses you make in the forums. We do not keep track of your password, and we do not sell your data to third parties.`,
    icon: '🔐'
  },
];

export const FaqPage: FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleOpen = (id: string): void => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="py-5" style={{ background: 'linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)' }}>
      <Container>
        {/* Header */}
        <Row className="mb-5 text-center">
          <Col lg={12}>
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#667eea' }}>
              Frequently Asked Questions
            </h1>
            <p className="lead fs-5 text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Find answers to common questions about Almond Travel and how to get the most out of our platform
            </p>
          </Col>
        </Row>

        {/* FAQ Items */}
        <Row>
          <Col lg={8} className="mx-auto">
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="card-modern shadow-sm border-0 mb-3 overflow-hidden"
                  style={{
                    background: 'white',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Card.Header
                    onClick={() => toggleOpen(item.id)}
                    style={{
                      cursor: 'pointer',
                      background: openId === item.id
                        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                        : 'white',
                      borderBottom: openId === item.id ? '2px solid #667eea' : '1px solid #e9ecef',
                      padding: '1.5rem',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (openId !== item.id) {
                        e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (openId !== item.id) {
                        e.currentTarget.style.background = 'white';
                      }
                    }}
                  >
                    <div className="d-flex align-items-center gap-3 mb-0">
                      <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                      <div className="flex-grow-1">
                        <h5
                          className="fw-bold mb-0"
                          style={{ color: '#667eea' }}
                        >
                          {item.question}
                        </h5>
                      </div>
                      <span
                        style={{
                          fontSize: '1.25rem',
                          color: '#667eea',
                          transform: openId === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        ▼
                      </span>
                    </div>
                  </Card.Header>

                  <Collapse in={openId === item.id}>
                    <div>
                      <Card.Body className="pt-4 pb-4">
                        <p className="text-muted fs-5 mb-0">
                          {item.answer}
                        </p>
                      </Card.Body>
                    </div>
                  </Collapse>
                </Card>
              ))}
            </div>
          </Col>
        </Row>

        {/* CTA Section */}
        <Row className="mt-5 text-center">
          <Col lg={8} className="mx-auto">
            <div
              className="p-5 rounded-4 card-modern shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              <h3 className="text-white fw-bold mb-2">Didn't find your answer?</h3>
              <p className="text-white-75">
                Check out our articles section or reach out to our support team through the navigation menu
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
