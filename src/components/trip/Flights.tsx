import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { TripItem } from '../../types/index';

interface FlightsProps {
  items: TripItem[];
  handleAdd: () => void;
  handleRemove: (index: number) => void;
  handleUpdate: (index: number, field: string, value: string) => void;
  loading?: boolean;
  error?: string | null;
}

export const Flights: React.FC<FlightsProps> = ({
  items,
  handleAdd,
  handleRemove,
  handleUpdate,
  loading = false,
  error = null
}) => {
  const getFieldValue = (flight: TripItem, field: string): string => {
    return flight[field] ?? '';
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-primary">Flights</h2>

      {error && (
        <div className="relative mb-4 rounded border border-red-400 bg-red-50 px-4 py-3 text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="flights-container">
        {items.length === 0 ? (
          <div className="mb-3 rounded border border-blue-400 bg-blue-50 px-4 py-3 text-blue-700">
            No flights added yet. Click "Add a Flight" to get started!
          </div>
        ) : (
          items.map((flight, index) => (
            <div
              key={index}
              className="mb-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-300"
              style={{ borderLeft: '4px solid #0d6efd' }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="m-0 text-lg text-gray-600">
                  <i className="bi bi-airplane-fill text-primary mr-2"></i>Flight #{index + 1}
                </h4>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemove(index)}
                  disabled={loading}
                  className="h-9 w-9 rounded-full border-red-500 text-red-500 hover:bg-red-50"
                  title="Remove flight"
                >
                  ✕
                </Button>
              </div>

              {/* Departure Section */}
              <div className="mb-3 rounded-md bg-gray-100 p-3">
                <h6 className="mb-3 text-xs font-semibold uppercase tracking-wider">
                  Departure
                </h6>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <Label className="text-xs font-semibold">Date</Label>
                    <Input
                      type="date"
                      value={getFieldValue(flight, 'departureDate')}
                      onChange={(e) => handleUpdate(index, 'departureDate', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Time</Label>
                    <Input
                      type="time"
                      value={getFieldValue(flight, 'departureTime')}
                      onChange={(e) => handleUpdate(index, 'departureTime', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Airport Code</Label>
                    <Input
                      type="text"
                      placeholder="SGN"
                      value={getFieldValue(flight, 'departureAirport')}
                      onChange={(e) => handleUpdate(index, 'departureAirport', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">City</Label>
                    <Input
                      type="text"
                      placeholder="Ho Chi Minh City"
                      value={getFieldValue(flight, 'departureCity')}
                      onChange={(e) => handleUpdate(index, 'departureCity', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Arrival Section */}
              <div className="rounded-md bg-gray-100 p-3">
                <h6 className="mb-3 text-xs font-semibold uppercase tracking-wider">
                  Arrival
                </h6>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <Label className="text-xs font-semibold">Date</Label>
                    <Input
                      type="date"
                      value={getFieldValue(flight, 'arrivalDate')}
                      onChange={(e) => handleUpdate(index, 'arrivalDate', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Time</Label>
                    <Input
                      type="time"
                      value={getFieldValue(flight, 'arrivalTime')}
                      onChange={(e) => handleUpdate(index, 'arrivalTime', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Airport Code</Label>
                    <Input
                      type="text"
                      placeholder="GRR"
                      value={getFieldValue(flight, 'arrivalAirport')}
                      onChange={(e) => handleUpdate(index, 'arrivalAirport', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">City</Label>
                    <Input
                      type="text"
                      placeholder="Grand Rapids"
                      value={getFieldValue(flight, 'arrivalCity')}
                      onChange={(e) => handleUpdate(index, 'arrivalCity', e.target.value)}
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
        className="mt-3"
      >
        {loading ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Adding Flight...
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle mr-2"></i>Add a Flight
          </>
        )}
      </Button>
    </div>
  );
};
