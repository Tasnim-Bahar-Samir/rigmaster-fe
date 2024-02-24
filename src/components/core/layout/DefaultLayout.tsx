import React from 'react';
import DefaultNavbar from '../navbar/DefaultNavbar';
import DefaultFooter from '../footer/DefaultFooter';
import FbManssenger from '@/components/FbManssenger';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DefaultNavbar />
      {children}
      <DefaultFooter />
      <FbManssenger />
    </div>
  );
};

export default DefaultLayout;
