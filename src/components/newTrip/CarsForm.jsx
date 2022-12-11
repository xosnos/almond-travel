import React from 'react';
import {
  Button,
  Col,
  Row,
  Form
} from 'react-bootstrap';
import {
  CarHireWidget
} from '..';

export const CarsForm = ({cars, setCars}) => {

  const addCar = () => {
    setCars([...cars, {
      id: cars.length,
      pickUpDate: '',
      pickUpTime: '',
      pickUpLocation: '',
      returnDate: '',
      returnTime: '',
      returnLocation: '',
      carMakeModelYear: '',
    }]);
  }

  const removeCar = () => {
    const newCars = [...cars];
    newCars.pop();
    setCars(newCars);
  }

  const updateCar = (index, key, value) => {
    const newCars = [...cars];
    newCars[index][key] = value;
    setCars(newCars);
  }

  return (
    <>
      <h2>Search & Book Cars</h2>
      <Row>
        <CarHireWidget />
      </Row>
      <h2>Cars Itinerary</h2>
      {
        cars.map((car, index) => (
          <Form key={index}>
            <h3>Car # {index + 1}</h3>
            <Row>
              <Col xs={6} md={4}>
                <Form.Group controlId="formGroupPickUpDate">
                  <Form.Label>Pick Up Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={car.pickUpDate}
                    onChange={(e) => updateCar(index, 'pickUpDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group controlId="formGroupPickUpTime">
                  <Form.Label>Pick Up Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={car.pickUpTime}
                    onChange={(e) => updateCar(index, 'pickUpTime', e.target.value)}
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
                    onChange={(e) => updateCar(index, 'pickUpLocation', e.target.value)}
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
                    onChange={(e) => updateCar(index, 'returnDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={4}>
                <Form.Group controlId="formGroupReturnTime">
                  <Form.Label>Return Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={car.returnTime}
                    onChange={(e) => updateCar(index, 'returnTime', e.target.value)}
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
                    onChange={(e) => updateCar(index, 'returnLocation', e.target.value)}
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
                    onChange={(e) => updateCar(index, 'carMakeModelYear', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />
          </Form>
        ))
      }
      <div className="d-flex justify-content-between">
        <Button variant="success" onClick={addCar}>Add a Car</Button>
        {
          cars.length ? (
            <Button variant="danger" onClick={removeCar}>Remove Car</Button>
          ) : null
        }
      </div>
      <br />
    </>
  );
}