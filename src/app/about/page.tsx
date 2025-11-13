'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="mb-12 flex items-center">
            <div className="w-full text-center mb-8">
              <h1 className="text-5xl font-bold mb-6" style={{ color: '#667eea' }}>
                About Almond Travel
              </h1>
              <div className="mx-auto max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  Almond Travel is a beginner-friendly travel planning application
                  specifically designed for first-time travelers to the United States.
                </p>
              </div>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="mb-12">
            <div
              className="p-8 rounded-3xl shadow-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                borderLeft: '4px solid #667eea',
              }}
            >
              <h3 className="font-bold mb-4 text-2xl" style={{ color: '#667eea' }}>The Problem We Solve</h3>
              <p className="text-lg mb-4">
                Currently, planning a trip involves multiple steps across different platforms:
              </p>
              <ul className="list-none space-y-2">
                <li>✈️ <strong>Flights</strong> - booked on one platform</li>
                <li>🏨 <strong>Hotels</strong> - booked on another</li>
                <li>🍽️ <strong>Restaurants & Attractions</strong> - require painstaking research across multiple web sources</li>
              </ul>
              <p className="text-lg mt-6 mb-0">
                <strong>Almond Travel simplifies this process</strong> by providing a single platform for all your travel needs.
                Beyond planning, we offer forums for connecting with other travelers and articles about US travel tips.
              </p>
            </div>
          </div>

          {/* History Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-12 items-center">
            <div className="text-center">
              <Image
                src="https://ece.engin.umich.edu/wp-content/uploads/sites/4/2019/08/north-campus-768x512.jpg"
                alt="University of Michigan North Campus"
                width={768}
                height={512}
                className="rounded-3xl shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h2 className="font-bold mb-6 text-3xl" style={{ color: '#667eea' }}>Our Journey</h2>
              <div className="mb-6">
                <p className="text-lg text-muted-foreground">
                  <strong className="text-foreground">Almond Travel</strong> started as a capstone project by The Almonds Dev Team (5 CS students)
                  for the University of Michigan's Human-Centered Software Design and Development course (EECS 497).
                </p>
              </div>
              <div className="mb-6">
                <p className="text-lg text-muted-foreground">
                  The project's emphasis was on the design process, challenging the team to consider users from different perspectives.
                  Since all team members are US residents who don't frequently travel, they focused on users visiting the United States for the first time.
                </p>
              </div>
              <div>
                <p className="text-lg text-muted-foreground">
                  Although the initial project was functional in Winter 2022, it required mocked data and had backend stability issues.
                  In Fall 2022, team member Steven Nguyen (xosnos) continued the project to refine core features and migrate the backend to Firebase for long-term stability.
                </p>
              </div>
            </div>
          </div>

          {/* Future Plans Section */}
          <div className="mb-12">
            <div className="max-w-5xl mx-auto">
              <div
                className="p-8 rounded-3xl shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(56, 142, 60, 0.1) 100%)',
                  borderLeft: '4px solid #4caf50',
                }}
              >
                <h2 className="font-bold mb-4 text-3xl" style={{ color: '#4caf50' }}>Future Roadmap</h2>
                <p className="text-lg text-muted-foreground mb-0">
                  Future plans include expanding forum features, adding more articles, and continuously improving the user experience.
                  The application is actively in development and we're committed to making travel planning accessible to everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <div className="max-w-5xl mx-auto">
              <h3 className="font-bold mb-4 text-2xl" style={{ color: '#667eea' }}>Get In Touch</h3>
              <p className="text-lg text-muted-foreground">
                Have questions or feedback? We'd love to hear from you! Feel free to reach out through the contact form in our navigation menu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
