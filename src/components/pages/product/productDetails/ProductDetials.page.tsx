import React from 'react';
import AddToCartSection from './AddToCartSection';
import ProductDescriptionSection from './ProductDescriptionSection';

const ProductDetailsPage = ({ productDetails }: { productDetails: any }) => {
  return (
    <div className="rm-commonContainer">
      <div className="my-10 space-y-10 md:space-y-16 md:my-16 xl:space-y-20 xl:my-20">
        <div className="">
          <AddToCartSection productDetails={productDetails} />
        </div>
        <ProductDescriptionSection
          desc={productDetails.description_html || ''}
          additionalDesc={productDetails.additional_information_html || ''}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
