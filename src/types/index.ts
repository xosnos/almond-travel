// User types
export interface User {
  email: string;
  uid: string;
}

export interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
}

// Trip types
export interface TripItem {
  id: string;
  name: string;
  details?: string;
  date?: string;
  time?: string;
  location?: string;
  price?: string;
  url?: string;
  notes?: string;
  [key: string]: any;
}

export interface Trip {
  id?: string;
  name: string;
  location: string;
  flights: TripItem[];
  hotels: TripItem[];
  cars: TripItem[];
  activities: TripItem[];
  checklist: TripItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TripsState {
  trips: Trip[];
  loading: boolean;
  error: string | null;
}

export interface TripState {
  currentTrip: Trip;
  loading: boolean;
  error: string | null;
}

// Forum types
export interface ForumResponse {
  id?: string;
  author?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  // Backward compatibility fields
  user?: string;
  description?: string;
  timePosted?: string;
  [key: string]: any;
}

export interface Forum {
  id?: string;
  state?: string;
  title: string;
  description: string;
  author?: string;
  responses: ForumResponse[];
  createdAt?: string;
  updatedAt?: string;
  // Backward compatibility fields
  user?: string;
  timePosted?: string;
  [key: string]: any;
}

export interface ForumsState {
  forums: Forum[];
  currentForum: Forum | null;
  loading: boolean;
  error: string | null;
}

// Article types
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ArticlesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

// US States
export interface USState {
  name: string;
  abbreviation: string;
}

// Component Props
export interface NavigationProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface TripFormData {
  name: string;
  location: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

// Redux types
export interface RootState {
  auth: AuthState;
  trips: TripsState;
  trip: TripState;
  forums: ForumsState;
  articles: ArticlesState;
}
