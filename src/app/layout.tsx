import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.scss';
import { StoreProvider } from './providers/StoreProvider';
import { AuthProvider } from './providers/AuthProvider';

export const metadata: Metadata = {
  title: 'Almond Travel',
  description: 'Your travel planning companion',
  icons: {
    icon: '/almond-travel-icon.png',
    shortcut: '/almond-travel-icon.png',
    apple: '/almond-travel-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
