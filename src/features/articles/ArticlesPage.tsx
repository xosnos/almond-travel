'use client'

import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchArticles } from './articlesAPI';
import { Article } from '../../types';

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

  const handleTabChange = (value: string) => {
    setKey(value);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <Button
          onClick={() => router.push('/')}
          variant="outline"
          size="lg"
        >
          Home
        </Button>
        <h1 className="text-4xl font-bold">Articles</h1>
        <Button
          onClick={() => window.open('https://www.uscis.gov/', '_blank', 'noopener,noreferrer')}
          variant="outline"
          size="lg"
        >
          USCIS
        </Button>
      </div>

      <div className="text-center mb-8">
        <p className="text-muted-foreground text-lg">
          Explore helpful articles and resources for your immigration journey
        </p>
      </div>

      <Tabs value={key} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              <i className={`${categoryInfo[category].icon} mr-2`}></i>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-2xl font-bold capitalize mb-1">{category}</h4>
                <p className="text-muted-foreground">{categoryInfo[category].description}</p>
              </div>
              {!loading && articles.length > 0 && (
                <Badge variant="default" className="text-sm px-3 py-1">
                  {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
                </Badge>
              )}
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="text-center py-12">
                <Spinner size="lg" />
                <p className="mt-4 text-muted-foreground text-lg">Loading articles...</p>
              </div>
            ) : articles.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent className="space-y-4">
                  <div className="text-muted-foreground">
                    <i className="bi bi-journal-text" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h3 className="text-2xl font-bold">No Articles Available</h3>
                  <p className="text-muted-foreground">
                    Check back later for new articles in the {category} category.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article: Article, index: number) => (
                  <Card key={article.id || index} className="h-full flex flex-col">
                    {article.imageUrl && (
                      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="flex-1 flex flex-col p-6">
                      <div className="mb-3">
                        <Badge variant="default" className="text-xs capitalize">
                          {category}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-3">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="text-muted-foreground flex-1 mb-4">
                          {article.description.length > 120
                            ? `${article.description.substring(0, 120)}...`
                            : article.description}
                        </p>
                      )}
                      {article.author && (
                        <div className="mb-4 text-muted-foreground text-sm">
                          <i className="bi bi-person-circle mr-1"></i>
                          By {article.author}
                        </div>
                      )}
                      {article.url ? (
                        <Button
                          onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
                          className="w-full mt-auto"
                        >
                          Read Article
                          <i className="bi bi-box-arrow-up-right ml-2"></i>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full mt-auto"
                          disabled
                        >
                          No Link Available
                        </Button>
                      )}
                    </CardContent>
                    {article.createdAt && (
                      <CardFooter className="bg-muted/50 px-6 py-3">
                        <span className="text-sm text-muted-foreground">
                          <i className="bi bi-clock mr-1"></i>
                          {new Date(article.createdAt).toLocaleDateString()}
                        </span>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
