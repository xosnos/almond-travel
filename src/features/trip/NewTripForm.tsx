import React, { FC } from 'react';
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
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

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

  const handleUpdate = (index: number, key: string, value: string | boolean) => {
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
        className="mb-6 border-0 shadow-sm rounded-xl"
        style={{
          background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
        }}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                <span className="mr-2 text-2xl">
                  {getSectionIcon()}
                </span>
                {type.toUpperCase()}
              </h2>
              <p className="text-muted-foreground">
                {getSectionDescription()}
              </p>
            </div>
            {type !== 'summary' && getItemCount() > 0 && (
              <Badge className="text-base px-4 py-2">
                {getItemCount()} {getItemCount() === 1 ? 'item' : 'items'}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Form content */}
      <div className="form-content">
        {type === 'flights' && (
          <div className="section-content">
            <Card className="mb-6 border-0 shadow-sm rounded-xl">
              <CardContent className="p-6">
                <h5 className="text-lg font-semibold text-primary mb-4">
                  🔍 Search Flights
                </h5>
                <SkyScannerWidget type="flights" />
              </CardContent>
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
            <Card className="mb-6 border-0 shadow-sm rounded-xl">
              <CardContent className="p-6">
                <h5 className="text-lg font-semibold text-primary mb-4">
                  🔍 Search Hotels
                </h5>
                <SkyScannerWidget type="hotels" />
              </CardContent>
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
            <Card className="mb-6 border-0 shadow-sm rounded-xl">
              <CardContent className="p-6">
                <h5 className="text-lg font-semibold text-primary mb-4">
                  🔍 Search Rental Cars
                </h5>
                <SkyScannerWidget type="cars" />
              </CardContent>
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
            <Card className="mb-6 border-0 shadow-sm rounded-xl">
              <CardContent className="p-6">
                <h5 className="text-lg font-semibold text-primary mb-4">
                  🔍 Discover Activities
                </h5>
                <ActivitySearch />
              </CardContent>
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
            <Card className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-6">
                <Checklist
                  items={items as TripItem[]}
                  handleAdd={handleAdd}
                  handleRemove={handleRemove}
                  handleUpdate={handleUpdate}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {type === 'summary' && (
          <div className="section-content">
            <Card className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-6">
                <Summary
                  name={name}
                  location={location}
                  handleUpdate={handleSummary}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Empty state for items */}
      {type !== 'summary' && getItemCount() === 0 && (
        <Card
          className="mt-6 border-0 text-center py-12 rounded-xl"
          style={{
            background: '#f8f9fa',
          }}
        >
          <CardContent>
            <div className="text-5xl mb-4">
              {getSectionIcon()}
            </div>
            <h5 className="text-muted-foreground font-semibold mb-2">No items added yet</h5>
            <p className="text-muted-foreground text-sm">
              Click the button below to add your first {type.slice(0, -1)}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
