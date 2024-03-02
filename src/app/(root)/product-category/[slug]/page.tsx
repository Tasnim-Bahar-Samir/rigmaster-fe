import ShopPage from '@/components/pages/shop/Shop.page';
import { Metadata } from 'next';
import React, { FC } from 'react';

export const metadata: Metadata = {
  title: 'Category | Products',
  description: 'Rigmaster',
};
type ProductPageProps = {
  params: { slug: string };
};
const ProductPage: FC<ProductPageProps> = ({ params }) => {
  return (
    <div>
      <ShopPage category={params.slug} />
    </div>
  );
};

export default ProductPage;
