import ShopPage from '@/components/pages/shop/Shop.page';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Rigmaster',
};
const Shop = () => {
  return (
    <div>
      <ShopPage />
    </div>
  );
};

export default Shop;
