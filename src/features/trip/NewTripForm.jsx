import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SkyScannerWidget,
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
} from '..';
import { itemBuilder } from './itemBuilder';

export const NewTripForm = ({ type }) => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.trip.name);
  const location = useSelector(state => state.trip.location);
  const items = useSelector(state => state.trip[type]);

  const handleAdd = () => {
    dispatch(addItem({ type, item: itemBuilder[type] }));
  }

  const handleRemove = (index) => {
    dispatch(removeItem({ type, index }));
  }

  const handleUpdate = (index, key, value) => {
    dispatch(updateItem({ type, index, key, value }));
  }

  const handleSummary = (type, value) => {
    dispatch(updateItem({ type, index: '', key: '', value }));
  }

  return (
    <>
      <h2>{type.toUpperCase()}</h2>
      {type === 'flights' &&
        <>
          <SkyScannerWidget type='flights' />
          <Flights
            items={items}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
          />
        </>
      }
      {type === 'hotels' &&
        <>
          <SkyScannerWidget type='hotels' />
          <Hotels
            items={items}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
          />
        </>
      }
      {type === 'cars' &&
        <>
          <SkyScannerWidget type='cars' />
          <Cars
            items={items}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            handleUpdate={handleUpdate}
          />
        </>
      }
      {type === 'activities' &&
        <Activities
          items={items}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          handleUpdate={handleUpdate}
        />
      }
      {type === 'checklist' &&
        <Checklist
          items={items}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          handleUpdate={handleUpdate}
        />
      }
      {
        type === 'summary' &&
        <Summary
          name={name}
          location={location}
          handleUpdate={handleSummary}
        />
      }
    </>
  )

}