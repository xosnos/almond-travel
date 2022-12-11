import React, { useState }from 'react';
import {
  Button,
  Col,
  Row,
  Form
} from 'react-bootstrap';
import {
  ActivitySearchBar,
  ActivityMap
} from '..';

export const ActivitiesForm = ({ activities, setActivities }) => {
  const [location, setLocation] = useState("");
  const [url, setUrl] = useState(null);
  const handleChange = ({ target }) => setLocation(target.value);
  const handleSearch = (e) => {
    const apiKey = 'AIzaSyB0qdRFw4Xumv1D109bFq65JVA6jhKbdVs';
    const prefix = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=things+to+do+in+`
    const param = (
      location
        .replaceAll(',', '')
        .replace(/\s/g, '+')
    );
    setUrl(prefix + param);
  }

  const addActivity = () => {
    setActivities([...activities, {
      id: activities.length,
      name: '',
      location: '',
      date: '',
      time: '',
      notes: '',
    }]);
  }

  const removeActivity = () => {
    const newActivities = [...activities];
    newActivities.pop();
    setActivities(newActivities);
  }

  const updateActivity = (index, key, value) => {
    const newActivities = [...activities];
    newActivities[index][key] = value;
    setActivities(newActivities);
  }

  return (
    <>
      <h2>Search for Activities</h2>
      <ActivitySearchBar
        location={location}
        handleChange={handleChange}
        handleSearch={handleSearch}
      />
      <ActivityMap url={url} />
      <h2>Things to do</h2>
      {
        activities.map((activity, index) => (
          <Form key={index}>
            <h3>Activity # {index + 1}</h3>
            <Row>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupActivityName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='University of Michigan Museum of Art'
                    value={activity.name}
                    onChange={(e) => updateActivity(index, 'name', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupActivityLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='525 S State St, Ann Arbor, MI 48109'
                    value={activity.location}
                    onChange={(e) => updateActivity(index, 'location', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupActivityDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={activity.date}
                    onChange={(e) => updateActivity(index, 'date', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupActivityTime">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={activity.time}
                    onChange={(e) => updateActivity(index, 'time', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Form.Group controlId="formGroupActivityNotes">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Don't forget to check out the cafe! It closes at 5pm"
                    rows={1}
                    value={activity.notes}
                    onChange={(e) => updateActivity(index, 'notes', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />
          </Form>
        ))
      }
      <div className="d-flex justify-content-between">
        <Button variant="success" onClick={addActivity}>Add an Activity</Button>
        {
          activities.length ? (
            <Button variant="danger" onClick={removeActivity}>
              Remove Activity
            </Button>
          ) : null
        }
      </div>
      <br />
    </>
  );
}