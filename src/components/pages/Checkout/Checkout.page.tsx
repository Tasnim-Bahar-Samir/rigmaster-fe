'use client';
import React from 'react';
import CheckoutPageContainer from './CheckoutPageContainer';
import { selectedProductStore } from '@/store/ProductCookiesStore';
import EmptyCard from '@/components/core/EmptyCard';
import { useAddOrder } from '@/hooks/order.hooks';

const CheckoutPage = () => {
  const { products } = selectedProductStore();
  const { mutateAsync, isPending } = useAddOrder();
  return (
    <div className="rm-commonContainer">
      <div className="my-10 space-y-10 md:space-y-16 md:my-16 xl:space-y-20">
        {products?.length > 0 ? (
          <CheckoutPageContainer handleDataSubmit={mutateAsync} isDataSubmitting={isPending} />
        ) : (
          <EmptyCard title="Your Cart Is Empty!" />
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
