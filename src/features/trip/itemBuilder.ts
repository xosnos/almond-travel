import { TripItem } from '../../types';

export const itemBuilder: Record<string, TripItem> = {
  flight: {
    type: 'flight',
    origin: '',
    destination: '',
    date: '',
    time: '',
    airline: '',
    price: '',
    url: '',
  },
  hotel: {
    type: 'hotel',
    name: '',
    location: '',
    checkIn: '',
    checkOut: '',
    price: '',
    url: '',
  },
  car: {
    type: 'car',
    company: '',
    pickupLocation: '',
    pickupDate: '',
    dropoffLocation: '',
    dropoffDate: '',
    price: '',
    url: '',
  },
  activity: {
    type: 'activity',
    name: '',
    location: '',
    date: '',
    time: '',
    price: '',
    url: '',
  },
  checklist: {
    type: 'checklist',
    item: '',
    completed: false,
  },
};
