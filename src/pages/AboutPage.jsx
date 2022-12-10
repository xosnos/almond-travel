import React from 'react';
import {
  Col,
  Container, Image, Row
} from 'react-bootstrap';

export const AboutPage = () => {
  return (
    <Container>
      <h1>About</h1>
      <Row>
        <Col>
          <Image src="https://ece.engin.umich.edu/wp-content/uploads/sites/4/2019/08/north-campus-768x512.jpg" fluid />
        </Col>
        <Col>
          <p>Almond Travel originally started as a capstone project by The Almonds Dev Team (5 CS students) for the University of Michigan's Human-Centered Software Design and Development course aka EECS 497. 
          </p>
          <p>Almond Travel is a travel planning app that helps you plan your next trip. It allows you to create a trip, add destinations, and add activities to each destination. You can also add articles to your trip to help you plan your trip.
          </p>
          <p>Almond Travel is a work in progress. We are currently working on adding more features to the app. We are also working on adding more destinations and activities to the app. We are also working on adding more articles to the app.
          </p>
        </Col>  
      </Row>
    </Container>
  );
}