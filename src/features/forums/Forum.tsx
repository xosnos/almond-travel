'use client'

import React, { FC, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Container,
  Button,
  Card,
  Form,
  Spinner,
  Alert,
  Badge,
} from 'react-bootstrap';
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
  const state = pathname.split('/')[2].replaceAll('%20', ' ');
  const index = parseInt(pathname.split('/')[3]);

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
    <Card className="card-modern mb-4">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">Post a Reply</h5>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group controlId="formDescription">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Share your thoughts or answer..."
              value={newResponse.description}
              onChange={(e) => handleUpdate('description', e.target.value)}
              disabled={loading}
            />
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer className="bg-light">
        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={loading || !newResponse.description.trim()}
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
              'Post Reply'
            )}
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export const Forum: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const state = pathname.split('/')[2].replaceAll('%20', ' ');
  const index = parseInt(pathname.split('/')[3]);
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
      <Container className="py-5">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3 text-muted fs-5">Loading forum...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <Button
          onClick={() => router.push(`/forums/${state}`)}
          variant="outline-primary"
          size="lg"
        >
          Back
        </Button>
        <h2 className="fw-bold m-0">{state}</h2>
        <Button
          variant={user ? 'outline-secondary' : 'outline-primary'}
          size="lg"
          onClick={() => !user && router.push('/login')}
          disabled={!!user}
        >
          {user ? 'Logged In' : 'Login to Reply'}
        </Button>
      </div>

      {error && (
        <Alert variant="danger" dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {/* Original Post */}
      <Card className="card-modern mb-4">
        <Card.Header className="bg-light border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <Badge bg="primary" className="badge-modern">Original Post</Badge>
            <Badge bg="secondary" className="badge-modern">
              {forum.responses?.length || 0} {forum.responses?.length === 1 ? 'Reply' : 'Replies'}
            </Badge>
          </div>
        </Card.Header>
        <Card.Body className="p-4">
          <Card.Title className="fs-3 fw-bold mb-3">{forum.title}</Card.Title>
          <Card.Text className="fs-5 text-secondary" style={{ whiteSpace: 'pre-wrap' }}>
            {forum.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="bg-light">
          <div className='d-flex justify-content-between align-items-center'>
            <div className="d-flex align-items-center">
              <i className="bi bi-person-circle me-2 text-primary" style={{ fontSize: '1.5rem' }}></i>
              <div>
                <div className="fw-semibold">{forum.author || forum.user || 'Anonymous'}</div>
                <small className="text-muted">
                  <i className="bi bi-clock me-1"></i>
                  {formatDate(forum.createdAt || forum.timePosted || '')}
                </small>
              </div>
            </div>
          </div>
        </Card.Footer>
      </Card>

      {/* Responses Section */}
      {forum.responses && forum.responses.length > 0 && (
        <div className="mb-4">
          <h4 className="fw-bold mb-3">
            <i className="bi bi-chat-left-text me-2"></i>
            Responses
          </h4>
          {forum.responses.map((response, idx) => (
            <Card key={response.id || idx} className="card-modern mb-3">
              <Card.Body className="p-4">
                <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                  {response.content || response.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-light">
                <div className='d-flex justify-content-between align-items-center'>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person-circle me-2 text-secondary"></i>
                    <span className="fw-semibold">{response.author || response.user || 'Anonymous'}</span>
                  </div>
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i>
                    {formatDate(response.createdAt || response.timePosted || '')}
                  </small>
                </div>
              </Card.Footer>
            </Card>
          ))}
        </div>
      )}

      {/* Response Form */}
      {user ? (
        <ResponseBuilder />
      ) : (
        <Card className="card-modern text-center py-4">
          <Card.Body>
            <p className="text-muted mb-3">You must be logged in to post a reply</p>
            <Button variant="primary" size="lg" onClick={() => router.push('/login')}>
              Login to Reply
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};
