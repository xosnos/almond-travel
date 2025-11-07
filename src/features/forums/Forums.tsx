'use client'

import React, { FC, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Container,
  Button,
  Card,
  Modal,
  Form,
  Spinner,
  Alert,
  Badge,
} from 'react-bootstrap';
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
    <Modal show={show} onHide={handleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label className="fw-semibold">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a descriptive title"
              value={newPost.title}
              onChange={(e) => handleUpdate('title', e.target.value)}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Share your thoughts, questions, or experiences..."
              value={newPost.description}
              onChange={(e) => handleUpdate('description', e.target.value)}
              disabled={loading}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={handleModal}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading || !newPost.title.trim() || !newPost.description.trim()}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Posting...
            </>
          ) : (
            'Post'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
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
    <Container className="py-5">
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <Button
          onClick={() => router.push('/forums')}
          variant="outline-primary"
          size="lg"
        >
          Back
        </Button>
        <h1 className="fw-bold m-0">{state}</h1>
        <Button
          onClick={handleCreatePost}
          variant={user ? 'success' : 'outline-primary'}
          size="lg"
        >
          {user ? 'Create Post' : 'Login to Post'}
        </Button>
      </div>

      <ForumBuilder show={show} handleModal={handleModal} />

      {error && (
        <Alert variant="danger" dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {loading && !forums.length ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading forums...</p>
        </div>
      ) : forums.length === 0 ? (
        <Card className="card-modern text-center py-5">
          <Card.Body>
            <div className="text-muted mb-3">
              <i className="bi bi-chat-square-text" style={{ fontSize: '4rem' }}></i>
            </div>
            <h3>No Posts Yet</h3>
            <p className="text-muted mb-4">
              Be the first to start a conversation in {state}!
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={handleCreatePost}
            >
              {user ? 'Create First Post' : 'Login to Post'}
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <div className="mb-3">
            <Badge bg="primary" className="badge-modern">
              {forums.length} {forums.length === 1 ? 'Post' : 'Posts'}
            </Badge>
          </div>
          {forums.map((forum: Forum, index: number) => (
            <Link
              href={`/forums/${state}/${index}`}
              key={forum.id || index}
              className="mb-3"
              style={{ textDecoration: 'none' }}
            >
              <Card className="card-modern cursor-pointer">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0 fw-bold">{forum.title}</Card.Title>
                    <Badge bg="secondary" className="badge-modern">
                      {forum.responses?.length || 0} Replies
                    </Badge>
                  </div>
                  <Card.Text className="text-muted mt-2">
                    {forum.description.length > 200
                      ? `${forum.description.substring(0, 200)}...`
                      : forum.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-light">
                  <div className='d-flex justify-content-between align-items-center'>
                    <small className="text-muted">
                      <i className="bi bi-person-circle me-1"></i>
                      {forum.author || forum.user || 'Anonymous'}
                    </small>
                    <small className="text-muted">
                      <i className="bi bi-clock me-1"></i>
                      {formatDate(forum.createdAt || forum.timePosted || '')}
                    </small>
                  </div>
                </Card.Footer>
              </Card>
            </Link>
          ))}
        </>
      )}
    </Container>
  );
};
