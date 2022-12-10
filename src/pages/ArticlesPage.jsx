import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchArticles } from '../features';

const categories = ['visa', 'immigration', 'citizenship', 'tips'];

export const ArticlesPage = () => {
  const articles = useSelector(state => state.articles.articles);
  const dispatch = useDispatch();
  const [key, setKey] = useState('visa');
  useEffect (() => {
    dispatch(fetchArticles(key));
  }, [key, dispatch]);
  return (
    <Container>
      <h1>Articles</h1>
      <Tabs
        className="mb-3"
        onSelect={(key) => setKey(key)}
        fill
      >
        {
          categories.map((category, index) => (
            <Tab eventKey={category} title={category}>
              {
                articles.map((article, index) => (
                  <Row key={index}>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title>{article.title}</Card.Title>
                          <Card.Link
                            href={article.url}
                            target="_blank"
                          >
                              {article.url}
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                ))
              }
            </Tab>
          ))
        }
      </Tabs>
    </Container>
  );
};