'use client';
import DashboardTable, { DashboardTableColumn } from '@/components/core/table/DashboardTable';
import DashboardTableSearch from '@/components/core/searchInput/DashboardTableSearch';
import { useState } from 'react';
import { formatTimestamp } from '@/libs/convertDateFormat';
import Image from 'next/legacy/image';
import { useDeleteProductData, useGetProductData } from '@/hooks/product.hooks';
import Link from 'next/link';
import ProductActions from './ProductActions';

export const ProductDataColumn: DashboardTableColumn[] = [
  {
    title: 'Product',
    dataKey: 'product',
    row: (data: any) => (
      <div className="flex items-center gap-4  text-14-medium">
        <div className=" ">
          {data?.product_image?.length > 0 && (
            <Image
              className="rounded-[8px] object-cover"
              src={data?.product_image?.find((i: any) => i.is_feature)?.image || '#'}
              alt="asd"
              width={65}
              height={65}
            />
          )}
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">{data?.title || ''}</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Sizes',
    dataKey: 'sizes',
    row: (data: any) => (
      <div>
        {' '}
        <p className="text-sm">
          {data?.product_size_varient?.map((i: any, idx: number) => (
            <span key={Math.random()}>
              {i?.size?.size_title + (data?.product_size_varient?.length == idx + 1 ? '' : ' ,')}
            </span>
          ))}
        </p>
      </div>
    ),
  },
  {
    title: 'Price',
    dataKey: 'price',
    row: (data: any) => (
      <div>
        {' '}
        <p className="text-sm">{data.price}</p>
      </div>
    ),
  },
  {
    title: 'Date',
    dataKey: 'date',
    row: (data: any) => (
      <div>
        <p className="text-sm">{formatTimestamp(data.created_at)}</p>
      </div>
    ),
  },
];

const Action = ({ data }: { data: any }) => {
  const { mutateAsync: handleDelete, isLoading: isDataDeleting } = useDeleteProductData(data.id);
  return (
    <div>
      <ProductActions
        isDataDeleting={isDataDeleting}
        handleDeleteFun={handleDelete}
        instance={data}
      />
    </div>
  );
};

const _col = [
  ...ProductDataColumn,
  {
    title: 'Action',
    dataKey: 'action',
    row: (data: any) => (
      <div className="flex justify-end">
        <Action data={data} />
      </div>
    ),
  },
];

//default component
const ProductManagement = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, isLoading } = useGetProductData(searchValue);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <DashboardTableSearch setSearchValue={setSearchValue} />
        <Link
          href={'/dashboard/product/add-product'}
          className="disabled:bg-slate-500 px-4 rounded-md mt-3 gap-1 py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4 xl:mt-5"
        >
          Add New
        </Link>
      </div>
      <div>
        <div>
          <DashboardTable columns={_col} isLoading={isLoading} data={data?.results || []} />
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
