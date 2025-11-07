'use client'

import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Row,
  Col,
  Card,
  Tabs,
  Tab,
  Button,
  Spinner,
  Alert,
  Badge,
} from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchArticles } from './articlesAPI';

const categories: string[] = ['visa', 'immigration', 'citizenship', 'tips'];

const categoryInfo: Record<string, { icon: string; description: string }> = {
  visa: {
    icon: 'bi-passport',
    description: 'Visa application guides and requirements',
  },
  immigration: {
    icon: 'bi-globe-americas',
    description: 'Immigration process and procedures',
  },
  citizenship: {
    icon: 'bi-flag',
    description: 'Citizenship and naturalization information',
  },
  tips: {
    icon: 'bi-lightbulb',
    description: 'Helpful tips and best practices',
  },
};

export const ArticlesPage: FC = () => {
  const articles = useAppSelector((state) => state.articles.articles);
  const loading = useAppSelector((state) => state.articles.loading);
  const error = useAppSelector((state) => state.articles.error);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [key, setKey] = useState<string>('visa');

  useEffect(() => {
    dispatch(fetchArticles(key));
  }, [key, dispatch]);

  const handleTabSelect = (k: string | null) => {
    if (k) {
      setKey(k);
    }
  };

  return (
    <Container className="py-5">
      <div className='d-flex justify-content-between align-items-center mb-5'>
        <Button
          onClick={() => router.push('/')}
          variant="outline-primary"
          size="lg"
        >
          Home
        </Button>
        <h1 className="fw-bold m-0">Articles</h1>
        <Button
          href="https://www.uscis.gov/"
          target="_blank"
          rel="noreferrer"
          variant="outline-secondary"
          size="lg"
        >
          USCIS
        </Button>
      </div>

      <div className="text-center mb-5">
        <p className="text-muted fs-5">
          Explore helpful articles and resources for your immigration journey
        </p>
      </div>

      <Tabs
        activeKey={key}
        onSelect={handleTabSelect}
        className="mb-4 nav-fill"
        variant="pills"
      >
        {categories.map((category) => (
          <Tab
            key={category}
            eventKey={category}
            title={
              <span className="text-capitalize">
                <i className={`${categoryInfo[category].icon} me-2`}></i>
                {category}
              </span>
            }
          >
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold text-capitalize mb-1">{category}</h4>
                  <p className="text-muted mb-0">{categoryInfo[category].description}</p>
                </div>
                {!loading && articles.length > 0 && (
                  <Badge bg="primary" className="badge-modern">
                    {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
                  </Badge>
                )}
              </div>

              {error && (
                <Alert variant="danger" dismissible>
                  <Alert.Heading>Error</Alert.Heading>
                  <p>{error}</p>
                </Alert>
              )}

              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                  <p className="mt-3 text-muted fs-5">Loading articles...</p>
                </div>
              ) : articles.length === 0 ? (
                <Card className="card-modern text-center py-5">
                  <Card.Body>
                    <div className="text-muted mb-3">
                      <i className="bi bi-journal-text" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h3>No Articles Available</h3>
                    <p className="text-muted mb-4">
                      Check back later for new articles in the {category} category.
                    </p>
                  </Card.Body>
                </Card>
              ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                  {articles.map((article, index) => (
                    <Col key={article.id || index}>
                      <Card className="card-modern h-100">
                        {article.imageUrl && (
                          <Card.Img
                            variant="top"
                            src={article.imageUrl}
                            alt={article.title}
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        )}
                        <Card.Body className="d-flex flex-column">
                          <div className="mb-2">
                            <Badge bg="primary" className="badge-modern text-capitalize">
                              {category}
                            </Badge>
                          </div>
                          <Card.Title className="fw-bold mb-3">
                            {article.title}
                          </Card.Title>
                          {article.description && (
                            <Card.Text className="text-muted flex-grow-1">
                              {article.description.length > 120
                                ? `${article.description.substring(0, 120)}...`
                                : article.description}
                            </Card.Text>
                          )}
                          {article.author && (
                            <div className="mb-3 text-muted">
                              <small>
                                <i className="bi bi-person-circle me-1"></i>
                                By {article.author}
                              </small>
                            </div>
                          )}
                          {article.url ? (
                            <Button
                              href={article.url}
                              target="_blank"
                              rel="noreferrer"
                              variant="primary"
                              className="mt-auto w-100"
                            >
                              Read Article
                              <i className="bi bi-box-arrow-up-right ms-2"></i>
                            </Button>
                          ) : (
                            <Button
                              variant="outline-primary"
                              className="mt-auto w-100"
                              disabled
                            >
                              No Link Available
                            </Button>
                          )}
                        </Card.Body>
                        {article.createdAt && (
                          <Card.Footer className="bg-light">
                            <small className="text-muted">
                              <i className="bi bi-clock me-1"></i>
                              {new Date(article.createdAt).toLocaleDateString()}
                            </small>
                          </Card.Footer>
                        )}
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};
