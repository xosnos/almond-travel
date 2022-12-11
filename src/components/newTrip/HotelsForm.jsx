import React from 'react';
import {
  Button,
  Col,
  Form,
  Row
} from 'react-bootstrap';
import {
  HotelSearchWidget
} from '..';

export const HotelsForm = ({hotels, setHotels}) => {

  const addHotel = () => {
    setHotels([...hotels, {
      id: hotels.length,
      checkInDate: '',
      checkOutDate: '',
      hotelName: '',
      hotelAddress: '',
      hotelCity: '',
    }]);
  }

  const removeHotel = () => {
    const newHotels = [...hotels];
    newHotels.pop();
    setHotels(newHotels);
  }

  const updateHotel = (index, key, value) => {
    const newHotels = [...hotels];
    newHotels[index][key] = value;
    setHotels(newHotels);
  }

  return (
    <>
      <h2>Search & Book Hotels</h2>
      <Row>
        <HotelSearchWidget />
      </Row>
      <h2>Hotels Itinerary</h2>
      {
        hotels.map((hotel, index) => (
          <Form key={index}>
            <h3>Hotel # {index + 1}</h3>
            <Row>
              <Col xs={6}>
                <Form.Group controlId="formGroupCheckInDate">
                  <Form.Label>Check In Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={hotel.checkInDate}
                    onChange={(e) => updateHotel(index, 'checkInDate', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="formGroupCheckOutDate">
                  <Form.Label>Check Out Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={hotel.checkOutDate}
                    onChange={(e) => updateHotel(index, 'checkOutDate', e.target.value)}
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
                    onChange={(e) => updateHotel(index, 'hotelName', e.target.value)}
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
                    onChange={(e) => updateHotel(index, 'hotelAddress', e.target.value)}
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
                    onChange={(e) => updateHotel(index, 'hotelCity', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />
          </Form>
        ))
      }
      <div className="d-flex justify-content-between">
        <Button variant="success" onClick={addHotel}>
          Add a Hotel
        </Button>
        {
          hotels.length ? (
            <Button variant="danger" onClick={removeHotel}>
              Remove Hotel
            </Button>
          ) : null
        }
      </div>
      <br />
    </>
  );
}