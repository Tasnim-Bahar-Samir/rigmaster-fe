import CartPage from '@/components/pages/cart/Cart.page';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Rigmaster',
};
const Cart = () => {
  return (
    <div className=" rm-commonContainer ">
      <CartPage />
    </div>
  );
};

export default Cart;
