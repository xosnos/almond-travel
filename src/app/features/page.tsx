'use client';

import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

interface Feature {
  name: string;
  icon: string;
  description: string;
}

interface FeatureCategory {
  title: string;
  color: string;
  bgGradient: string;
  icon: string;
  features: Feature[];
}

const featureCategories: FeatureCategory[] = [
  {
    title: 'High Priority',
    color: '#667eea',
    bgGradient: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    icon: '⭐',
    features: [
      {
        name: 'Flight Search & Booking',
        icon: '✈️',
        description: 'Search and book flights to your destination with ease'
      },
      {
        name: 'Hotel Search & Booking',
        icon: '🏨',
        description: 'Find and reserve accommodations that suit your budget'
      },
      {
        name: 'Car Search & Booking',
        icon: '🚗',
        description: 'Arrange car rentals for your US travel'
      },
      {
        name: 'Smart Checklist',
        icon: '✅',
        description: 'Stay organized with our interactive trip planning checklist'
      },
      {
        name: 'Community Forums',
        icon: '💬',
        description: 'Connect with other travelers and share experiences'
      },
      {
        name: 'Travel Articles',
        icon: '📚',
        description: 'Learn tips and tricks from experienced travelers'
      },
    ]
  },
  {
    title: 'Low Priority',
    color: '#ff9800',
    bgGradient: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 87, 34, 0.1) 100%)',
    icon: '📋',
    features: [
      {
        name: 'User Profile',
        icon: '👤',
        description: 'Manage your account and personal preferences'
      },
      {
        name: 'Trip Management',
        icon: '📍',
        description: 'View and manage all your saved trips'
      },
      {
        name: 'Static Pages',
        icon: '📄',
        description: 'Information pages like this one'
      },
    ]
  }
];

export default function FeaturesPage() {
  return (
    <div className="py-5">
      <Container>
        {/* Header Section */}
        <Row className="mb-5 text-center">
          <Col lg={12}>
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#667eea' }}>
              Our Features
            </h1>
            <p className="lead fs-5 text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Discover all the powerful tools we've built to make your travel planning effortless
            </p>
          </Col>
        </Row>

        {/* Feature Categories */}
        <Row className="g-5">
          {featureCategories.map((category, categoryIndex) => (
            <Col lg={6} key={categoryIndex}>
              <div
                className="p-4 rounded-4 h-100 card-modern shadow-sm"
                style={{
                  background: category.bgGradient,
                  borderTop: `4px solid ${category.color}`,
                }}
              >
                <div className="mb-4">
                  <h2 className="fw-bold d-flex align-items-center gap-3" style={{ color: category.color }}>
                    <span style={{ fontSize: '2rem' }}>{category.icon}</span>
                    {category.title}
                  </h2>
                </div>

                <div className="row g-3">
                  {category.features.map((feature, featureIndex) => (
                    <Col xs={12} key={featureIndex}>
                      <div
                        className="p-3 rounded-3 transition-all"
                        style={{
                          background: 'rgba(255, 255, 255, 0.5)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          backdropFilter: 'blur(10px)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                          e.currentTarget.style.transform = 'translateX(5px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <div className="d-flex gap-3 align-items-start">
                          <div style={{ fontSize: '1.5rem' }}>{feature.icon}</div>
                          <div className="flex-grow-1">
                            <h5 className="fw-bold mb-1" style={{ color: category.color }}>
                              {feature.name}
                            </h5>
                            <p className="text-muted small mb-0">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Call to Action */}
        <Row className="mt-5 text-center">
          <Col lg={10} className="mx-auto">
            <div
              className="p-5 rounded-4 card-modern shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              <h3 className="text-white fw-bold mb-2">Ready to Start Your Journey?</h3>
              <p className="text-white-75">
                Start planning your unforgettable trip to the United States today!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
