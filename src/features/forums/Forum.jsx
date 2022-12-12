import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Button,
  Card,
  Form,
} from 'react-bootstrap';
import {
  addResponse
} from './forumsAPI';
import {
  updateResponse,
} from './forumsSlice';

export const ResponseBuilder = () => {
  const user = useSelector(state => state.auth.user);
  const newResponse = useSelector(state => state.forums.response);
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.pathname.split('/')[2].replaceAll('%20', ' ');
  const index = location.pathname.split('/')[3];

  const handleUpdate = (key, value) => {
    dispatch(updateResponse({ key, value }));
  }

  const handleSubmit = () => {
    dispatch(addResponse({
      state,
      index,
      response: {
        ...newResponse,
        user: user.email,
        timePosted: new Date().toLocaleString(),
      }
    }));
  }

  return user ? (
    <Card>
      <Card.Body>
        <Form.Group controlId="formDescription">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Enter a response"
            value={newResponse.description}
            onChange={(e) => handleUpdate('description', e.target.value)}
          />
        </Form.Group>
        <br />
        <Button
          variant="outline-warning"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Card.Body>
    </Card>
  ) : (
    null
  )
}

export const Forum = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const state = location.pathname.split('/')[2].replaceAll('%20', ' ');
  const index = location.pathname.split('/')[3];
  const forum = useSelector(state => state.forums.forums[index]);

  useEffect (() => {
    if (!forum) {
      navigate(`/forums/${state}`);
    }
  }, [forum, navigate, state]);

  return (
    <Container>
      <div className='d-flex justify-content-between align-items-start'>
        <Button
          onClick={() => navigate(`/forums/${state}`)}
          variant="outline-primary"
        >
          Back
        </Button>
        <h1>{state}</h1>
        <Button
          variant={user ? "white" : "outline-primary"}
          onClick={() => navigate('/login')}
        >
          {user ? '' : 'Login to post'}
        </Button>
      </div>
      {
        forum ? (
          <>          
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
            <br />
            {
              forum.responses.map((response, index) => (
                <div key={index} >
                  <Card>
                    <Card.Body>
                      <Card.Text>
                        {response.description}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Card.Text className='d-flex justify-content-between'>
                        {response.timePosted} - {response.user}
                      </Card.Text>
                    </Card.Footer>
                  </Card>
                  <br />
                </div>
              ))
            }
            <ResponseBuilder />
          </>
        ) : (
          <h2>Loading...</h2>
        )
      }

    </Container>
  );
}