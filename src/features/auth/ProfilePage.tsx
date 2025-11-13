'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppDispatch';
import { handleLogout } from './authAPI';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { AlertCircle } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Protected route logic - redirect to login if not authenticated
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogoutClick = () => {
    dispatch(handleLogout()).then(() => {
      router.push("/login");
    });
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <Spinner size="lg" />
        </main>
      </div>
    );
  }

  // Don't render anything if user is null (will redirect in useEffect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Card className="border shadow-sm">
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-bold text-muted-foreground">
                      Email:
                    </div>
                    <div className="col-span-2">
                      {user.email}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-bold text-muted-foreground">
                      User ID:
                    </div>
                    <div className="col-span-2">
                      <code className="text-muted-foreground text-sm bg-muted px-2 py-1 rounded">{user.uid}</code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => router.push('/trips')}
                >
                  View My Trips
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  className="w-full"
                  onClick={handleLogoutClick}
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
