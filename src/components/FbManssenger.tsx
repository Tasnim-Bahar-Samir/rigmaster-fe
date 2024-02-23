'use client';
import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FbManssenger = () => {
  return (
    <FacebookProvider appId="698379645703802" chatSupport>
      <CustomChat pageId="103527801605851" minimized={true} />
    </FacebookProvider>
  );
};

export default FbManssenger;
