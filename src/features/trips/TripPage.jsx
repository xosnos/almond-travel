import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Button
} from 'react-bootstrap';
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

export const TripPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const tripIndex = parseInt(location.pathname.substring(7));
  const trip = useSelector(state => state.trips.trips[tripIndex]);
  const user = useSelector(state => state.auth.user);

  const handleCancel = () => {
    navigate('/trips');
  }

  const handleSave = () => {
    if (user) {
      const uid = user.uid;
      dispatch(updateTrip({
        uid, tripIndex, trip
      }));
      navigate('/trips');
    }
  }

  const handleAdd = (type) => () => {
    dispatch(addTripItem({
      tripIndex, type, item: itemBuilder[type]
    }))
  }

  const handleRemove = (type) => (index) => {
    dispatch(removeTripItem({
      tripIndex, type, index
    }))
  }

  const handleUpdate = (type) => (index, key, value) => {
    dispatch(updateTripItem({
      tripIndex, type, index, key, value
    }))
  }

  const handleSummary = (type, value) => {
    dispatch(updateTripItem({
      tripIndex, type, index: '', key: '', value
    }))
  }

  return (
    <Container>
    {trip ? (
      <>
        <div className='d-flex justify-content-between align-items-start'>
          <Button
            onClick={handleCancel}
            variant="outline-danger"
          >
            Cancel
          </Button>
          <h1>Trip: {trip.name}</h1>
          <Button variant="outline-warning" onClick={handleSave}>
            Save
          </Button>
        </div>
        <Summary
          name={trip.name}
          location={trip.location}
          handleUpdate={handleSummary}
        />
        <Flights
          items={trip.flights}
          handleAdd={handleAdd('flights')}
          handleRemove={handleRemove('flights')}
          handleUpdate={handleUpdate('flights')}
        />
        <Hotels
          items={trip.hotels}
          handleAdd={handleAdd('hotels')}
          handleRemove={handleRemove('hotels')}
          handleUpdate={handleUpdate('hotels')}
        />
        <Cars
          items={trip.cars}
          handleAdd={handleAdd('cars')}
          handleRemove={handleRemove('cars')}
          handleUpdate={handleUpdate('cars')}
        />
        <Activities
          items={trip.activities}
          handleAdd={handleAdd('activities')}
          handleRemove={handleRemove('activities')}
          handleUpdate={handleUpdate('activities')}
        />
        <Checklist
          items={trip.checklist}
          handleAdd={handleAdd('checklist')}
          handleRemove={handleRemove('checklist')}
          handleUpdate={handleUpdate('checklist')}
        />
      </>
      ) : (
        <h1>404: Trip Not Found</h1>
      )
    }
    </Container>
  );
}