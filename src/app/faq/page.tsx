'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon: string;
}

const faqItems: FaqItem[] = [
  {
    id: 'account',
    question: 'How do I use my account?',
    answer: `First, either log in to your existing account or sign up to create a new account by clicking the link in the navigation bar at the top of the screen. After doing this, you will be able to book hotels and flights, use our checklist and forums features, and view your account information.`,
    icon: '👤'
  },
  {
    id: 'flight-booking',
    question: 'How do I book a flight only?',
    answer: `The main purpose of this application is to guide you in booking an entire trip to the United States. This is the main difference between this application and other flight booking applications. To book a flight, you must first create a trip. To do this, click the "New Trip" link in the navigation bar or the Create New Trip card on the home page. It's recommended you follow through all the steps in the trip creation process, but you can skip the hotel booking step if you only want to book a flight.`,
    icon: '✈️'
  },
  {
    id: 'payments',
    question: 'Will I be making any payments through the app?',
    answer: `No. We do not handle any payments. We only provide you with links to the websites of our partners, where you can complete your bookings and make your payments. We do not keep track of your credit card information.`,
    icon: '💳'
  },
  {
    id: 'data',
    question: 'What data do you keep track of?',
    answer: `We only keep track of the data you provide us, including your email address, inputs you provide in the trip creation process, and any posts/responses you make in the forums. We do not keep track of your password, and we do not sell your data to third parties.`,
    icon: '🔐'
  },
];

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleOpen = (id: string): void => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <div className="py-12" style={{ background: 'linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)' }}>
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <div>
              <h1 className="text-5xl font-bold mb-6" style={{ color: '#667eea' }}>
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
                Find answers to common questions about Almond Travel and how to get the most out of our platform
              </p>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqItems.map((item) => (
                <Card
                  key={item.id}
                  className="shadow-sm border-0 overflow-hidden transition-all duration-300"
                  style={{
                    background: 'white',
                  }}
                >
                  <CardHeader
                    onClick={() => toggleOpen(item.id)}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      background: openId === item.id
                        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                        : 'white',
                      borderBottom: openId === item.id ? '2px solid #667eea' : '1px solid #e5e7eb',
                      padding: '1.5rem',
                    }}
                    onMouseEnter={(e) => {
                      if (openId !== item.id) {
                        e.currentTarget.style.background = 'rgba(102, 126, 234, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (openId !== item.id) {
                        e.currentTarget.style.background = 'white';
                      }
                    }}
                  >
                    <div className="flex items-center gap-4 mb-0">
                      <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                      <div className="flex-1">
                        <h5
                          className="font-bold mb-0 text-xl"
                          style={{ color: '#667eea' }}
                        >
                          {item.question}
                        </h5>
                      </div>
                      <span
                        className="transition-transform duration-300"
                        style={{
                          fontSize: '1.25rem',
                          color: '#667eea',
                          transform: openId === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      >
                        ▼
                      </span>
                    </div>
                  </CardHeader>

                  <div
                    className="transition-all duration-300 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: openId === item.id ? '500px' : '0',
                      opacity: openId === item.id ? 1 : 0,
                    }}
                  >
                    <CardContent className="pt-6 pb-6">
                      <p className="text-muted-foreground text-lg mb-0">
                        {item.answer}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div
                className="p-8 rounded-3xl shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                <h3 className="text-white font-bold mb-2 text-2xl">Didn't find your answer?</h3>
                <p className="text-white/75">
                  Check out our articles section or reach out to our support team through the navigation menu
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
