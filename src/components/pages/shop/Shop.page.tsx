'use client';
import ProductList from './ProductList';
import Link from 'next/link';
import { Pagination } from '@mui/material';
import { useGetProductData } from '@/hooks/product.hooks';

const ShopPage = () => {
  const { data, isLoading } = useGetProductData();
  // console.log(data)
  return (
    <div className="rm-commonContainer">
      <div className=" items-center justify-between my-5 space-y-3 md:space-y-0 md:flex md:py-8 xl:py-10">
        <div className="font-medium xl:text-lg">
          <Link href={'/'}>Home</Link>/ <span className="text-[#C2A466]">Shop</span>
        </div>
        <div className="flex items-center gap-2 xl:gap-3">
          <h6>16 Products Found</h6>
          <span>|</span>
          <p className="cursor-pointer text-slate-500">x Clear Filter</p>
        </div>
      </div>
      <ProductList isLoading={isLoading} productData={data?.results || []} />
      <div className="flex items-center justify-center mt-5 lg:mt-8">
        <Pagination count={10} />
      </div>
    </div>
  );
};

export default ShopPage;
