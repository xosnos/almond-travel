import React from 'react';
import {
  Button,
  Col,
  Form
} from 'react-bootstrap';

export const Checklist = ({ items, handleAdd, handleRemove, handleUpdate }) => {
  return (
    <>
      <br />
      {
        items.map((item, index) => (
          <Form key={index} className="d-flex justify-content-between">
            <Col xs={2}>
              <Form.Group controlId="formGroupChecked">
                <Button
                  className="rounded-circle"
                  variant={item.checked ? 'primary' : 'outline-primary'}
                  value={item.checked}
                  onClick={() => handleUpdate(index, 'checked', !item.checked)}
                >
                  ✓
                </Button>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGroupName">
                <Form.Control
                  type="text"
                  value={item.name}
                  onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={2} className="d-flex justify-content-end">
              <Form.Group controlId="formGroupRemove">
                <Button
                  className="rounded-circle"
                  variant="outline-danger"
                  onClick={() => handleRemove(index)}
                >
                  ✕
                </Button>
              </Form.Group>
            </Col>
          </Form>
        ))
      }
      <br />
      <Button onClick={() => handleAdd()}>
        +
      </Button>
      <br />
    </>
  );
}