import DefaultLayout from '@/components/core/layout/DefaultLayout';
import React from 'react';

const DefaultTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DefaultLayout>{children}</DefaultLayout>
    </div>
  );
};

export default DefaultTemplate;
