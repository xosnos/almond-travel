import React, { FC, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Badge,
  Alert,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchTrips, removeTrip } from './tripsAPI';
import { Trip } from '../../types';

export const TripsPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const trips = useAppSelector((state) => state.trips.trips);
  const loading = useAppSelector((state) => state.trips.loading);
  const error = useAppSelector((state) => state.trips.error);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  // Protected route - redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const uid = user.uid;
      dispatch(fetchTrips(uid));
    }
  }, [user, navigate, dispatch]);

  const handleView = (index: number) => {
    navigate(`/trips/${index}`);
  };

  const handleRemove = async (index: number) => {
    if (!user) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this trip? This action cannot be undone.'
    );

    if (confirmDelete) {
      setDeletingIndex(index);
      try {
        const uid = user.uid;
        await dispatch(removeTrip({ uid, index })).unwrap();
      } catch (error) {
        console.error('Failed to remove trip:', error);
      } finally {
        setDeletingIndex(null);
      }
    }
  };

  const getTripItemCount = (trip: Trip): number => {
    return (
      trip.flights.length +
      trip.hotels.length +
      trip.cars.length +
      trip.activities.length +
      trip.checklist.length
    );
  };

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Redirecting to login...</p>
      </Container>
    );
  }

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <Container>
        {/* Header */}
        <Card
          className="mb-4 border-0 shadow-lg"
          style={{ borderRadius: '15px' }}
        >
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <Button
                onClick={() => navigate('/')}
                variant="outline-primary"
                className="px-4"
                style={{ borderRadius: '25px', fontWeight: '600' }}
              >
                🏠 Home
              </Button>
              <div className="text-center">
                <h1 className="mb-1 fw-bold">
                  ✈️ My Trips
                </h1>
                <p className="text-muted mb-0">
                  {trips.length} {trips.length === 1 ? 'trip' : 'trips'} planned
                </p>
              </div>
              <Button
                onClick={() => navigate('/new')}
                variant="success"
                className="px-4"
                style={{ borderRadius: '25px', fontWeight: '600' }}
              >
                ➕ Create New Trip
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Error message */}
        {error && (
          <Alert variant="danger" dismissible>
            <Alert.Heading>Error</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}

        {/* Loading state */}
        {loading && !deletingIndex ? (
          <Card
            className="border-0 shadow-lg text-center py-5"
            style={{ borderRadius: '15px' }}
          >
            <Card.Body>
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading your trips...</p>
            </Card.Body>
          </Card>
        ) : trips.length === 0 ? (
          /* Empty state */
          <Card
            className="border-0 shadow-lg text-center py-5"
            style={{ borderRadius: '15px' }}
          >
            <Card.Body className="p-5">
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
                ✈️
              </div>
              <h3 className="fw-bold mb-3">No Trips Yet</h3>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                Start planning your next adventure by creating your first trip!
              </p>
              <Button
                onClick={() => navigate('/new')}
                variant="primary"
                size="lg"
                className="px-5"
                style={{ borderRadius: '25px', fontWeight: '600' }}
              >
                ➕ Create Your First Trip
              </Button>
            </Card.Body>
          </Card>
        ) : (
          /* Trip list */
          <Row xs={1} md={2} lg={2} className="g-4">
            {trips.map((trip, index) => {
              const itemCount = getTripItemCount(trip);
              return (
                <Col key={index}>
                  <Card
                    className="h-100 border-0 shadow-lg overflow-hidden card-modern"
                    style={{
                      borderRadius: '15px',
                      transform: 'translateY(0)',
                      transition: 'all 0.3s ease-in-out',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      const card = e.currentTarget;
                      card.style.transform = 'translateY(-8px)';
                      card.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      const card = e.currentTarget;
                      card.style.transform = 'translateY(0)';
                      card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                    }}
                  >
                    <div
                      className="card-header py-3"
                      style={{
                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <Badge bg="light" text="dark" className="px-3 py-2">
                          Trip #{index + 1}
                        </Badge>
                        <Badge bg="warning" text="dark" className="px-3 py-2">
                          {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        </Badge>
                      </div>
                    </div>

                    <Card.Body className="p-4">
                      <div onClick={() => handleView(index)} style={{ cursor: 'pointer' }}>
                        <Card.Title className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>
                          📍 {trip.name || 'Untitled Trip'}
                        </Card.Title>
                        <Card.Subtitle className="mb-3 text-muted" style={{ fontSize: '1.1rem' }}>
                          🌎 {trip.location || 'No location set'}
                        </Card.Subtitle>

                        {/* Trip details */}
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {trip.flights.length > 0 && (
                            <Badge bg="primary" className="px-2 py-1">
                              ✈️ {trip.flights.length}
                            </Badge>
                          )}
                          {trip.hotels.length > 0 && (
                            <Badge bg="success" className="px-2 py-1">
                              🏨 {trip.hotels.length}
                            </Badge>
                          )}
                          {trip.cars.length > 0 && (
                            <Badge bg="info" className="px-2 py-1">
                              🚗 {trip.cars.length}
                            </Badge>
                          )}
                          {trip.activities.length > 0 && (
                            <Badge bg="warning" text="dark" className="px-2 py-1">
                              🎯 {trip.activities.length}
                            </Badge>
                          )}
                          {trip.checklist.length > 0 && (
                            <Badge bg="secondary" className="px-2 py-1">
                              ✅ {trip.checklist.length}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="d-flex gap-2 mt-3">
                        <Button
                          variant="primary"
                          onClick={() => handleView(index)}
                          className="flex-grow-1"
                          style={{ borderRadius: '25px', fontWeight: '600' }}
                        >
                          👁️ View & Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleRemove(index)}
                          disabled={deletingIndex === index}
                          style={{ borderRadius: '25px', fontWeight: '600' }}
                        >
                          {deletingIndex === index ? (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            '🗑️'
                          )}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
};
