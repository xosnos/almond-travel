import React from 'react';
import {
  Form
} from 'react-bootstrap'

export const Summary = ({
  name, location, handleUpdate
}) => {

  return (
    <>
      <Form>
        <Form.Group controlId="formGroupName">
          <Form.Label>Trip Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter trip name"
            value={name}
            onChange={(e) => handleUpdate('name', e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter trip location"
            value={location}
            onChange={(e) => handleUpdate('location', e.target.value)}
          />
        </Form.Group>
      </Form>
    </>
  );
}
