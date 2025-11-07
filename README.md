# 🌴 Almond Travel

A comprehensive full-stack travel planning platform built with Next.js 15, TypeScript, and Firebase. Almond Travel helps users plan their trips, discover destinations, book travel services, and connect with fellow travelers through community forums.

## 🚀 Features

### Trip Planning
- **Complete Itinerary Builder** - Plan your entire trip with integrated flight, hotel, car rental, and activity bookings
- **Smart Checklist System** - Never forget essentials with customizable pre-trip checklists
- **Trip Summary Dashboard** - View all trip details and bookings in one place
- **SkyScanner Integration** - Real-time flight search and booking capabilities

### Community & Content
- **State-based Forums** - Connect with travelers and share experiences organized by US states
- **Travel Articles** - Browse curated travel guides and destination insights
- **User Profiles** - Manage your trips and engage with the community

### User Experience
- **Modern Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Real-time Updates** - Live data synchronization with Firebase
- **Secure Authentication** - User registration, login, and password recovery
- **Error Boundaries** - Graceful error handling for enhanced stability

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router for server-side rendering and routing
- **React 19** - Latest React with improved hooks and concurrent features
- **TypeScript 5.7** - Type-safe development with latest language features
- **Redux Toolkit** - Centralized state management with modern Redux patterns
- **React Bootstrap** - Responsive UI components and styling
- **SASS** - Advanced CSS preprocessing

### Backend & Services
- **Firebase** - Backend-as-a-Service for authentication and real-time database
- **SkyScanner API** - Flight search and booking integration

### Development Tools
- **ESLint** - Code quality and consistency
- **Next.js Dev Tools** - Hot reload and development optimization

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Firebase account (for backend services)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/almond-travel.git
   cd almond-travel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Copy your Firebase configuration
   - Update `src/lib/firebaseConfig.ts` with your credentials

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on localhost:3000 |
| `npm run build` | Build optimized production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality checks |

## 🏗️ Project Structure

```
almond-travel/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── articles/          # Travel articles
│   │   ├── forums/            # Community forums
│   │   ├── trips/             # Trip management
│   │   ├── login/             # Authentication pages
│   │   └── ...
│   ├── components/            # Reusable React components
│   │   ├── trip/             # Trip-specific components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── features/              # Redux feature modules
│   │   ├── auth/             # Authentication logic
│   │   ├── trips/            # Trip management
│   │   ├── forums/           # Forum functionality
│   │   └── articles/         # Articles feature
│   ├── lib/                   # External service configurations
│   │   └── firebase.ts       # Firebase setup
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   └── store.ts              # Redux store configuration
├── public/                    # Static assets
└── package.json
```

## 🎨 Key Features Breakdown

### Authentication System
- User registration with email verification
- Secure login with password encryption
- Password reset functionality
- Protected routes and user sessions
- User profile management

### Trip Management
- Create and save multiple trips
- Search and book flights via SkyScanner
- Hotel search and recommendations
- Car rental integration
- Activity and attraction discovery
- Comprehensive trip checklist
- Trip summary and overview

### Community Features
- State-specific travel forums
- User discussions and Q&A
- Travel articles and guides
- User profiles and trip sharing

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🚧 Future Enhancements

- [ ] International flight and hotel search
- [ ] Trip collaboration features
- [ ] Budget tracking and expense management
- [ ] Weather integration
- [ ] Mobile app (React Native)
- [ ] Social media sharing
- [ ] Travel insurance integration
- [ ] Currency conversion
- [ ] Multi-language support

## 📱 Responsive Design

Almond Travel is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note:** This project was migrated from Create React App to Next.js 15 with TypeScript for improved performance, SEO, and modern development practices.
