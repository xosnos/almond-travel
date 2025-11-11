'use client'

import React, { FC, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  fetchForums,
  addForum,
} from './forumsAPI';
import {
  updateForum,
  clearForums,
} from './forumsSlice';
import { Forum } from '../../types';

interface ForumBuilderProps {
  show: boolean;
  handleModal: () => void;
}

const ForumBuilder: FC<ForumBuilderProps> = ({ show, handleModal }) => {
  const user = useAppSelector((state) => state.auth.user);
  const newPost = useAppSelector((state) => state.forums.forum);
  const loading = useAppSelector((state) => state.forums.loading);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const state = (pathname || '').split('/')[2]?.replace(/%20/g, ' ') || '';

  const handleUpdate = (key: string, value: string) => {
    dispatch(updateForum({ key, value }));
  };

  const handleSubmit = () => {
    if (!user || !newPost.title.trim() || !newPost.description.trim()) {
      return;
    }

    const forum: Partial<Forum> = {
      title: newPost.title,
      description: newPost.description,
      author: user.email,
      state,
      responses: [],
      createdAt: new Date().toISOString(),
    };

    dispatch(addForum({ state, forum: forum as Forum }));
    handleModal();
  };

  return (
    <Sheet open={show} onOpenChange={handleModal}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Post</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="formTitle" className="font-semibold">Title</Label>
            <Input
              id="formTitle"
              type="text"
              placeholder="Enter a descriptive title"
              value={newPost.title}
              onChange={(e) => handleUpdate('title', e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="formDescription" className="font-semibold">Description</Label>
            <textarea
              id="formDescription"
              rows={5}
              placeholder="Share your thoughts, questions, or experiences..."
              value={newPost.description}
              onChange={(e) => handleUpdate('description', e.target.value)}
              disabled={loading}
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <SheetFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleModal}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || !newPost.title.trim() || !newPost.description.trim()}
          >
            {loading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Posting...
              </>
            ) : (
              'Post'
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export const Forums: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleModal = () => setShow(!show);
  const user = useAppSelector((state) => state.auth.user);
  const forums = useAppSelector((state) => state.forums.forums);
  const loading = useAppSelector((state) => state.forums.loading);
  const error = useAppSelector((state) => state.forums.error);
  const pathname = usePathname();
  const state = (pathname || '').split('/')[2]?.replace(/%20/g, ' ') || '';

  useEffect(() => {
    dispatch(clearForums());
    dispatch(fetchForums(state));
  }, [dispatch, state]);

  const handleCreatePost = () => {
    if (user) {
      handleModal();
    } else {
      router.push('/login');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <Button
          onClick={() => router.push('/forums')}
          variant="outline"
          size="lg"
        >
          Back
        </Button>
        <h1 className="text-3xl font-bold">{state}</h1>
        <Button
          onClick={handleCreatePost}
          variant={user ? 'default' : 'outline'}
          size="lg"
        >
          {user ? 'Create Post' : 'Login to Post'}
        </Button>
      </div>

      <ForumBuilder show={show} handleModal={handleModal} />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && !forums.length ? (
        <div className="text-center py-12">
          <Spinner size="lg" />
          <p className="mt-4 text-muted-foreground">Loading forums...</p>
        </div>
      ) : forums.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <div className="text-muted-foreground">
              <i className="bi bi-chat-square-text" style={{ fontSize: '4rem' }}></i>
            </div>
            <h3 className="text-2xl font-bold">No Posts Yet</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to start a conversation in {state}!
            </p>
            <Button
              size="lg"
              onClick={handleCreatePost}
            >
              {user ? 'Create First Post' : 'Login to Post'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="mb-4">
            <Badge variant="default" className="text-sm px-3 py-1">
              {forums.length} {forums.length === 1 ? 'Post' : 'Posts'}
            </Badge>
          </div>
          <div className="space-y-4">
            {forums.map((forum: Forum, index: number) => (
              <Link
                href={`/forums/${state}/${index}`}
                key={forum.id || index}
                className="block no-underline"
              >
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{forum.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {forum.responses?.length || 0} Replies
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">
                      {forum.description.length > 200
                        ? `${forum.description.substring(0, 200)}...`
                        : forum.description}
                    </p>
                  </CardContent>
                  <CardFooter className="bg-muted/50 px-6 py-3">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm text-muted-foreground">
                        <i className="bi bi-person-circle mr-1"></i>
                        {forum.author || forum.user || 'Anonymous'}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        <i className="bi bi-clock mr-1"></i>
                        {formatDate(forum.createdAt || forum.timePosted || '')}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
