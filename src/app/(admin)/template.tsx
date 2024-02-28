'use client';
import AuthPage from '@/components/auth/AuthPage';
import DashBoardAside from '@/components/core/aside/DashAsideNav';
import DashboardTopNav from '@/components/core/navbar/DashboardTopNavbar';
import React from 'react';

const template = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthPage>
      <div className="bg-white min-h-screen">
        <DashboardTopNav />
        <div className="hidden lg:block">
          <DashBoardAside />
        </div>
        <div className="px-7 py-10 mt-10  sm:mt-[111px] lg:ml-[320px]">{children}</div>
      </div>
    </AuthPage>
  );
};

export default template;
