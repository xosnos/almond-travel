import React, { useState } from 'react';
import {
  Container,
  ProgressBar,
  Button
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NewTripForm } from './NewTripForm';
import { clearTrip } from './tripSlice';
import { addTrip } from '../trips/tripsAPI';

export const NewTripPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [now, setNow] = useState(0);
  const user = useSelector(state => state.auth.user);
  const trip = useSelector(state => state.trip);

  const handleBack = () => {
    setNow(now - 20);
    if (now === 0) {
      dispatch(clearTrip());
      navigate('/');
    }
  }

  const handleNext = () => {
    setNow(now + 20);
    if (now === 100) {
      if (user && user.uid) {
        dispatch(addTrip({
          uid: user.uid,
          trip: trip,
        }));
        dispatch(clearTrip());
        navigate('/');
      } else {
        navigate('/login');
      }
    }
  }

  const renderForm = () => {
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
  }

  return (
    <Container>
      <div className='d-flex justify-content-between align-items-start'>
        <Button
          onClick={handleBack}
          variant="outline-primary"
        >
          {now === 0 ? 'Home' : 'Back'}
        </Button>
        <h1>New Trip</h1>
        <Button variant={now === 100 ? 'outline-warning' : 'outline-primary'} onClick={handleNext}>
          {now === 100 ? (user ? 'Submit' : 'Login to submit') : 'Next'}
        </Button>
      </div>
      <ProgressBar animated now={now} label={`${now}%`} />
      <br />
      <NewTripForm
        type={renderForm()}
      />
      <br />
    </Container>
  );
};