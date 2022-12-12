import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Tabs,
  Tab,
  Button
} from 'react-bootstrap';
import { fetchArticles } from './articlesAPI';

const categories = ['visa', 'immigration', 'citizenship', 'tips'];

export const ArticlesPage = () => {
  const articles = useSelector(state => state.articles.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [key, setKey] = useState('visa');
  useEffect (() => {
    dispatch(fetchArticles(key));
  }, [key, dispatch]);
  return (
    <Container>
      <div className='d-flex justify-content-between align-items-start'>
        <Button
          onClick={() => navigate('/')}
          variant="outline-primary"
        >
          Home
        </Button>
        <h1>Articles</h1>
        <Button
          href="https://www.uscis.gov/"
          target="_blank"
          rel="noreferrer"
          variant="outline-secondary"
        >
            USCIS
        </Button>
      </div>
      <Tabs
        className="mb-3"
        onSelect={(key) => setKey(key)}
        fill
      >
        {
          categories.map((category, index) => (
            <Tab key={index} eventKey={category} title={category}>
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
                            rel="noreferrer"
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