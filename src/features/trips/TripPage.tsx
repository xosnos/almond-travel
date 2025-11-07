'use client'

import React, { FC, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Container,
  Button,
  Card,
  Spinner,
  Accordion,
  Badge,
  Alert,
} from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  Summary,
  Flights,
  Hotels,
  Cars,
  Activities,
  Checklist,
} from '../../components';
import {
  addTripItem,
  removeTripItem,
  updateTripItem,
} from './tripsSlice';
import { itemBuilder } from '../trip/itemBuilder';
import { updateTrip } from './tripsAPI';
import { TripItem } from '../../types';

export const TripPage: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const tripIndex = parseInt((pathname || '').substring(7) || '0');
  const trip = useAppSelector((state) => state.trips.trips[tripIndex]);
  const loading = useAppSelector((state) => state.trips.loading);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Protected route - redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel? Any unsaved changes will be lost.'
    );
    if (confirmCancel) {
      router.push('/trips');
    }
  };

  const handleSave = async () => {
    if (user && trip) {
      setIsSaving(true);
      try {
        const uid = user.uid;
        await dispatch(updateTrip({
          uid,
          tripIndex,
          trip
        })).unwrap();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          router.push('/trips');
        }, 1500);
      } catch (error) {
        console.error('Failed to update trip:', error);
        setIsSaving(false);
      }
    }
  };

  const handleAdd = (type: 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist') => () => {
    dispatch(addTripItem({
      tripIndex,
      type,
      item: itemBuilder[type]
    }));
  };

  const handleRemove = (type: 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist') => (index: number) => {
    dispatch(removeTripItem({
      tripIndex,
      type,
      index
    }));
  };

  const handleUpdate = (type: 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist') => (index: number, key: string, value: string | boolean) => {
    dispatch(updateTripItem({
      tripIndex,
      type,
      index,
      key,
      value
    }));
  };

  const handleSummary = (type: 'name' | 'location', value: string) => {
    dispatch(updateTripItem({
      tripIndex,
      type,
      index: undefined,
      key: undefined,
      value
    }));
  };

  const getSectionIcon = (type: string): string => {
    switch (type) {
      case 'flights':
        return '✈️';
      case 'hotels':
        return '🏨';
      case 'cars':
        return '🚗';
      case 'activities':
        return '🎯';
      case 'checklist':
        return '✅';
      default:
        return '📝';
    }
  };

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Redirecting to login...</p>
      </Container>
    );
  }

  if (loading && !trip) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading trip...</p>
      </Container>
    );
  }

  if (!trip) {
    return (
      <div
        className="min-vh-100 py-5"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <Container>
          <Card
            className="border-0 shadow-lg text-center py-5"
            style={{ borderRadius: '15px' }}
          >
            <Card.Body className="p-5">
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
                ❌
              </div>
              <h1 className="fw-bold mb-3">404: Trip Not Found</h1>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                The trip you're looking for doesn't exist or may have been deleted.
              </p>
              <Button
                onClick={() => router.push('/trips')}
                variant="primary"
                size="lg"
                className="px-5"
                style={{ borderRadius: '25px', fontWeight: '600' }}
              >
                ← Back to Trips
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <Container>
        {/* Success message */}
        {showSuccess && (
          <Alert variant="success" className="shadow-sm mb-4">
            ✅ Trip saved successfully! Redirecting...
          </Alert>
        )}

        {/* Header */}
        <Card
          className="mb-4 border-0 shadow-lg"
          style={{ borderRadius: '15px' }}
        >
          <Card.Header
            className="py-4"
            style={{
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <Button
                onClick={handleCancel}
                variant="light"
                disabled={isSaving}
                className="px-4"
                style={{ borderRadius: '25px', fontWeight: '600' }}
              >
                ← Cancel
              </Button>
              <div className="text-center text-white">
                <h1 className="mb-1 fw-bold fs-2">
                  ✈️ {trip.name || 'Edit Trip'}
                </h1>
                <p className="mb-0" style={{ opacity: 0.9 }}>
                  🌎 {trip.location || 'No location'}
                </p>
              </div>
              <Button
                variant="warning"
                onClick={handleSave}
                disabled={isSaving}
                className="px-4"
                style={{ borderRadius: '25px', fontWeight: '600' }}
              >
                {isSaving ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Saving...
                  </>
                ) : (
                  '💾 Save Changes'
                )}
              </Button>
            </div>
          </Card.Header>
        </Card>

        {/* Trip Summary */}
        <Card
          className="mb-4 border-0 shadow-lg"
          style={{ borderRadius: '15px' }}
        >
          <Card.Header
            className="py-3"
            style={{
              background: 'linear-gradient(90deg, #667eea15 0%, #764ba215 100%)',
              borderBottom: '2px solid #e9ecef',
            }}
          >
            <h4 className="mb-0 fw-bold">
              📋 Trip Summary
            </h4>
          </Card.Header>
          <Card.Body className="p-4">
            <Summary
              name={trip.name}
              location={trip.location}
              handleUpdate={handleSummary}
            />
          </Card.Body>
        </Card>

        {/* Accordion sections */}
        <Accordion defaultActiveKey="0" className="shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
          {/* Flights */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                <span className="fw-bold fs-5">
                  {getSectionIcon('flights')} Flights
                </span>
                <Badge bg="primary" pill>
                  {trip.flights.length}
                </Badge>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-4">
              <Flights
                items={trip.flights as TripItem[]}
                handleAdd={handleAdd('flights')}
                handleRemove={handleRemove('flights')}
                handleUpdate={handleUpdate('flights')}
              />
            </Accordion.Body>
          </Accordion.Item>

          {/* Hotels */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                <span className="fw-bold fs-5">
                  {getSectionIcon('hotels')} Hotels
                </span>
                <Badge bg="success" pill>
                  {trip.hotels.length}
                </Badge>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-4">
              <Hotels
                items={trip.hotels as TripItem[]}
                handleAdd={handleAdd('hotels')}
                handleRemove={handleRemove('hotels')}
                handleUpdate={handleUpdate('hotels')}
              />
            </Accordion.Body>
          </Accordion.Item>

          {/* Cars */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                <span className="fw-bold fs-5">
                  {getSectionIcon('cars')} Rental Cars
                </span>
                <Badge bg="info" pill>
                  {trip.cars.length}
                </Badge>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-4">
              <Cars
                items={trip.cars as TripItem[]}
                handleAdd={handleAdd('cars')}
                handleRemove={handleRemove('cars')}
                handleUpdate={handleUpdate('cars')}
              />
            </Accordion.Body>
          </Accordion.Item>

          {/* Activities */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                <span className="fw-bold fs-5">
                  {getSectionIcon('activities')} Activities
                </span>
                <Badge bg="warning" text="dark" pill>
                  {trip.activities.length}
                </Badge>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-4">
              <Activities
                items={trip.activities as TripItem[]}
                handleAdd={handleAdd('activities')}
                handleRemove={handleRemove('activities')}
                handleUpdate={handleUpdate('activities')}
              />
            </Accordion.Body>
          </Accordion.Item>

          {/* Checklist */}
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                <span className="fw-bold fs-5">
                  {getSectionIcon('checklist')} Checklist
                </span>
                <Badge bg="secondary" pill>
                  {trip.checklist.length}
                </Badge>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-4">
              <Checklist
                items={trip.checklist as TripItem[]}
                handleAdd={handleAdd('checklist')}
                handleRemove={handleRemove('checklist')}
                handleUpdate={handleUpdate('checklist')}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Footer actions */}
        <Card
          className="mt-4 border-0 shadow-lg"
          style={{ borderRadius: '15px' }}
        >
          <Card.Body className="p-4 text-center">
            <div className="d-flex gap-3 justify-content-center">
              <Button
                onClick={handleCancel}
                variant="outline-secondary"
                size="lg"
                disabled={isSaving}
                className="px-5"
                style={{ borderRadius: '25px', fontWeight: '600' }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                size="lg"
                disabled={isSaving}
                className="px-5"
                style={{ borderRadius: '25px', fontWeight: '600' }}
              >
                {isSaving ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Saving...
                  </>
                ) : (
                  '💾 Save Changes'
                )}
              </Button>
            </div>
            <p className="text-muted mt-3 mb-0">
              💡 All changes are saved to the cloud
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
