import React from 'react';
import {
  Button,
  Col,
  Row,
  Form
} from 'react-bootstrap';

export const Cars = ({
  items, handleAdd, handleRemove, handleUpdate
}) => {
  return (
    <>
      <br />
      {
        items.map((car, index) => (
          <Form key={index}>
            <div className='d-flex justify-content-between'>
              <h3>Car # {index + 1}</h3>
              <Button className="rounded-circle" variant="outline-danger" onClick={() => handleRemove(index)}>
                ✕
              </Button>
            </div>
            <Row>
              <Col xs={6} md={4}>
                <Form.Group controlId="formGroupPickUpDate">
                  <Form.Label>Pick Up Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={car.pickUpDate}
                    onChange={(e) => handleUpdate(index, 'pickUpDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group controlId="formGroupPickUpTime">
                  <Form.Label>Pick Up Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={car.pickUpTime}
                    onChange={(e) => handleUpdate(index, 'pickUpTime', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formGroupPickUpLocation">
                  <Form.Label>Pick Up Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='LAX Parking Garage A'
                    value={car.pickUpLocation}
                    onChange={(e) => handleUpdate(index, 'pickUpLocation', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                <Form.Group controlId="formGroupReturnDate">
                  <Form.Label>Return Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={car.returnDate}
                    onChange={(e) => handleUpdate(index, 'returnDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group controlId="formGroupReturnTime">
                  <Form.Label>Return Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={car.returnTime}
                    onChange={(e) => handleUpdate(index, 'returnTime', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formGroupReturnLocation">
                  <Form.Label>Return Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Hae Jang Chon KBBQ Restaurant in Koreatown'
                    value={car.returnLocation}
                    onChange={(e) => handleUpdate(index, 'returnLocation', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formGroupCarMakeModelYear">
                  <Form.Label>Make, Model & Year</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Tesla Model S 2023'
                    value={car.carMakeModelYear}
                    onChange={(e) => handleUpdate(index, 'carMakeModelYear', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />
          </Form>
        ))
      }
      <Button onClick={() => handleAdd()}>
        Add a Car
      </Button>
      <br />
    </>
  );
}