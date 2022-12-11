import React from 'react';
import {
  Button,
  Col,
  Row,
  Form
} from 'react-bootstrap';
import {
  FlightSearchWidget
} from '..';

export const FlightsForm = ({flights, setFlights}) => {

  const addFlight = () => {
    setFlights([...flights, {
      id: flights.length,
      departureDate: '',
      departureTime: '',
      departureAirport: '',
      departureCity: '',
      arrivalDate: '',
      arrivalTime: '',
      arrivalAirport: '',
      arrivalCity: '',
    }]);
  }

  const removeFlight = () => {
    const newFlights = [...flights];
    newFlights.pop();
    setFlights(newFlights);
  }

  const updateFlight = (index, key, value) => {
    const newFlights = [...flights];
    newFlights[index][key] = value;
    setFlights(newFlights);
  }

  return (
    <>
      <h2>Search & Book Flights</h2>
      <Row>
        <FlightSearchWidget />
      </Row>
      <h2>Flights Itinerary</h2>
      {
        flights.map((flight, index) => (
          <Form key={index}>
            <h3>Flight # {index + 1}</h3>
            <Row>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupDepartureDate">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={flight.departureDate}
                    onChange={(e) => updateFlight(index, 'departureDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupDepartureTime">
                  <Form.Label>Departure Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={flight.departureTime}
                    onChange={(e) => updateFlight(index, 'departureTime', e.target.value)}
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
                    onChange={(e) => updateFlight(index, 'departureAirport', e.target.value)}
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
                    onChange={(e) => updateFlight(index, 'departureCity', e.target.value)}
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
                    onChange={(e) => updateFlight(index, 'arrivalDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupArrivalTime">
                  <Form.Label>Arrival Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={flight.arrivalTime}
                    onChange={(e) => updateFlight(index, 'arrivalTime', e.target.value)}
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
                    onChange={(e) => updateFlight(index, 'arrivalAirport', e.target.value)}
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
                    onChange={(e) => updateFlight(index, 'arrivalCity', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />
          </Form>
        ))
      }
      <div className="d-flex justify-content-between">
        <Button variant="success" onClick={addFlight}>
          Add a Flight
        </Button>
        {
          flights.length ? (
            <Button variant="danger" onClick={removeFlight}>
              Remove flight
            </Button>
          ) : null
        }
      </div>
      <br />
    </>
  );
}