'use client';
import React from 'react';
import CheckoutPageContainer from './CheckoutPageContainer';

const CheckoutPage = () => {
  return (
    <div className="rm-commonContainer">
      <div className="my-10 space-y-10 md:space-y-16 md:my-16 xl:space-y-20">
        <CheckoutPageContainer handleDataSubmit={() => undefined} isDataSubmitting={false} />
      </div>
    </div>
  );
};

export default CheckoutPage;
