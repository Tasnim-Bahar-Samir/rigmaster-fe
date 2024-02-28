'use client';
import DashboardTable, { DashboardTableColumn } from '@/components/core/table/DashboardTable';
import DashboardTableSearch from '@/components/core/searchInput/DashboardTableSearch';
import { useState } from 'react';
import { formatTimestamp } from '@/libs/convertDateFormat';
import {
  SizeResponseType,
  useAddSizeData,
  useDeleteSizeData,
  useGetSizeData,
  useUpdateSizeData,
} from '@/hooks/productSize.hooks';
import SizeForm from './SizeForm';
import SizeActions from './SizeActions';

export const ProductSizeDataColumn: DashboardTableColumn[] = [
  {
    title: 'Category',
    dataKey: 'category',
    row: (data: SizeResponseType) => (
      <div className="flex items-center gap-4  text-14-medium">
        <div className="space-y-2">
          <p className="text-sm font-medium">{data?.size_title || ''}</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Date',
    dataKey: 'date',
    row: (data: SizeResponseType) => (
      <div>
        <p className="text-sm">{formatTimestamp(data.created_at)}</p>
      </div>
    ),
  },
];

const Action = ({ data }: { data: any }) => {
  const { mutateAsync: handleEdit, isLoading: isDataEditing } = useUpdateSizeData(data.id);
  const { mutateAsync: handleDelete, isLoading: isDataDeleting } = useDeleteSizeData(data.id);
  return (
    <div>
      <SizeActions
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
  ...ProductSizeDataColumn,
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
const ProductSizeManagement = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, isLoading } = useGetSizeData(searchValue);
  const { mutateAsync, isLoading: isDataSubmiting } = useAddSizeData();
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <DashboardTableSearch setSearchValue={setSearchValue} />
        <SizeForm handleDataSubmit={mutateAsync} isDataSubmiting={isDataSubmiting} />
      </div>
      <div>
        <div>
          <DashboardTable columns={_col} isLoading={isLoading} data={data?.results || []} />
        </div>
      </div>
    </div>
  );
};

export default ProductSizeManagement;
