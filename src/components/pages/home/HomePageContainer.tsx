'use client';
import HomeHero from './HomeHero';
import TopCategories from './TopCategories';
import { eidProductData, productData } from '@/data/dummy.data';
import CategoryWiseProducts from './CategoryWiseProducts';
import repeatObject from '@/libs/repeatObjects';
import CategoryHiglight from './CategoryHiglight';
import { useGetCategoryData } from '@/hooks/productCategory.hook';
const HomePageContainer = () => {
  const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryData();
  return (
    <div>
      <div>
        <HomeHero />
        <div className="mt-10 space-y-10 md:space-y-16 md:mt-16 xl:space-y-20 xl:mt-20">
          <TopCategories isLoading={isCategoryLoading} categoryData={categoryData?.results} />
          <CategoryWiseProducts
            title="Winter Collections"
            isLoading={false}
            productData={repeatObject(productData, 10)}
          />
          <CategoryHiglight />
          <CategoryWiseProducts
            title="Eid Collections"
            isLoading={false}
            productData={repeatObject(eidProductData, 10)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageContainer;
