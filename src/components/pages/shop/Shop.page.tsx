'use client';
import ProductList from './ProductList';
import Link from 'next/link';
import { useGetProductData } from '@/hooks/product.hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ProductPagination from '@/components/core/pagination/ProductPagination';

const ShopPage = ({ category = '' }) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  let dataPerpage = 40;
  let offset;
  if (searchParams.get('search')) {
    offset = 0;
  } else {
    offset = (currentPage - 1) * dataPerpage;
  }
  const { data, isLoading } = useGetProductData('', category, dataPerpage, offset);
  const totalData = data?.count;
  const pageCount = Math.ceil(totalData / dataPerpage);
  const params = useSearchParams().toString();
  const { push } = useRouter();
  // console.log(data)
  return (
    <div className="rm-commonContainer">
      <div className=" items-center justify-between my-5 space-y-3 md:space-y-0 md:flex md:py-8 xl:py-10">
        <div className="font-medium xl:text-lg">
          <Link href={'/'}>Home</Link>/ <span className="text-[#C2A466]">Shop</span>
        </div>
        <div className="flex items-center gap-2 xl:gap-3">
          <h6>{data?.count} Products Found</h6>
          <span>|</span>
          <p onClick={() => params && push('/shop')} className="cursor-pointer text-slate-500">
            x Clear Filter
          </p>
        </div>
      </div>
      <ProductList isLoading={isLoading} productData={data?.results || []} />
      {data?.count > 40 && (
        <div className="flex items-center justify-center mt-5 lg:mt-8">
          <ProductPagination
            count={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ShopPage;
