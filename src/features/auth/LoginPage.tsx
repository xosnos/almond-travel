'use client'

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { handleLoginEmailAndPassword, handleLoginGoogle } from "./authAPI";
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import { AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

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

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailPasswordLogin = (e: FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      dispatch(handleLoginEmailAndPassword({ email, password }));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(handleLoginGoogle());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="glass-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-center">Login</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Image
                      alt="Google"
                      src="/google.svg"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Sign in with Google
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
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
                  <p className="text-xs text-muted-foreground">
                    We'll never share your email with anyone else.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) validatePassword(e.target.value);
                    }}
                    onBlur={(e) => validatePassword(e.target.value)}
                    disabled={loading}
                    className={passwordError ? "border-destructive" : ""}
                  />
                  {passwordError && (
                    <p className="text-sm text-destructive">{passwordError}</p>
                  )}
                  <div className="flex justify-between items-center">
                    <Link href="/reset" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-password"
                    checked={showPassword}
                    onCheckedChange={(checked) => setShowPassword(checked as boolean)}
                    disabled={loading}
                  />
                  <Label
                    htmlFor="show-password"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Show password
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !!emailError || !!passwordError}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>

              <div className="text-center text-sm">
                Don't have an account?{' '}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Create one
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
