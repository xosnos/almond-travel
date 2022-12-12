import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import {
  Button,
  Form,
  Ratio,
  Alert,
} from 'react-bootstrap';

const ActivitySearchBar = ({location, handleChange, handleSearch}) => {
  return (
    <Form>
      <div className="d-flex justify-content-between">
        <Form.Control
          type="text"
          placeholder="Ann Arbor, MI"
          value={location}
          onChange={handleChange}
        />
        <Button
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </Form>
  );
};

const ActivityMap = ({ url }) => {
  const [aspectRatio, setAspectRatio] = useState("21x9");
  useEffect(() => {
    if ($(window).width() < 768) {
      setAspectRatio("1x1");
    } else {
      setAspectRatio("21x9");
    }
  }, [url]);
  if (url) {
    return (
      <Ratio aspectRatio={aspectRatio}>
        <iframe
          title="mapFrame"
          src={url}>
        </iframe>
      </Ratio>
    );
  } else {
    return (
      <Alert variant="primary">
        <Alert.Heading>Looking for activities in the place you're traveling to?</Alert.Heading>
        <p>
          Enter a city name (e.g. Ann Arbor) in the search bar above.
          Then press enter or click the Search button.
          A Google map will be presented with possible activities to do.
        </p>
        <p>
          Feel free to interact the map.
        </p>
      </Alert>
    )
  }
}

export const ActivitySearch = () => {
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
    </>
  )
};