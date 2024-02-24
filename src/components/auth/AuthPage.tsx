'use client';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status }: any = useSession({ required: true });
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut(); // Force sign in to hopefully resolve error
    }
  }, [session]);
  if (status === 'authenticated') {
    // console.log(session)
    return children;
  }
  return (
    <div className="flex items-center justify-center h-screen bg-tmlt-Primary-8 bg-opacity-50">
      <CircularProgress size={20} />
    </div>
  );
};

export default AuthPage;
