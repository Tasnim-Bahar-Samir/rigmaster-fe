import ShopPage from '@/components/pages/shop/Shop.page';
import React, { FC } from 'react';

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
