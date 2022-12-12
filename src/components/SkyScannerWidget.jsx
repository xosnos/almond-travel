import React from 'react';

export const SkyScannerWidget = ({type}) => {
  let widget = undefined;
  switch (type) {
    case 'flights':
      widget = 'FlightSearchWidget';
      break;
    case 'hotels':
      widget = 'HotelSearchWidget';
      break;
    case 'cars':
      widget = 'CarHireWidget';
      break;
    default:
      throw new Error('Invalid widget type');
  }

  const script = document.createElement('script');
  script.src = 'https://widgets.skyscanner.net/widget-server/js/loader.js';
  script.async = true;
  document.body.appendChild(script);
  return (
    <div
      data-skyscanner-widget={widget}
      data-locale="en-US"
      data-market="US"
      data-currency="USD"
    />
  )
}