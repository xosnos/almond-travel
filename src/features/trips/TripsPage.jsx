import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTrips, removeTrip } from './tripsAPI';

export const TripsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const trips = useSelector(state => state.trips.trips);

  useEffect (() => {
    if (user) {
      const uid = user.uid;
      dispatch(fetchTrips(uid));
    } else {
      navigate('/login');
    }
  }, [user, navigate, dispatch]);

  const handleView = (index) => {
    navigate(`/trips/${index}`);
  }

  const handleRemove = (index) => {
    const uid = user.uid;
    dispatch(removeTrip({uid, index}));
  }


  return (
    <Container>
      <div className='d-flex justify-content-between align-items-start'>
        <Button
          onClick={() => navigate('/')}
          variant="outline-primary"
        >
          Home
        </Button>
        <h1>My Trips</h1>
        <Button
          onClick={() => navigate('/new')}
          variant="outline-success"
        >
          Create New Trip
        </Button>
      </div>
      {
        trips.map((trip, index) => (
          <Card key={index}>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>
                    {trip.name}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {trip.location}
                  </Card.Subtitle>
                </Col>
                <Col className="d-flex justify-content-end align-items-start">
                  <Button
                    variant="outline-primary"
                    onClick={() => handleView(index)}
                  >
                    View & Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      }
    </Container>
  );
}