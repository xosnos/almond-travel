import React from 'react';
import { Container } from 'reactstrap';

const SkyScannerWidget = ({widget}) => {
  const script = document.createElement('script');
  script.src = 'https://widgets.skyscanner.net/widget-server/js/loader.js';
  script.async = true;
  document.body.appendChild(script);
  return (
    <Container
      data-skyscanner-widget={widget}
      data-locale="en-US"
      data-market="US"
      data-currency="USD"
    />
  )
}

export const FlightSearchWidget = () => {
  return <SkyScannerWidget widget="FlightSearchWidget" />
};

export const HotelSearchWidget = () => {
  return <SkyScannerWidget widget="HotelSearchWidget" />
};

export const CarHireWidget = () => {
  return <SkyScannerWidget widget="CarHireWidget" />
}