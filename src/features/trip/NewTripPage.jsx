import React, { useState } from 'react';
import {
  Container,
  ProgressBar,
  Button
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  NewTripForm,
} from './NewTripForm';
import {
  addTrip,
  clearTrip,
} from '../';

export const NewTripPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [now, setNow] = useState(0);
  const user = useSelector(state => state.auth.user);
  const trip = useSelector(state => state.trip);

  const handleBack = () => {
    setNow(now - 20);
    if (now === 0) {
      navigate('/');
    }
  }

  const handleNext = () => {
    setNow(now + 20);
    if (now === 100) {
      dispatch(addTrip({
        uid: user.uid,
        trip: trip,
      }));
      dispatch(clearTrip());
      navigate('/');
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
      <h1>New Trip</h1>
      <div className='d-flex justify-content-between'>
        <Button onClick={handleBack}>
          {now === 0 ? 'Home' : 'Back'}
        </Button>
        <Button variant={now === 100 ? 'warning' : 'primary'} onClick={handleNext}>
          {now === 100 ? 'Submit' : 'Next'}
        </Button>
      </div>
      <br />
      <ProgressBar animated now={now} label={`${now}%`} />
      <br />
      <NewTripForm
        type={renderForm()}
      />
      <br />
    </Container>
  );
};