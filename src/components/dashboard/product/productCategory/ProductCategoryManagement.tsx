'use client';
import DashboardTable, { DashboardTableColumn } from '@/components/core/table/DashboardTable';
import DashboardTableSearch from '@/components/core/searchInput/DashboardTableSearch';
import { useState } from 'react';
import { formatTimestamp } from '@/libs/convertDateFormat';
import {
  CategoryResponseType,
  useAddCategoryData,
  useDeleteCategoryData,
  useGetCategoryData,
  useUpdateCategoryData,
} from '@/hooks/productCategory.hook';
import Image from 'next/legacy/image';
import CategoryForm from './CategoryForm';
import CategoryActions from './CategoryActions';

export const CategoryDataColumn: DashboardTableColumn[] = [
  {
    title: 'Category',
    dataKey: 'category',
    row: (data: CategoryResponseType) => (
      <div className="flex items-center gap-4  text-14-medium">
        <div className=" ">
          <Image
            className="rounded-[8px] object-cover"
            src={data?.img || '#'}
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
    title: 'Priority',
    dataKey: 'priority',
    row: (data: CategoryResponseType) => (
      <div>
        {' '}
        <p className="text-sm">{data.priority}</p>
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
  const { mutateAsync: handleEdit, isLoading: isDataEditing } = useUpdateCategoryData(data.id);
  const { mutateAsync: handleDelete, isLoading: isDataDeleting } = useDeleteCategoryData(data.id);
  return (
    <div>
      <CategoryActions
        handleEdit={handleEdit}
        isDataEditing={isDataEditing}
        isDataDeleting={isDataDeleting}
        handleDeleteFun={handleDelete}
        instance={data}
      />
    </div>
  );
};

const _col = [
  ...CategoryDataColumn,
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
const ProductCategoryManagement = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, isLoading } = useGetCategoryData(searchValue);
  const { mutateAsync, isLoading: isDataSubmiting } = useAddCategoryData();
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <DashboardTableSearch setSearchValue={setSearchValue} />
        <CategoryForm handleDataSubmit={mutateAsync} isDataSubmiting={isDataSubmiting} />
      </div>
      <div>
        <div>
          <DashboardTable columns={_col} isLoading={isLoading} data={data?.results || []} />
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryManagement;
