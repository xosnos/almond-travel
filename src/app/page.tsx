'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Plane, ClipboardList, MessageSquare, BookOpen } from 'lucide-react';

interface CardItem {
  title: string;
  image: string;
  alt: string;
  text: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
  gradientFrom: string;
  gradientTo: string;
}

const cards: CardItem[] = [
  {
    title: 'Create New Trip',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Create New Trip',
    text: 'Start booking your next trip to the United States!',
    link: '/new',
    icon: Plane,
    gradientFrom: 'from-green-500',
    gradientTo: 'to-emerald-600',
  },
  {
    title: 'Manage Existing Trip',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1421&q=80',
    alt: 'Manage Existing Trip',
    text: 'Manage your existing trip and see all your bookings!',
    link: '/trips',
    icon: ClipboardList,
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-indigo-600',
  },
  {
    title: 'Forums',
    image: 'https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Forums',
    text: 'Join our community and talk to other travelers about their experiences!',
    link: '/forums',
    icon: MessageSquare,
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-600',
  },
  {
    title: 'Articles',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'Articles',
    text: 'Learn more about traveling to the United States and how to plan your trip!',
    link: '/articles',
    icon: BookOpen,
    gradientFrom: 'from-red-500',
    gradientTo: 'to-pink-600',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-20 px-4">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
          <div className="container mx-auto relative">
            <div className="text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Welcome to Almond Travel
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Your all-in-one platform for planning unforgettable trips to the United States
              </p>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link key={index} href={card.link} className="group">
                  <Card className="h-full overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        className="object-cover brightness-75 group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} opacity-60 group-hover:opacity-70 transition-opacity`} />

                      {/* Card Content Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
                          <Icon className="w-12 h-12 text-white" />
                        </div>
                        <CardTitle className="text-3xl font-bold text-white mb-3">
                          {card.title}
                        </CardTitle>
                        <CardDescription className="text-lg text-white font-medium">
                          {card.text}
                        </CardDescription>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/50 py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Almond Travel?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide everything you need to plan and manage your perfect trip
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Plane className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Easy Planning</h3>
                <p className="text-muted-foreground">
                  Plan your entire trip in one place with our intuitive tools
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                  <MessageSquare className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Community Support</h3>
                <p className="text-muted-foreground">
                  Connect with fellow travelers and share experiences
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <BookOpen className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Expert Guides</h3>
                <p className="text-muted-foreground">
                  Access comprehensive articles and travel tips
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
