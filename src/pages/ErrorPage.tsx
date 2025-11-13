'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.back()}
            size="lg"
          >
            Go Back
          </Button>
          <Button
            variant="default"
            onClick={() => router.push('/')}
            size="lg"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
