import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Container,
  Button,
  Card,
  Modal,
  Form,
} from 'react-bootstrap';
import {
  fetchForums,
  addForum,
} from './forumsAPI';
import {
  updateForum,
  clearForums,
} from './forumsSlice';

const ForumBuilder = ({
  show, handleModal
}) => {
  const user = useSelector(state => state.auth.user);
  const newPost = useSelector(state => state.forums.forum);
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.pathname.split('/')[2].replaceAll('%20', ' ');

  const handleUpdate = (key, value) => {
    dispatch(updateForum({ key, value }));
  }

  const handleSubmit = () => {
    dispatch(addForum({
      state,
      forum: {
        ...newPost,
        user: user.email,
        timePosted: new Date().toLocaleString(),
      }
    }));
    handleModal();
  }
  return (
    <>
      <Modal show={show} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newPost.title}
                onChange={(e) => handleUpdate('title', e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Enter description"
                value={newPost.description}
                onChange={(e) => handleUpdate('description', e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={handleModal}
          >
            Close
          </Button>
          <Button
            variant="outline-warning"
            onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export const Forums = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleModal = () => setShow(!show);
  const user = useSelector(state => state.auth.user);
  const forums = useSelector(state => state.forums.forums);
  const location = useLocation();
  const state = location.pathname.split('/')[2].replaceAll('%20', ' ');

  useEffect(() => {
    dispatch(clearForums());
    dispatch(fetchForums(state));
  }, [dispatch, state]);

  const handleCreatePost = () => {
    if (user) {
      handleModal();
    } else {
      navigate('/login');
    }
  }

  return (
    <Container>
      <div className='d-flex justify-content-between align-items-start'>
        <Button
          onClick={() => navigate('/forums')}
          variant="outline-primary"
        >
          Back
        </Button>
        <h1>{state}</h1>
        <Button
          onClick={handleCreatePost}
          variant={user ? "outline-success" : "outline-primary"}
        >
          {user ? 'Create Post': 'Login to post'}
        </Button>
      </div>
      <ForumBuilder
        show={show}
        handleModal={handleModal}
      />
      {
        forums.map((forum, index) => (
          <div key={index}>
            <LinkContainer to={`/forums/${state}/${index}`} >
              <Card>
                <Card.Body>
                  <Card.Title>{forum.title}</Card.Title>
                  <Card.Text>
                    {forum.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Card.Text className='d-flex justify-content-between'>
                    {forum.timePosted} - {forum.user}
                  </Card.Text>
                </Card.Footer>
              </Card>
            </LinkContainer>
            <br />
          </div>
        ))
      }
    </Container>
  );
}