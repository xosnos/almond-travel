import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.scss';
import { StoreProvider } from './providers/StoreProvider';
import { AuthProvider } from './providers/AuthProvider';

export const metadata: Metadata = {
  title: 'Almond Travel',
  description: 'Your travel planning companion',
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
