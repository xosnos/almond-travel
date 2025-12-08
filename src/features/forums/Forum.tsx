'use client'

import { FC, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { addResponse } from './forumsAPI';
import { updateResponse } from './forumsSlice';
import { ForumResponse } from '../../types';

export const ResponseBuilder: FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const newResponse = useAppSelector((state) => state.forums.response);
  const loading = useAppSelector((state) => state.forums.loading);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const state = (pathname || '').split('/')[2]?.replace(/%20/g, ' ') || '';
  const index = parseInt((pathname || '').split('/')[3] || '0');

  const handleUpdate = (key: string, value: string) => {
    dispatch(updateResponse({ key, value }));
  };

  const handleSubmit = () => {
    if (!user || !newResponse.description.trim()) {
      return;
    }

    const response: Partial<ForumResponse> = {
      content: newResponse.description,
      author: user.email,
      createdAt: new Date().toISOString(),
    };

    dispatch(addResponse({ state, index, response: response as ForumResponse }));
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="mb-4">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="text-lg">Post a Reply</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <textarea
          id="formDescription"
          rows={4}
          placeholder="Share your thoughts or answer..."
          value={newResponse.description}
          onChange={(e) => handleUpdate('description', e.target.value)}
          disabled={loading}
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </CardContent>
      <CardFooter className="bg-muted/50 flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={loading || !newResponse.description.trim()}
        >
          {loading ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Posting...
            </>
          ) : (
            'Post Reply'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const Forum: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const state = (pathname || '').split('/')[2]?.replace(/%20/g, ' ') || '';
  const index = parseInt((pathname || '').split('/')[3] || '0');
  const forum = useAppSelector((state) => state.forums.forums[index]);
  const loading = useAppSelector((state) => state.forums.loading);
  const error = useAppSelector((state) => state.forums.error);

  useEffect(() => {
    if (!forum && !loading) {
      router.push(`/forums/${state}`);
    }
  }, [forum, router, state, loading]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch {
      return dateString;
    }
  };

  if (loading || !forum) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <Spinner size="lg" />
          <p className="mt-4 text-muted-foreground text-lg">Loading forum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <Button
          onClick={() => router.push(`/forums/${state}`)}
          variant="outline"
          size="lg"
        >
          Back
        </Button>
        <h2 className="text-3xl font-bold">{state}</h2>
        <Button
          variant={user ? 'outline' : 'outline'}
          size="lg"
          onClick={() => !user && router.push('/login')}
          disabled={!!user}
        >
          {user ? 'Logged In' : 'Login to Reply'}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Original Post */}
      <Card className="mb-4">
        <CardHeader className="bg-muted/50 border-b">
          <div className="flex justify-between items-center">
            <Badge variant="default" className="text-xs">Original Post</Badge>
            <Badge variant="secondary" className="text-xs">
              {forum.responses?.length || 0} {forum.responses?.length === 1 ? 'Reply' : 'Replies'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="text-3xl font-bold mb-4">{forum.title}</h3>
          <p className="text-lg text-muted-foreground whitespace-pre-wrap">
            {forum.description}
          </p>
        </CardContent>
        <CardFooter className="bg-muted/50">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
              <i className="bi bi-person-circle text-primary text-2xl"></i>
              <div>
                <div className="font-semibold">{forum.author || forum.user || 'Anonymous'}</div>
                <span className="text-sm text-muted-foreground">
                  <i className="bi bi-clock mr-1"></i>
                  {formatDate(forum.createdAt || forum.timePosted || '')}
                </span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Responses Section */}
      {forum.responses && forum.responses.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="bi bi-chat-left-text"></i>
            Responses
          </h4>
          <div className="space-y-3">
            {forum.responses.map((response: ForumResponse, idx: number) => (
              <Card key={response.id || idx}>
                <CardContent className="p-6">
                  <p className="whitespace-pre-wrap">
                    {response.content || response.description}
                  </p>
                </CardContent>
                <CardFooter className="bg-muted/50">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <i className="bi bi-person-circle text-muted-foreground"></i>
                      <span className="font-semibold">{response.author || response.user || 'Anonymous'}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      <i className="bi bi-clock mr-1"></i>
                      {formatDate(response.createdAt || response.timePosted || '')}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Response Form */}
      {user ? (
        <ResponseBuilder />
      ) : (
        <Card className="text-center py-8">
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">You must be logged in to post a reply</p>
            <Button size="lg" onClick={() => router.push('/login')}>
              Login to Reply
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
