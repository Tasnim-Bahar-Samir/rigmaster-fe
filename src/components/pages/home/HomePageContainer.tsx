'use client';
import HomeHero from './HomeHero';
import TopCategories from './TopCategories';
import CategoryWiseProducts from './CategoryWiseProducts';
import CategoryHiglight from './CategoryHiglight';
import { useGetCategoryData } from '@/hooks/productCategory.hook';
import { useGetProductData } from '@/hooks/product.hooks';
import EidCollectionSection from './EidCollectionSection';
const HomePageContainer = () => {
  const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryData();
  const { data: cate1ProductData, isLoading: isCate1ProductLoading } = useGetProductData(
    '',
    '',
    12,
    0,
  );
  const { data: cate2ProductData, isLoading: isCate2ProductLoading } = useGetProductData(
    '',
    'luxury-punjabi',
    10,
    0,
  );
  const { data: cate3ProductData, isLoading: isCate3ProductLoading } = useGetProductData(
    '',
    'casual-shirt',
    10,
    0,
  );
  const { data: cate4ProductData, isLoading: isCate4ProductLoading } = useGetProductData(
    '',
    'polo-t-shirt',
    10,
    0,
  );
  return (
    <div>
      <div>
        <HomeHero />
        <div className="mt-10 space-y-10 md:space-y-16 md:mt-16 xl:space-y-20 xl:mt-20">
          <TopCategories isLoading={isCategoryLoading} categoryData={categoryData?.results} />
          <EidCollectionSection
            isLoading={isCate1ProductLoading}
            productData={cate1ProductData?.results}
          />
          <CategoryHiglight />
          <CategoryWiseProducts
            title="Luxury Punjabi"
            isLoading={isCate2ProductLoading}
            productData={cate2ProductData?.results}
          />
          <CategoryWiseProducts
            title="Casual Shirt"
            category_slug="casual-shirt"
            isLoading={isCate3ProductLoading}
            productData={cate3ProductData?.results}
          />
          <CategoryWiseProducts
            title="Polo T-Shirt"
            category_slug="polo-t-shirt"
            isLoading={isCate4ProductLoading}
            productData={cate4ProductData?.results}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageContainer;
