'use client';

import React, { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { handleLogout } from '../features/auth/authAPI';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { cn } from '@/lib/utils';

interface NavLinkItemProps {
  to: string;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'primary';
  mobile?: boolean;
}

const NavLinkItem: FC<NavLinkItemProps> = ({ to, label, onClick, variant = 'default', mobile = false }) => {
  if (variant === 'primary') {
    return (
      <Link href={to} onClick={onClick}>
        <Button variant="default" className={cn(mobile && "w-full justify-start")}>
          {label}
        </Button>
      </Link>
    );
  }

  return (
    <Link
      href={to}
      onClick={onClick}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        mobile ? "block py-2 text-base" : "px-4 py-2"
      )}
    >
      {label}
    </Link>
  );
};

export const Navigation: FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleLogoutClick = (): void => {
    dispatch(handleLogout() as any);
    setOpen(false);
  };

  const navLinks = [
    { to: '/new', label: 'New Trip' },
    { to: '/trips', label: 'Trips' },
    { to: '/forums', label: 'Forums' },
    { to: '/articles', label: 'Articles' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b glass-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Image
              alt="Almond Travel Logo"
              src="/almond-travel-icon.png"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Almond Travel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <NavLinkItem key={link.to} to={link.to} label={link.label} />
            ))}
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {user ? (
              <>
                <NavLinkItem to="/profile" label="Profile" />
                <NavLinkItem to="/" label="Logout" onClick={handleLogoutClick} variant="primary" />
              </>
            ) : (
              <>
                <NavLinkItem to="/register" label="Register" />
                <NavLinkItem to="/login" label="Login" variant="primary" />
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-6">
                {/* Mobile Navigation Links */}
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <NavLinkItem
                      key={link.to}
                      to={link.to}
                      label={link.label}
                      mobile
                      onClick={() => setOpen(false)}
                    />
                  ))}
                </div>

                {/* Mobile Auth Links */}
                <div className="border-t pt-4 flex flex-col space-y-2">
                  {user ? (
                    <>
                      <NavLinkItem
                        to="/profile"
                        label="Profile"
                        mobile
                        onClick={() => setOpen(false)}
                      />
                      <NavLinkItem
                        to="/"
                        label="Logout"
                        onClick={handleLogoutClick}
                        variant="primary"
                        mobile
                      />
                    </>
                  ) : (
                    <>
                      <NavLinkItem
                        to="/register"
                        label="Register"
                        mobile
                        onClick={() => setOpen(false)}
                      />
                      <NavLinkItem
                        to="/login"
                        label="Login"
                        variant="primary"
                        mobile
                        onClick={() => setOpen(false)}
                      />
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
