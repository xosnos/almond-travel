import React, { useState } from 'react';
import {
  Container,
  ProgressBar,
} from 'react-bootstrap';
import { FlightForm } from '../components';

export const NewTripPage = () => {
  const [now, setNow] = useState(0);
  return (
    <Container>
      <h1>New Trip</h1>
      <ProgressBar now={now} />
      <FlightForm />
    </Container>
  );
};