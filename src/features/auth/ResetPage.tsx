'use client'

import { useState, FormEvent } from "react";
import Link from "next/link";
import { handleReset } from "./authAPI";
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const ResetPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleResetSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      dispatch(handleReset(email))
        .unwrap()
        .then(() => {
          setSent(true);
        })
        .catch((error: unknown) => {
          console.error("Failed to send reset email:", error);
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="glass-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-center">Reset Password</CardTitle>
              <CardDescription className="text-center">
                Enter your email to receive a password reset link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && !sent && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {sent && (
                <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <div>
                    <h5 className="font-semibold text-green-800 dark:text-green-200 mb-1">Email Sent!</h5>
                    <AlertDescription className="text-green-700 dark:text-green-300">
                      If an account exists with <strong>{email}</strong>, you will receive a password reset email shortly.
                      Please check your inbox and follow the instructions.
                    </AlertDescription>
                  </div>
                </Alert>
              )}

              {!sent ? (
                <>
                  <p className="text-muted-foreground text-sm">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>

                  <form onSubmit={handleResetSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) validateEmail(e.target.value);
                        }}
                        onBlur={(e) => validateEmail(e.target.value)}
                        disabled={loading}
                        className={emailError ? "border-destructive" : ""}
                      />
                      {emailError && (
                        <p className="text-sm text-destructive">{emailError}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading || !!emailError || !email}
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" className="mr-2" />
                          Sending email...
                        </>
                      ) : (
                        'Send password reset email'
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                    setEmailError("");
                  }}
                >
                  Send another reset email
                </Button>
              )}

              <div className="text-center text-sm">
                Go back to{' '}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
