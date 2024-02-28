'use client';
import HomeHero from './HomeHero';
import TopCategories from './TopCategories';
import CategoryWiseProducts from './CategoryWiseProducts';
import CategoryHiglight from './CategoryHiglight';
import { useGetCategoryData } from '@/hooks/productCategory.hook';
import { useGetProductData } from '@/hooks/product.hooks';
const HomePageContainer = () => {
  const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryData();
  const { data: cate1ProductData, isLoading: isCate1ProductLoading } = useGetProductData(
    '',
    '',
    10,
    5,
  );
  const { data: cate2ProductData, isLoading: isCate2ProductLoading } = useGetProductData(
    '',
    '',
    10,
    5,
  );
  return (
    <div>
      <div>
        <HomeHero />
        <div className="mt-10 space-y-10 md:space-y-16 md:mt-16 xl:space-y-20 xl:mt-20">
          <TopCategories isLoading={isCategoryLoading} categoryData={categoryData?.results} />
          <CategoryWiseProducts
            title="Eid Collections"
            isLoading={isCate1ProductLoading}
            productData={cate1ProductData?.results}
          />
          <CategoryHiglight />
          <CategoryWiseProducts
            title="Luxury Punjabi"
            isLoading={isCate2ProductLoading}
            productData={cate2ProductData?.results}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageContainer;
