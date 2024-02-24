import { ProductLoadingCard } from '@/components/core/cards/LoadingCards';
import ProductCard from '@/components/core/cards/ProductCard';
import { FC } from 'react';

type ProductListType = {
  isLoading: boolean;
  productData: any[];
};

const ProductList: FC<ProductListType> = ({ isLoading, productData }) => {
  return (
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
              thumbnail={i?.product_image?.find((i: any) => i.is_feature).image}
              alterThumbnail={i?.product_image?.filter((i: any) => !i.is_feature)?.[0].image}
              slug={i.slug}
              title={i.title}
            />
          ))}
        </div>
      ) : (
        <p className="h-44 text-center flex items-center justify-center">No Product Available!</p>
      )}
    </div>
  );
};

export default ProductList;
