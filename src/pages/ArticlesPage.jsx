import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { addCheckList } from '../features/checkList/checkListAPI';
import {
  FlightSearchWidget,
  HotelSearchWidget,
  CarHireWidget
} from '../components';

const articles = [
  {
    title: 'How to Enter the United States | USAGov',
    url: 'https://www.usa.gov/enter-us',
  },
  {
    title: 'How to Immigrate to the United States',
    url: 'https://www.boundless.com/immigration-resources/us-immigration-explained/'
  },
  {
    title: 'Immigrate',
    url: 'https://travel.state.gov/content/travel/en/us-visas/immigrate.html'
  },
]

export const ArticlesPage = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <h1>Articles</h1>
      <FlightSearchWidget />
      <HotelSearchWidget />
      <CarHireWidget />
      {
        articles.map((article, index) => (
          <Row key={index}>
            <Col>
              <h2>{article.title}</h2>
              <h3>{article.url}</h3>
            </Col>
          </Row>
        ))
      }
      <Button onClick={() => dispatch(addCheckList())}>Test</Button>
    </Container>
  );
};