'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

interface Feature {
  name: string;
  icon: string;
  description: string;
}

interface FeatureCategory {
  title: string;
  color: string;
  bgGradient: string;
  icon: string;
  features: Feature[];
}

const featureCategories: FeatureCategory[] = [
  {
    title: 'High Priority',
    color: '#667eea',
    bgGradient: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    icon: '⭐',
    features: [
      {
        name: 'Flight Search & Booking',
        icon: '✈️',
        description: 'Search and book flights to your destination with ease'
      },
      {
        name: 'Hotel Search & Booking',
        icon: '🏨',
        description: 'Find and reserve accommodations that suit your budget'
      },
      {
        name: 'Car Search & Booking',
        icon: '🚗',
        description: 'Arrange car rentals for your US travel'
      },
      {
        name: 'Smart Checklist',
        icon: '✅',
        description: 'Stay organized with our interactive trip planning checklist'
      },
      {
        name: 'Community Forums',
        icon: '💬',
        description: 'Connect with other travelers and share experiences'
      },
      {
        name: 'Travel Articles',
        icon: '📚',
        description: 'Learn tips and tricks from experienced travelers'
      },
    ]
  },
  {
    title: 'Low Priority',
    color: '#ff9800',
    bgGradient: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 87, 34, 0.1) 100%)',
    icon: '📋',
    features: [
      {
        name: 'User Profile',
        icon: '👤',
        description: 'Manage your account and personal preferences'
      },
      {
        name: 'Trip Management',
        icon: '📍',
        description: 'View and manage all your saved trips'
      },
      {
        name: 'Static Pages',
        icon: '📄',
        description: 'Information pages like this one'
      },
    ]
  }
];

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <div>
              <h1 className="text-5xl font-bold mb-6" style={{ color: '#667eea' }}>
                Our Features
              </h1>
              <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
                Discover all the powerful tools we've built to make your travel planning effortless
              </p>
            </div>
          </div>

          {/* Feature Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {featureCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div
                  className="p-6 rounded-3xl h-full shadow-sm"
                  style={{
                    background: category.bgGradient,
                    borderTop: `4px solid ${category.color}`,
                  }}
                >
                  <div className="mb-6">
                    <h2 className="font-bold flex items-center gap-4 text-3xl" style={{ color: category.color }}>
                      <span style={{ fontSize: '2rem' }}>{category.icon}</span>
                      {category.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex}>
                        <div
                          className="p-4 rounded-2xl transition-all"
                          style={{
                            background: 'rgba(255, 255, 255, 0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                            e.currentTarget.style.transform = 'translateX(5px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <div className="flex gap-4 items-start">
                            <div style={{ fontSize: '1.5rem' }}>{feature.icon}</div>
                            <div className="flex-1">
                              <h5 className="font-bold mb-1 text-lg" style={{ color: category.color }}>
                                {feature.name}
                              </h5>
                              <p className="text-muted-foreground text-sm mb-0">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="max-w-5xl mx-auto">
              <div
                className="p-8 rounded-3xl shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                <h3 className="text-white font-bold mb-2 text-2xl">Ready to Start Your Journey?</h3>
                <p className="text-white/75">
                  Start planning your unforgettable trip to the United States today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
