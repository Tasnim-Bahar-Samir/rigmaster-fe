import React from 'react';
import DefaultNavbar from '../navbar/DefaultNavbar';
import DefaultFooter from '../footer/DefaultFooter';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DefaultNavbar />
      {children}
      <DefaultFooter />
    </div>
  );
};

export default DefaultLayout;
