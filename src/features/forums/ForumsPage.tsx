'use client'

import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { states } from './states';

export const ForumsPage: FC = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <Button
          onClick={() => router.push('/')}
          variant="outline"
          size="lg"
        >
          Home
        </Button>
        <h1 className="text-4xl font-bold text-center">Forums</h1>
        <div className="w-24"></div>
      </div>

      <div className="text-center mb-8">
        <p className="text-muted-foreground text-lg mb-4">
          Select a state to view community discussions and connect with others
        </p>
        <Badge variant="default" className="text-sm px-3 py-1">
          {states.length} States Available
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {states.map((state) => (
          <Link key={state} href={`/forums/${state}`} className="no-underline">
            <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center justify-center p-6 min-h-[120px]">
                <h3 className="text-lg font-semibold text-center">
                  {state}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
