import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { TripItem } from '../../types/index';

interface CarsProps {
  items: TripItem[];
  handleAdd: () => void;
  handleRemove: (index: number) => void;
  handleUpdate: (index: number, field: string, value: string) => void;
  loading?: boolean;
  error?: string | null;
}

export const Cars: React.FC<CarsProps> = ({
  items,
  handleAdd,
  handleRemove,
  handleUpdate,
  loading = false,
  error = null
}) => {
  const getFieldValue = (car: TripItem, field: string): string => {
    return car[field] ?? '';
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-primary">Cars</h2>

      {error && (
        <div className="relative mb-4 rounded border border-red-400 bg-red-50 px-4 py-3 text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="cars-container">
        {items.length === 0 ? (
          <div className="mb-3 rounded border border-blue-400 bg-blue-50 px-4 py-3 text-blue-700">
            No cars added yet. Click "Add a Car" to get started!
          </div>
        ) : (
          items.map((car, index) => (
            <div
              key={index}
              className="mb-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-300"
              style={{ borderLeft: '4px solid #fd7e14' }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="m-0 text-lg text-gray-600">
                  <i className="bi bi-car-front-fill text-orange-500 mr-2"></i>Car #{index + 1}
                </h4>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemove(index)}
                  disabled={loading}
                  className="h-9 w-9 rounded-full border-red-500 text-red-500 hover:bg-red-50"
                  title="Remove car"
                >
                  ✕
                </Button>
              </div>

              {/* Pick Up Section */}
              <div className="mb-3 rounded-md bg-gray-100 p-3">
                <h6 className="mb-3 text-xs font-semibold uppercase tracking-wider">
                  Pick Up
                </h6>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  <div>
                    <Label className="text-xs font-semibold">Date</Label>
                    <Input
                      type="date"
                      value={getFieldValue(car, 'pickUpDate')}
                      onChange={(e) => handleUpdate(index, 'pickUpDate', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Time</Label>
                    <Input
                      type="time"
                      value={getFieldValue(car, 'pickUpTime')}
                      onChange={(e) => handleUpdate(index, 'pickUpTime', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-xs font-semibold">Location</Label>
                    <Input
                      type="text"
                      placeholder="LAX Parking Garage A"
                      value={getFieldValue(car, 'pickUpLocation')}
                      onChange={(e) => handleUpdate(index, 'pickUpLocation', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Return Section */}
              <div className="mb-3 rounded-md bg-gray-100 p-3">
                <h6 className="mb-3 text-xs font-semibold uppercase tracking-wider">
                  Return
                </h6>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  <div>
                    <Label className="text-xs font-semibold">Date</Label>
                    <Input
                      type="date"
                      value={getFieldValue(car, 'returnDate')}
                      onChange={(e) => handleUpdate(index, 'returnDate', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold">Time</Label>
                    <Input
                      type="time"
                      value={getFieldValue(car, 'returnTime')}
                      onChange={(e) => handleUpdate(index, 'returnTime', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <Label className="text-xs font-semibold">Location</Label>
                    <Input
                      type="text"
                      placeholder="Hae Jang Chon KBBQ Restaurant in Koreatown"
                      value={getFieldValue(car, 'returnLocation')}
                      onChange={(e) => handleUpdate(index, 'returnLocation', e.target.value)}
                      disabled={loading}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="rounded-md bg-gray-100 p-3">
                <h6 className="mb-3 text-xs font-semibold uppercase tracking-wider">
                  Vehicle Details
                </h6>
                <div>
                  <Label className="text-xs font-semibold">Make, Model & Year</Label>
                  <Input
                    type="text"
                    placeholder="Tesla Model S 2023"
                    value={getFieldValue(car, 'carMakeModelYear')}
                    onChange={(e) => handleUpdate(index, 'carMakeModelYear', e.target.value)}
                    disabled={loading}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Button
        onClick={handleAdd}
        disabled={loading}
        className="mt-3 bg-orange-500 hover:bg-orange-600"
      >
        {loading ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Adding Car...
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle mr-2"></i>Add a Car
          </>
        )}
      </Button>
    </div>
  );
};
