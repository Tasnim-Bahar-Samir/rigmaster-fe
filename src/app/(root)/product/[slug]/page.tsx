import ProductDetailsPage from '@/components/pages/product/productDetails/ProductDetials.page';
import axiousResuest from '@/libs/axiosRequest';
import { notFound } from 'next/navigation';
import React, { FC } from 'react';

type ProductDetailsProps = {
  params: { slug: string };
};
const ProductDetails: FC<ProductDetailsProps> = async ({ params }) => {
  try {
    const productDetails = await axiousResuest({
      url: `/product/management/?slug=${params.slug}`,
      method: 'get',
    });

    return (
      <div>
        <ProductDetailsPage productDetails={productDetails?.results?.[0]} />
      </div>
    );
  } catch (error) {
    notFound();
  }
};

export default ProductDetails;
