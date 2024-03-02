import CheckoutPage from '@/components/pages/Checkout/Checkout.page';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Rigmaster',
};

const Checkout = () => {
  return (
    <div>
      <CheckoutPage />
    </div>
  );
};

export default Checkout;
