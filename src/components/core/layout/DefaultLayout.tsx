'use client';
import React, { useEffect } from 'react';
import DefaultNavbar from '../navbar/DefaultNavbar';
import DefaultFooter from '../footer/DefaultFooter';
import FbManssenger from '@/components/FbManssenger';
import { selectedProductStore } from '@/store/ProductCookiesStore';
import NextTopLoader from 'nextjs-toploader';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const { setPrevCookies } = selectedProductStore();
  useEffect(() => {
    setPrevCookies();
  }, [setPrevCookies]);
  return (
    <div>
      <NextTopLoader color="#C2A466" showSpinner={false} />
      <DefaultNavbar />
      {children}
      <DefaultFooter />
      <FbManssenger />
    </div>
  );
};

export default DefaultLayout;
