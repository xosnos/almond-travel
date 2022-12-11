import React from 'react';
import {
  Form
} from 'react-bootstrap';

export const TripSummary = ({name, setName, location, setLocation}) => {
  return (
    <>
      <h2>Enter Trip Details</h2>
      <Form>
        <Form.Group controlId="formGroupName">
          <Form.Label>Trip Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter trip name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter trip location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
      </Form>
    </>
  );
}
