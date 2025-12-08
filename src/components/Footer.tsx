'use client'

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t glass-card mt-auto">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-12">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/almond-travel-icon.png"
                alt="Almond Travel"
                width={36}
                height={36}
                className="rounded-md"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Almond Travel
              </h3>
            </div>
            <p className="text-muted-foreground max-w-md">
              Discover the world's most beautiful destinations with seamless
              trip planning and community insights.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Trusted by Travelers</Badge>
              <Badge variant="secondary">Global Community</Badge>
            </div>
          </div>

          {/* Logo Center Section */}
          <div className="hidden lg:flex lg:col-span-2 justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 blur-2xl rounded-full"></div>
              <Image
                src="/almond-travel-icon.png"
                alt="Almond Travel"
                width={64}
                height={64}
                className="relative rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h5 className="text-sm font-semibold uppercase tracking-wider">Navigation</h5>
              <div className="flex flex-col space-y-2">
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link href="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="text-sm font-semibold uppercase tracking-wider">Connect</h5>
              <div className="flex flex-col space-y-2">
                <a
                  href="mailto:steyen@umich.edu"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Us
                </a>
                <Link href="/forums" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Community
                </Link>
                <Link href="/articles" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Articles
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} The Almonds | xosnos. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
