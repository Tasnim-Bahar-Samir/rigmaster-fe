import React from 'react';
import AddToCartSection from './AddToCartSection';
import ProductDescriptionSection from './ProductDescriptionSection';

const ProductDetailsPage = () => {
  return (
    <div className="rm-commonContainer">
      <div className="my-10 space-y-10 md:space-y-16 md:my-16 xl:space-y-20 xl:my-20">
        <div className="">
          <AddToCartSection />
        </div>
        <ProductDescriptionSection />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
