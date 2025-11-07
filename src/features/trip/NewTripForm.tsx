import React, { FC } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  SkyScannerWidget,
  ActivitySearch,
  Flights,
  Hotels,
  Cars,
  Activities,
  Checklist,
  Summary,
} from '../../components';
import {
  addItem,
  removeItem,
  updateItem
} from './tripSlice';
import { itemBuilder } from './itemBuilder';
import { TripItem } from '../../types';

type FormType = 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist' | 'summary';

interface NewTripFormProps {
  type: FormType;
}

export const NewTripForm: FC<NewTripFormProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.trip.name);
  const location = useAppSelector((state) => state.trip.location);
  const items = useAppSelector((state) => {
    if (type === 'summary') return [];
    return state.trip[type];
  });

  const handleAdd = () => {
    if (type !== 'summary') {
      dispatch(addItem({ type, item: itemBuilder[type] }));
    }
  };

  const handleRemove = (index: number) => {
    if (type !== 'summary') {
      dispatch(removeItem({ type, index }));
    }
  };

  const handleUpdate = (index: number, key: string, value: string) => {
    if (type !== 'summary') {
      dispatch(updateItem({ type, index, key, value }));
    }
  };

  const handleSummary = (type: 'name' | 'location', value: string) => {
    dispatch(updateItem({ type, index: undefined, key: undefined, value }));
  };

  const getSectionIcon = (): string => {
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
      case 'summary':
        return '📋';
      default:
        return '📝';
    }
  };

  const getSectionDescription = (): string => {
    switch (type) {
      case 'flights':
        return 'Search and add your flight details';
      case 'hotels':
        return 'Find and book your accommodations';
      case 'cars':
        return 'Reserve your rental car';
      case 'activities':
        return 'Plan exciting activities for your trip';
      case 'checklist':
        return 'Create your packing and to-do list';
      case 'summary':
        return 'Review and finalize your trip details';
      default:
        return '';
    }
  };

  const getItemCount = (): number => {
    if (type === 'summary') return 0;
    return items.length;
  };

  return (
    <div className="new-trip-form">
      {/* Section header */}
      <Card
        className="mb-4 border-0 shadow-sm"
        style={{
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
        }}
      >
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-2 fw-bold">
                <span className="me-2" style={{ fontSize: '1.5rem' }}>
                  {getSectionIcon()}
                </span>
                {type.toUpperCase()}
              </h2>
              <p className="text-muted mb-0">
                {getSectionDescription()}
              </p>
            </div>
            {type !== 'summary' && getItemCount() > 0 && (
              <Badge
                bg="primary"
                pill
                style={{
                  fontSize: '1rem',
                  padding: '0.5rem 1rem',
                }}
              >
                {getItemCount()} {getItemCount() === 1 ? 'item' : 'items'}
              </Badge>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Form content */}
      <div className="form-content">
        {type === 'flights' && (
          <div className="section-content">
            <Card className="mb-4 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body className="p-4">
                <h5 className="mb-3 fw-semibold text-primary">
                  🔍 Search Flights
                </h5>
                <SkyScannerWidget type="flights" />
              </Card.Body>
            </Card>
            <Flights
              items={items as TripItem[]}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
            />
          </div>
        )}

        {type === 'hotels' && (
          <div className="section-content">
            <Card className="mb-4 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body className="p-4">
                <h5 className="mb-3 fw-semibold text-primary">
                  🔍 Search Hotels
                </h5>
                <SkyScannerWidget type="hotels" />
              </Card.Body>
            </Card>
            <Hotels
              items={items as TripItem[]}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
            />
          </div>
        )}

        {type === 'cars' && (
          <div className="section-content">
            <Card className="mb-4 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body className="p-4">
                <h5 className="mb-3 fw-semibold text-primary">
                  🔍 Search Rental Cars
                </h5>
                <SkyScannerWidget type="cars" />
              </Card.Body>
            </Card>
            <Cars
              items={items as TripItem[]}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
            />
          </div>
        )}

        {type === 'activities' && (
          <div className="section-content">
            <Card className="mb-4 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body className="p-4">
                <h5 className="mb-3 fw-semibold text-primary">
                  🔍 Discover Activities
                </h5>
                <ActivitySearch />
              </Card.Body>
            </Card>
            <Activities
              items={items as TripItem[]}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
            />
          </div>
        )}

        {type === 'checklist' && (
          <div className="section-content">
            <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body className="p-4">
                <Checklist
                  items={items as TripItem[]}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                  handleUpdate={handleUpdate}
                />
              </Card.Body>
            </Card>
          </div>
        )}

        {type === 'summary' && (
          <div className="section-content">
            <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body className="p-4">
                <Summary
                  name={name}
                  location={location}
                  handleUpdate={handleSummary}
                />
              </Card.Body>
            </Card>
          </div>
        )}
      </div>

      {/* Empty state for items */}
      {type !== 'summary' && getItemCount() === 0 && (
        <Card
          className="mt-4 border-0 text-center py-5"
          style={{
            borderRadius: '12px',
            background: '#f8f9fa',
          }}
        >
          <Card.Body>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              {getSectionIcon()}
            </div>
            <h5 className="text-muted mb-2">No items added yet</h5>
            <p className="text-muted small mb-0">
              Click the button below to add your first {type.slice(0, -1)}
            </p>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
