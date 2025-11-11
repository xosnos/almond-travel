'use client'

import React, { FC, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  Summary,
  Flights,
  Hotels,
  Cars,
  Activities,
  Checklist,
} from '../../components';
import {
  addTripItem,
  removeTripItem,
  updateTripItem,
} from './tripsSlice';
import { itemBuilder } from '../trip/itemBuilder';
import { updateTrip } from './tripsAPI';
import { TripItem } from '../../types';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Spinner } from '../../components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export const TripPage: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const tripIndex = parseInt((pathname || '').substring(7) || '0');
  const trip = useAppSelector((state) => state.trips.trips[tripIndex]);
  const loading = useAppSelector((state) => state.trips.loading);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Protected route - redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel? Any unsaved changes will be lost.'
    );
    if (confirmCancel) {
      router.push('/trips');
    }
  };

  const handleSave = async () => {
    if (user && trip) {
      setIsSaving(true);
      try {
        const uid = user.uid;
        await dispatch(updateTrip({
          uid,
          tripIndex,
          trip
        })).unwrap();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          router.push('/trips');
        }, 1500);
      } catch (error) {
        console.error('Failed to update trip:', error);
        setIsSaving(false);
      }
    }
  };

  const handleAdd = (type: 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist') => () => {
    dispatch(addTripItem({
      tripIndex,
      type,
      item: itemBuilder[type]
    }));
  };

  const handleRemove = (type: 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist') => (index: number) => {
    dispatch(removeTripItem({
      tripIndex,
      type,
      index
    }));
  };

  const handleUpdate = (type: 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist') => (index: number, key: string, value: string | boolean) => {
    dispatch(updateTripItem({
      tripIndex,
      type,
      index,
      key,
      value
    }));
  };

  const handleSummary = (type: 'name' | 'location', value: string) => {
    dispatch(updateTripItem({
      tripIndex,
      type,
      index: undefined,
      key: undefined,
      value
    }));
  };

  const getSectionIcon = (type: string): string => {
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
      default:
        return '📝';
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto py-12 text-center">
        <Spinner className="mx-auto mb-4" />
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    );
  }

  if (loading && !trip) {
    return (
      <div className="container mx-auto py-12 text-center">
        <Spinner className="mx-auto mb-4" />
        <p className="text-muted-foreground">Loading trip...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div
        className="min-h-screen py-12"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <div className="container mx-auto px-4">
          <Card className="shadow-lg text-center py-12 rounded-2xl border-0">
            <CardContent className="p-12">
              <div className="text-7xl mb-6">
                ❌
              </div>
              <h1 className="text-3xl font-bold mb-4">404: Trip Not Found</h1>
              <p className="text-muted-foreground text-lg mb-6">
                The trip you're looking for doesn't exist or may have been deleted.
              </p>
              <Button
                onClick={() => router.push('/trips')}
                size="lg"
                className="px-8 rounded-full font-semibold"
              >
                ← Back to Trips
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <div className="container mx-auto px-4">
        {/* Success message */}
        {showSuccess && (
          <Alert className="shadow-sm mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              ✅ Trip saved successfully! Redirecting...
            </AlertDescription>
          </Alert>
        )}

        {/* Header */}
        <Card className="mb-6 border-0 shadow-lg rounded-2xl">
          <CardHeader
            className="py-6"
            style={{
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <div className="flex justify-between items-center flex-wrap gap-4">
              <Button
                onClick={handleCancel}
                variant="secondary"
                disabled={isSaving}
                className="px-6 rounded-full font-semibold"
              >
                ← Cancel
              </Button>
              <div className="text-center text-white">
                <h1 className="text-3xl font-bold mb-1">
                  ✈️ {trip.name || 'Edit Trip'}
                </h1>
                <p className="opacity-90">
                  🌎 {trip.location || 'No location'}
                </p>
              </div>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 rounded-full font-semibold bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {isSaving ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  '💾 Save Changes'
                )}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Trip Summary */}
        <Card className="mb-6 border-0 shadow-lg rounded-2xl">
          <CardHeader
            className="py-4"
            style={{
              background: 'linear-gradient(90deg, #667eea15 0%, #764ba215 100%)',
              borderBottom: '2px solid #e9ecef',
            }}
          >
            <h4 className="text-xl font-bold">
              📋 Trip Summary
            </h4>
          </CardHeader>
          <CardContent className="p-6">
            <Summary
              name={trip.name}
              location={trip.location}
              handleUpdate={handleSummary}
            />
          </CardContent>
        </Card>

        {/* Tabs sections */}
        <Card className="shadow-lg rounded-2xl border-0 overflow-hidden">
          <Tabs defaultValue="flights" className="w-full">
            <TabsList className="w-full grid grid-cols-5 bg-gradient-to-r from-purple-50 to-indigo-50 p-2 rounded-none">
              <TabsTrigger value="flights" className="flex items-center gap-2 data-[state=active]:bg-white">
                <span>{getSectionIcon('flights')} Flights</span>
                <Badge className="bg-blue-600">{trip.flights.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex items-center gap-2 data-[state=active]:bg-white">
                <span>{getSectionIcon('hotels')} Hotels</span>
                <Badge className="bg-green-600">{trip.hotels.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="cars" className="flex items-center gap-2 data-[state=active]:bg-white">
                <span>{getSectionIcon('cars')} Cars</span>
                <Badge className="bg-cyan-600">{trip.cars.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="activities" className="flex items-center gap-2 data-[state=active]:bg-white">
                <span>{getSectionIcon('activities')} Activities</span>
                <Badge className="bg-yellow-600">{trip.activities.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="checklist" className="flex items-center gap-2 data-[state=active]:bg-white">
                <span>{getSectionIcon('checklist')} Checklist</span>
                <Badge variant="secondary">{trip.checklist.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flights" className="p-6">
              <Flights
                items={trip.flights as TripItem[]}
                handleAdd={handleAdd('flights')}
                handleRemove={handleRemove('flights')}
                handleUpdate={handleUpdate('flights')}
              />
            </TabsContent>

            <TabsContent value="hotels" className="p-6">
              <Hotels
                items={trip.hotels as TripItem[]}
                handleAdd={handleAdd('hotels')}
                handleRemove={handleRemove('hotels')}
                handleUpdate={handleUpdate('hotels')}
              />
            </TabsContent>

            <TabsContent value="cars" className="p-6">
              <Cars
                items={trip.cars as TripItem[]}
                handleAdd={handleAdd('cars')}
                handleRemove={handleRemove('cars')}
                handleUpdate={handleUpdate('cars')}
              />
            </TabsContent>

            <TabsContent value="activities" className="p-6">
              <Activities
                items={trip.activities as TripItem[]}
                handleAdd={handleAdd('activities')}
                handleRemove={handleRemove('activities')}
                handleUpdate={handleUpdate('activities')}
              />
            </TabsContent>

            <TabsContent value="checklist" className="p-6">
              <Checklist
                items={trip.checklist as TripItem[]}
                handleAdd={handleAdd('checklist')}
                handleRemove={handleRemove('checklist')}
                handleUpdate={handleUpdate('checklist')}
              />
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer actions */}
        <Card className="mt-6 border-0 shadow-lg rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleCancel}
                variant="outline"
                size="lg"
                disabled={isSaving}
                className="px-8 rounded-full font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                size="lg"
                disabled={isSaving}
                className="px-8 rounded-full font-semibold"
              >
                {isSaving ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  '💾 Save Changes'
                )}
              </Button>
            </div>
            <p className="text-muted-foreground mt-4">
              💡 All changes are saved to the cloud
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
