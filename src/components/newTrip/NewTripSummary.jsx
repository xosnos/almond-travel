import React from 'react';
import {
  Form
} from 'react-bootstrap';
import {
  Flight
} from '..';

export const NewTripSummary = () => {
  return (
    <>
      <h2>SUMMARY</h2>
      <Form>
        <Form.Group controlId="formGroupName">
          <Form.Label>Trip Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter trip name"
            value={{}}
            // onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter trip location"
            value={{}}
            // onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
      </Form>
    </>
  );
}
