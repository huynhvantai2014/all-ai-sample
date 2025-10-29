"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = !!localStorage.getItem('pos_logged_in');
      if (!loggedIn) {
        router.replace('/login');
      }
    }
  }, [router]);

  // Có thể thêm loading UI nếu muốn
  if (typeof window !== 'undefined' && !localStorage.getItem('pos_logged_in')) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
