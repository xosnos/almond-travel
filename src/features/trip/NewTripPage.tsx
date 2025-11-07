'use client'

import React, { FC, useState, useEffect } from 'react';
import {
  Container,
  ProgressBar,
  Button,
  Spinner,
  Card,
} from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { NewTripForm } from './NewTripForm';
import { clearTrip } from './tripSlice';
import { addTrip } from '../trips/tripsAPI';

type FormType = 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist' | 'summary';

export const NewTripPage: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [now, setNow] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);
  const trip = useAppSelector((state) => state.trip);
  const loading = useAppSelector((state) => state.trips.loading);

  // Protected route - redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleBack = () => {
    if (now === 0) {
      dispatch(clearTrip());
      router.push('/');
    } else {
      setNow(now - 20);
    }
  };

  const handleNext = async () => {
    if (now === 100) {
      if (user && user.uid) {
        setIsSubmitting(true);
        try {
          await dispatch(addTrip({
            uid: user.uid,
            trip: trip,
          })).unwrap();
          dispatch(clearTrip());
          router.push('/trips');
        } catch (error) {
          console.error('Failed to add trip:', error);
          setIsSubmitting(false);
        }
      } else {
        router.push('/login');
      }
    } else {
      setNow(now + 20);
    }
  };

  const renderForm = (): FormType => {
    switch (now) {
      case 0:
        return 'flights';
      case 20:
        return 'hotels';
      case 40:
        return 'cars';
      case 60:
        return 'activities';
      case 80:
        return 'checklist';
      default:
        return 'summary';
    }
  };

  const getProgressVariant = (): string => {
    if (now < 40) return 'danger';
    if (now < 80) return 'warning';
    return 'success';
  };

  const getSectionTitle = (): string => {
    const type = renderForm();
    return type.charAt(0).toUpperCase() + type.slice(1);
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
    <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container>
        <Card
          className="shadow-lg border-0 overflow-hidden"
          style={{
            borderRadius: '15px',
            background: 'rgba(255, 255, 255, 0.98)',
          }}
        >
          <Card.Header
            className="py-4"
            style={{
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <Button
                onClick={handleBack}
                variant="light"
                disabled={isSubmitting || loading}
                className="px-4"
                style={{
                  borderRadius: '25px',
                  fontWeight: '600',
                }}
              >
                {now === 0 ? '🏠 Home' : '← Back'}
              </Button>
              <h1 className="text-white mb-0 fs-2 fw-bold">
                ✈️ Plan Your Trip
              </h1>
              <Button
                variant={now === 100 ? 'warning' : 'light'}
                onClick={handleNext}
                disabled={isSubmitting || loading}
                className="px-4"
                style={{
                  borderRadius: '25px',
                  fontWeight: '600',
                }}
              >
                {isSubmitting || loading ? (
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
                  now === 100 ? (user ? '📝 Submit Trip' : '🔐 Login to Submit') : 'Next →'
                )}
              </Button>
            </div>
          </Card.Header>

          <Card.Body className="p-4">
            {/* Progress section */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted fw-semibold">Progress</span>
                <span className="badge bg-primary">{now}% Complete</span>
              </div>
              <ProgressBar
                animated
                now={now}
                variant={getProgressVariant()}
                style={{ height: '12px', borderRadius: '10px' }}
              />
            </div>

            {/* Current section indicator */}
            <div className="text-center mb-4">
              <h3 className="fw-bold text-primary mb-1">
                {getSectionTitle()}
              </h3>
              <p className="text-muted">
                Step {(now / 20) + 1} of 6
              </p>
            </div>

            {/* Form content */}
            <div
              className="px-3"
              style={{
                minHeight: '400px',
              }}
            >
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-3 text-muted">Loading...</p>
                </div>
              ) : (
                <NewTripForm type={renderForm()} />
              )}
            </div>
          </Card.Body>

          <Card.Footer
            className="text-center py-3 bg-light"
            style={{ borderTop: '2px solid #e9ecef' }}
          >
            <small className="text-muted">
              💡 Tip: You can always come back and edit your trip later
            </small>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};
