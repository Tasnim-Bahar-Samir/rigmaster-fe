import { ProductLoadingCard } from '@/components/core/cards/LoadingCards';
import ProductCard from '@/components/core/cards/ProductCard';
import Link from 'next/link';
import React, { FC } from 'react';

type EidCollectionSectionProps = {
  productData: any[];
  isLoading: boolean;
};
const EidCollectionSection: FC<EidCollectionSectionProps> = ({ productData, isLoading }) => {
  return (
    <div className="rm-commonContainer">
      <div className="flex items-center justify-between mb-5 md:mb-7">
        <h5 className="text-lg font-semibold md:text-xl xl:text-2xl">{'Eid Collections'}</h5>
      </div>
      <div>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-6">
            {[...new Array(10)].map(() => (
              <ProductLoadingCard key={Math.random()} />
            ))}
          </div>
        ) : productData?.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-5 xl:grid-cols-4 xl:gap-6">
            {productData.map((i: any) => (
              <ProductCard
                key={Math.random()}
                price={i.price}
                thumbnail={i?.product_image?.find((i: any) => i.is_feature)?.image}
                alterThumbnail={i?.product_image?.filter((i: any) => !i.is_feature)?.[0]?.image}
                slug={i.slug}
                title={i.title}
              />
            ))}
          </div>
        ) : (
          <p className="h-44 text-center flex items-center justify-center">No Product Available!</p>
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <Link
          href={'/product-category/eid-collection'}
          className="px-4 py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default EidCollectionSection;
