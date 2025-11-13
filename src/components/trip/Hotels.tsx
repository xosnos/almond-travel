import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { TripItem } from '../../types/index';

interface HotelsProps {
  items: TripItem[];
  handleAdd: () => void;
  handleRemove: (index: number) => void;
  handleUpdate: (index: number, field: string, value: string) => void;
  loading?: boolean;
  error?: string | null;
}

export const Hotels: React.FC<HotelsProps> = ({
  items,
  handleAdd,
  handleRemove,
  handleUpdate,
  loading = false,
  error = null
}) => {
  const getFieldValue = (hotel: TripItem, field: string): string => {
    return hotel[field] ?? '';
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-primary">Hotels</h2>

      {error && (
        <div className="relative mb-4 rounded border border-red-400 bg-red-50 px-4 py-3 text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="hotels-container">
        {items.length === 0 ? (
          <div className="mb-3 rounded border border-blue-400 bg-blue-50 px-4 py-3 text-blue-700">
            No hotels added yet. Click "Add a Hotel" to get started!
          </div>
        ) : (
          items.map((hotel, index) => (
            <div
              key={index}
              className="mb-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-300"
              style={{ borderLeft: '4px solid #198754' }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="m-0 text-lg text-gray-600">
                  <i className="bi bi-building text-green-600 mr-2"></i>Hotel #{index + 1}
                </h4>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemove(index)}
                  disabled={loading}
                  className="h-9 w-9 rounded-full border-red-500 text-red-500 hover:bg-red-50"
                  title="Remove hotel"
                >
                  ✕
                </Button>
              </div>

              {/* Check-in/Check-out Dates */}
              <div className="mb-3 rounded-md bg-gray-100 p-3">
                <h6 className="mb-3 text-xs font-semibold uppercase tracking-wider">
                  Dates
                </h6>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold">Check In Date</Label>
                    <Input
                      type="date"
                      value={getFieldValue(hotel, 'checkInDate')}
                      onChange={(e) => handleUpdate(index, 'checkInDate', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Check Out Date</Label>
                    <Input
                      type="date"
                      value={getFieldValue(hotel, 'checkOutDate')}
                      onChange={(e) => handleUpdate(index, 'checkOutDate', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Hotel Details */}
              <div className="rounded-md bg-gray-100 p-3">
                <h6 className="mb-3 text-xs font-semibold uppercase tracking-wider">
                  Hotel Information
                </h6>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <Label className="text-xs font-semibold">Hotel Name</Label>
                    <Input
                      type="text"
                      placeholder="The Plaza"
                      value={getFieldValue(hotel, 'hotelName')}
                      onChange={(e) => handleUpdate(index, 'hotelName', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Address</Label>
                    <Input
                      type="text"
                      placeholder="768 5th Ave"
                      value={getFieldValue(hotel, 'hotelAddress')}
                      onChange={(e) => handleUpdate(index, 'hotelAddress', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">City</Label>
                    <Input
                      type="text"
                      placeholder="New York"
                      value={getFieldValue(hotel, 'hotelCity')}
                      onChange={(e) => handleUpdate(index, 'hotelCity', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Button
        onClick={handleAdd}
        disabled={loading}
        className="mt-3 bg-green-600 hover:bg-green-700"
      >
        {loading ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Adding Hotel...
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle mr-2"></i>Add a Hotel
          </>
        )}
      </Button>
    </div>
  );
};
