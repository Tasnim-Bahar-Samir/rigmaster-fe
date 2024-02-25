'use client';
import DashboardTable, { DashboardTableColumn } from '@/components/core/table/DashboardTable';
import DashboardTableSearch from '@/components/core/searchInput/DashboardTableSearch';
import { useState } from 'react';
import { formatTimestamp } from '@/libs/convertDateFormat';
import Image from 'next/legacy/image';
import { useGetProductData } from '@/hooks/product.hooks';

export const ProductDataColumn: DashboardTableColumn[] = [
  {
    title: 'Product',
    dataKey: 'product',
    row: (data: any) => (
      <div className="flex items-center gap-4  text-14-medium">
        <div className=" ">
          <Image
            className="rounded-[8px] object-cover"
            src={data?.product_image?.find((i: any) => i.is_feature)?.image || '#'}
            alt="asd"
            width={65}
            height={65}
          />
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

const Action = () => {
  //   const { mutateAsync: handleEdit, isLoading: isDataEditing } = useUpdateCategoryData(data.id);
  //   const { mutateAsync: handleDelete, isLoading: isDataDeleting } = useDeleteCategoryData(data.id);
  return (
    <div>
      {/* <CategoryActions
        handleEdit={handleEdit}
        isDataEditing={isDataEditing}
        isDataDeleting={isDataDeleting}
        handleDeleteFun={handleDelete}
        instance={data}
      /> */}
    </div>
  );
};

const _col = [
  ...ProductDataColumn,
  {
    title: 'Action',
    dataKey: 'action',
    row: () => (
      <div className="flex justify-end">
        <Action />
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
        {/* <CategoryForm handleDataSubmit={mutateAsync} isDataSubmiting={isDataSubmiting} /> */}
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