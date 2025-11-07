'use client';

import {
  Col,
  Container,
  Image,
  Row,
} from 'react-bootstrap';

export default function AboutPage() {
  return (
    <div className="py-5">
      <Container>
        {/* Hero Section */}
        <Row className="mb-5 align-items-center">
          <Col lg={12} className="text-center mb-4">
            <h1 className="display-4 fw-bold mb-3" style={{ color: '#667eea' }}>
              About Almond Travel
            </h1>
            <div className="mx-auto" style={{ maxWidth: '700px' }}>
              <p className="lead fs-5 text-muted">
                Almond Travel is a beginner-friendly travel planning application
                specifically designed for first-time travelers to the United States.
              </p>
            </div>
          </Col>
        </Row>

        {/* Problem Statement */}
        <Row className="mb-5 g-4">
          <Col lg={12}>
            <div
              className="p-5 rounded-4 card-modern shadow-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                borderLeft: '4px solid #667eea',
              }}
            >
              <h3 className="fw-bold mb-3" style={{ color: '#667eea' }}>The Problem We Solve</h3>
              <p className="fs-5 text-dark mb-3">
                Currently, planning a trip involves multiple steps across different platforms:
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">✈️ <strong>Flights</strong> - booked on one platform</li>
                <li className="mb-2">🏨 <strong>Hotels</strong> - booked on another</li>
                <li className="mb-2">🍽️ <strong>Restaurants & Attractions</strong> - require painstaking research across multiple web sources</li>
              </ul>
              <p className="fs-5 text-dark mt-3 mb-0">
                <strong>Almond Travel simplifies this process</strong> by providing a single platform for all your travel needs.
                Beyond planning, we offer forums for connecting with other travelers and articles about US travel tips.
              </p>
            </div>
          </Col>
        </Row>

        {/* History Section */}
        <Row xs={1} xl={2} className="g-5 mb-5 align-items-center">
          <Col className="text-center">
            <Image
              src="https://ece.engin.umich.edu/wp-content/uploads/sites/4/2019/08/north-campus-768x512.jpg"
              fluid
              className="rounded-4 shadow-lg"
            />
          </Col>
          <Col>
            <h2 className="fw-bold mb-4" style={{ color: '#667eea' }}>Our Journey</h2>
            <div className="mb-4">
              <p className="fs-5 text-muted">
                <strong className="text-dark">Almond Travel</strong> started as a capstone project by The Almonds Dev Team (5 CS students)
                for the University of Michigan's Human-Centered Software Design and Development course (EECS 497).
              </p>
            </div>
            <div className="mb-4">
              <p className="fs-5 text-muted">
                The project's emphasis was on the design process, challenging the team to consider users from different perspectives.
                Since all team members are US residents who don't frequently travel, they focused on users visiting the United States for the first time.
              </p>
            </div>
            <div>
              <p className="fs-5 text-muted">
                Although the initial project was functional in Winter 2022, it required mocked data and had backend stability issues.
                In Fall 2022, team member Steven Nguyen (xosnos) continued the project to refine core features and migrate the backend to Firebase for long-term stability.
              </p>
            </div>
          </Col>
        </Row>

        {/* Future Plans Section */}
        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <div
              className="p-5 rounded-4 card-modern shadow-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(56, 142, 60, 0.1) 100%)',
                borderLeft: '4px solid #4caf50',
              }}
            >
              <h2 className="fw-bold mb-3" style={{ color: '#4caf50' }}>Future Roadmap</h2>
              <p className="fs-5 text-muted mb-0">
                Future plans include expanding forum features, adding more articles, and continuously improving the user experience.
                The application is actively in development and we're committed to making travel planning accessible to everyone.
              </p>
            </div>
          </Col>
        </Row>

        {/* Contact Section */}
        <Row>
          <Col lg={10} className="mx-auto text-center">
            <h3 className="fw-bold mb-3" style={{ color: '#667eea' }}>Get In Touch</h3>
            <p className="fs-5 text-muted">
              Have questions or feedback? We'd love to hear from you! Feel free to reach out through the contact form in our navigation menu.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
