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
  FlightsForm,
  HotelsForm,
  CarsForm,
  ActivitiesForm,
  ChecklistForm,
  TripSummary
} from '../components';
import {
  addTrip,
} from '../features'

export const NewTripPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [now, setNow] = useState(0);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [cars, setCars] = useState([]);
  const [activities, setActivities] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const user = useSelector(state => state.auth.user);
  const trips = useSelector(state => state.trips.trips);

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
        trip: {
          id: trips.length,
          name: name,
          location: location,
          flights: flights,
          hotels: hotels,
          cars: cars,
          activities: activities,
          checklist: checklist,
        }
      }));
      navigate('/');
    }
  }

  return (
    <Container>
      <h1>New Trip</h1>
      <div className='d-flex justify-content-between'>
        <Button variant="secondary" onClick={handleBack}>
          {now === 0 ? 'Home' : 'Back'}
        </Button>
        <Button variant={now === 100 ? 'primary' : 'secondary'} onClick={handleNext}>
          {now === 100 ? 'Submit' : 'Next'}
        </Button>
      </div>
      <br />
      <ProgressBar animated now={now} label={`${now}%`} />
      <br />
      { now === 0 && <FlightsForm flights={flights} setFlights={setFlights} /> }
      { now === 20 && <HotelsForm hotels={hotels} setHotels={setHotels} />}
      { now === 40 && <CarsForm cars={cars} setCars={setCars} />}
      { now === 60 && <ActivitiesForm activities={activities} setActivities={setActivities} />}
      { now === 80 && <ChecklistForm checklist={checklist} setChecklist={setChecklist} />}
      { now === 100 && <TripSummary name={name} setName={setName} location={location} setLocation={setLocation} />}
    </Container>
  );
};