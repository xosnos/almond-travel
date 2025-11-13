'use client'

import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchTrips, removeTrip } from './tripsAPI';
import { Trip } from '../../types';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Spinner } from '../../components/ui/spinner';

export const TripsPage: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const trips = useAppSelector((state) => state.trips.trips);
  const loading = useAppSelector((state) => state.trips.loading);
  const error = useAppSelector((state) => state.trips.error);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  // Protected route - redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      const uid = user.uid;
      dispatch(fetchTrips(uid));
    }
  }, [user, router, dispatch]);

  const handleView = (index: number) => {
    router.push(`/trips/${index}`);
  };

  const handleRemove = async (index: number) => {
    if (!user) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this trip? This action cannot be undone.'
    );

    if (confirmDelete) {
      setDeletingIndex(index);
      try {
        const uid = user.uid;
        await dispatch(removeTrip({ uid, index })).unwrap();
      } catch (error) {
        console.error('Failed to remove trip:', error);
      } finally {
        setDeletingIndex(null);
      }
    }
  };

  const getTripItemCount = (trip: Trip): number => {
    return (
      trip.flights.length +
      trip.hotels.length +
      trip.cars.length +
      trip.activities.length +
      trip.checklist.length
    );
  };

  if (!user) {
    return (
      <div className="container mx-auto py-12 text-center">
        <Spinner className="mx-auto mb-4" />
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <Card className="mb-6 shadow-lg rounded-2xl border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="px-6 rounded-full font-semibold"
              >
                🏠 Home
              </Button>
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-1">
                  ✈️ My Trips
                </h1>
                <p className="text-muted-foreground">
                  {trips.length} {trips.length === 1 ? 'trip' : 'trips'} planned
                </p>
              </div>
              <Button
                onClick={() => router.push('/new')}
                className="px-6 rounded-full font-semibold bg-green-600 hover:bg-green-700"
              >
                ➕ Create New Trip
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading state */}
        {loading && !deletingIndex ? (
          <Card className="shadow-lg text-center py-12 rounded-2xl border-0">
            <CardContent>
              <Spinner className="mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your trips...</p>
            </CardContent>
          </Card>
        ) : trips.length === 0 ? (
          /* Empty state */
          <Card className="shadow-lg text-center py-12 rounded-2xl border-0">
            <CardContent className="p-12">
              <div className="text-7xl mb-6">
                ✈️
              </div>
              <h3 className="text-2xl font-bold mb-4">No Trips Yet</h3>
              <p className="text-muted-foreground text-lg mb-6">
                Start planning your next adventure by creating your first trip!
              </p>
              <Button
                onClick={() => router.push('/new')}
                size="lg"
                className="px-8 rounded-full font-semibold"
              >
                ➕ Create Your First Trip
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Trip list */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trips.map((trip: Trip, index: number) => {
              const itemCount = getTripItemCount(trip);
              return (
                <Card
                  key={index}
                  className="h-full border-0 shadow-lg overflow-hidden rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                >
                  <CardHeader
                    className="py-4"
                    style={{
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="px-3 py-1 text-sm">
                        Trip #{index + 1}
                      </Badge>
                      <Badge variant="secondary" className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-black">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div onClick={() => handleView(index)} className="cursor-pointer">
                      <h3 className="text-2xl font-bold mb-3">
                        📍 {trip.name || 'Untitled Trip'}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-4">
                        🌎 {trip.location || 'No location set'}
                      </p>

                      {/* Trip details */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {trip.flights.length > 0 && (
                          <Badge className="px-2 py-1 bg-blue-600 hover:bg-blue-700">
                            ✈️ {trip.flights.length}
                          </Badge>
                        )}
                        {trip.hotels.length > 0 && (
                          <Badge className="px-2 py-1 bg-green-600 hover:bg-green-700">
                            🏨 {trip.hotels.length}
                          </Badge>
                        )}
                        {trip.cars.length > 0 && (
                          <Badge className="px-2 py-1 bg-cyan-600 hover:bg-cyan-700">
                            🚗 {trip.cars.length}
                          </Badge>
                        )}
                        {trip.activities.length > 0 && (
                          <Badge className="px-2 py-1 bg-yellow-600 hover:bg-yellow-700">
                            🎯 {trip.activities.length}
                          </Badge>
                        )}
                        {trip.checklist.length > 0 && (
                          <Badge variant="secondary" className="px-2 py-1">
                            ✅ {trip.checklist.length}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => handleView(index)}
                        className="flex-1 rounded-full font-semibold"
                      >
                        👁️ View & Edit
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRemove(index)}
                        disabled={deletingIndex === index}
                        className="rounded-full font-semibold border-red-500 text-red-500 hover:bg-red-50"
                      >
                        {deletingIndex === index ? (
                          <Spinner className="h-4 w-4" />
                        ) : (
                          '🗑️'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
