import React from 'react';
import {
  Button,
  Col,
  Form,
  Row
} from 'react-bootstrap';

export const Hotels = ({
  items, handleAdd, handleRemove, handleUpdate
}) => {
  return (
    <>
      <br />
      {
        items.map((hotel, index) => (
          <Form key={index}>
            <div className='d-flex justify-content-between'>
              <h3>Hotel # {index + 1}</h3>
              <Button className="rounded-circle" variant="outline-danger" onClick={() => handleRemove(index)}>
                ✕
              </Button>
            </div>
            <Row>
              <Col xs={6}>
                <Form.Group controlId="formGroupCheckInDate">
                  <Form.Label>Check In Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={hotel.checkInDate}
                    onChange={(e) => handleUpdate(index, 'checkInDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="formGroupCheckOutDate">
                  <Form.Label>Check Out Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={hotel.checkOutDate}
                    onChange={(e) => handleUpdate(index, 'checkOutDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group controlId="formGroupHotelName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='The Plaza'
                    value={hotel.hotelName}
                    onChange={(e) => handleUpdate(index, 'hotelName', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formGroupHotelAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='768 5th Ave'
                    value={hotel.hotelAddress}
                    onChange={(e) => handleUpdate(index, 'hotelAddress', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formGroupHotelCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='New York'
                    value={hotel.hotelCity}
                    onChange={(e) => handleUpdate(index, 'hotelCity', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />
          </Form>
        ))
      }
      <Button onClick={() => handleAdd()}>
        Add a Hotel
      </Button>
      <br />
    </>
  );
}