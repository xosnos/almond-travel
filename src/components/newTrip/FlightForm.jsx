import React from 'react';
import {
  Button,
  Col,
  Row
} from 'react-bootstrap';
import {
  FlightSearchWidget
} from '../';

export const FlightForm = () => {
  return (
    <>
      <Row>
        <h2>Book Flight</h2>
        <FlightSearchWidget />
      </Row>
      <Row>
        <h2>Flight Form</h2>
      </Row>
      <Row>
        <Col>
          <Button>
            Back
          </Button>
        </Col>
        <Col>
          <Button>
            Next
          </Button>
        </Col>
      </Row>
    </>
  );
}