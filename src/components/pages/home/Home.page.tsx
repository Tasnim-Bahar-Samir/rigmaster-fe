'use client';
import React from 'react';
import HomeHero from './HomeHero';
import TopCategories from './TopCategories';
import { eidProductData, productData, topCategoryData } from '@/data/dummy.data';
import CategoryWiseProducts from './CategoryWiseProducts';
import repeatObject from '@/libs/repeatObjects';
import CategoryHiglight from './CategoryHiglight';

const HomePage = () => {
  return (
    <div>
      <HomeHero />
      <div className="mt-10 space-y-10 md:space-y-16 md:mt-16 xl:space-y-20 xl:mt-20">
        <TopCategories isLoading={false} categoryData={topCategoryData} />
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
  );
};

export default HomePage;
