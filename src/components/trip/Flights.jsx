import React from 'react';
import {
  Form,
  Row,
  Col,
  Button
} from 'react-bootstrap';

export const Flights = ({
  items, handleAdd, handleRemove, handleUpdate
}) => {
  return (
    <>
      <br />
      {
        items.map((flight, index) => (
          <Form key={index}>
            <div className='d-flex justify-content-between'>
              <h3>Flight # {index + 1}</h3>
              <Button className="rounded-circle" variant="outline-danger" onClick={() => handleRemove(index)}>
                ✕
              </Button>
            </div>
            <Row>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupDepartureDate">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={flight.departureDate}
                    onChange={(e) => handleUpdate(index, 'departureDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupDepartureTime">
                  <Form.Label>Departure Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={flight.departureTime}
                    onChange={(e) => handleUpdate(index, 'departureTime', e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupDepartureAirport">
                  <Form.Label>Departure Airport</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="SGN"
                    value={flight.departureAirport}
                    onChange={(e) => handleUpdate(index, 'departureAirport', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupDepartureCity">
                  <Form.Label>Departure City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ho Chi Minh City"
                    value={flight.departureCity}
                    onChange={(e) => handleUpdate(index, 'departureCity', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={3}>
                <Form.Label>Arrival Date</Form.Label>
                <Form.Group controlId="formGroupArrivalDate">
                  <Form.Control
                    type="date"
                    value={flight.arrivalDate}
                    onChange={(e) => handleUpdate(index, 'arrivalDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupArrivalTime">
                  <Form.Label>Arrival Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={flight.arrivalTime}
                    onChange={(e) => handleUpdate(index, 'arrivalTime', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupArrivalAirport">
                  <Form.Label>Arrival Airport</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="GRR"
                    value={flight.arrivalAirport}
                    onChange={(e) => handleUpdate(index, 'arrivalAirport', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupArrivalCity">
                  <Form.Label>Arrival City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Grand Rapids"
                    value={flight.arrivalCity}
                    onChange={(e) => handleUpdate(index, 'arrivalCity', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />
          </Form>
        ))
      }
      <Button onClick={() => handleAdd()}>
        Add a Flight
      </Button>
      <br />
    </>
  )
}