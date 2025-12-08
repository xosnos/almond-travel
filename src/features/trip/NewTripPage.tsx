'use client'

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { NewTripForm } from './NewTripForm';
import { clearTrip } from './tripSlice';
import { addTrip } from '../trips/tripsAPI';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Spinner } from '../../components/ui/spinner';

type FormType = 'flights' | 'hotels' | 'cars' | 'activities' | 'checklist' | 'summary';

export const NewTripPage: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [now, setNow] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);
  const trip = useAppSelector((state) => state.trip);
  const loading = useAppSelector((state) => state.trips.loading);

  // Protected route - redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleBack = () => {
    if (now === 0) {
      dispatch(clearTrip());
      router.push('/');
    } else {
      setNow(now - 20);
    }
  };

  const handleNext = async () => {
    if (now === 100) {
      if (user && user.uid) {
        setIsSubmitting(true);
        try {
          await dispatch(addTrip({
            uid: user.uid,
            trip: trip,
          })).unwrap();
          dispatch(clearTrip());
          router.push('/trips');
        } catch (error) {
          console.error('Failed to add trip:', error);
          setIsSubmitting(false);
        }
      } else {
        router.push('/login');
      }
    } else {
      setNow(now + 20);
    }
  };

  const renderForm = (): FormType => {
    switch (now) {
      case 0:
        return 'flights';
      case 20:
        return 'hotels';
      case 40:
        return 'cars';
      case 60:
        return 'activities';
      case 80:
        return 'checklist';
      default:
        return 'summary';
    }
  };

  const getSectionTitle = (): string => {
    const type = renderForm();
    return type.charAt(0).toUpperCase() + type.slice(1);
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
    <div className="min-h-screen py-12" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container mx-auto px-4">
        <Card
          className="shadow-lg border-0 overflow-hidden rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
          }}
        >
          <CardHeader
            className="py-6"
            style={{
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <div className="flex justify-between items-center">
              <Button
                onClick={handleBack}
                variant="secondary"
                disabled={isSubmitting || loading}
                className="px-6 rounded-full font-semibold"
              >
                {now === 0 ? '🏠 Home' : '← Back'}
              </Button>
              <h1 className="text-white text-3xl font-bold">
                ✈️ Plan Your Trip
              </h1>
              <Button
                onClick={handleNext}
                disabled={isSubmitting || loading}
                className={`px-6 rounded-full font-semibold ${now === 100 ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : ''}`}
              >
                {isSubmitting || loading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  now === 100 ? (user ? '📝 Submit Trip' : '🔐 Login to Submit') : 'Next →'
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Progress section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground font-semibold">Progress</span>
                <Badge>{now}% Complete</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${now < 40 ? 'bg-red-500' : now < 80 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                  style={{ width: `${now}%` }}
                />
              </div>
            </div>

            {/* Current section indicator */}
            <div className="text-center mb-6">
              <h3 className="font-bold text-primary text-2xl mb-1">
                {getSectionTitle()}
              </h3>
              <p className="text-muted-foreground">
                Step {(now / 20) + 1} of 6
              </p>
            </div>

            {/* Form content */}
            <div className="px-3 min-h-[400px]">
              {loading ? (
                <div className="text-center py-12">
                  <Spinner className="mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              ) : (
                <NewTripForm type={renderForm()} />
              )}
            </div>
          </CardContent>

          <CardFooter className="text-center py-4 bg-gray-50 border-t-2">
            <p className="text-muted-foreground text-sm">
              💡 Tip: You can always come back and edit your trip later
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
