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

export const Activities = ({
  items, handleAdd, handleRemove, handleUpdate
}) => {
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

  return (
    <>
      <ActivitySearchBar
        location={location}
        handleChange={handleChange}
        handleSearch={handleSearch}
      />
      <ActivityMap url={url} />
      <br />
      {
        items.map((activity, index) => (
          <Form key={index}>
            <div className='d-flex justify-content-between'>
              <h3>Activity # {index + 1}</h3>
              <Button className="rounded-circle" variant="outline-danger" onClick={() => handleRemove(index)}>
                ✕
              </Button>
            </div>
            <Row>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupActivityName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='University of Michigan Museum of Art'
                    value={activity.name}
                    onChange={(e) => handleUpdate(index, 'name', e.target.value)}
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
                    onChange={(e) => handleUpdate(index, 'location', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupActivityDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={activity.date}
                    onChange={(e) => handleUpdate(index, 'date', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={6} md={3}>
                <Form.Group controlId="formGroupActivityTime">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={activity.time}
                    onChange={(e) => handleUpdate(index, 'time', e.target.value)}
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
                    onChange={(e) => handleUpdate(index, 'notes', e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br />
          </Form>
        ))
      }
      <Button onClick={() => handleAdd()}>
        Add an Activity
      </Button>
      <br />
    </>
  );
}