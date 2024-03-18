'use client';
import DashboardTable, { DashboardTableColumn } from '@/components/core/table/DashboardTable';
import { useState } from 'react';
import { dateWithTimeFormat } from '@/libs/convertDateFormat';
import DashboardPagination from '@/components/core/pagination/DashboardPagination';
import { getOrderSubtotal } from '@/libs/getOrderSubtotal';
import ManualOrderForm from './ManualOrderForm';
import { useGetDashProductData } from '@/hooks/product.hooks';
import {
  useAddManualOrder,
  useDeleteManualOrder,
  useGetManualOrderData,
  useUpdateManualOrderData,
} from '@/hooks/manualOrder.hooks';
import ManualOrderActions from './ManualOrderActions';

export const ManualOrderDataColumn: DashboardTableColumn[] = [
  {
    title: 'Creator',
    dataKey: 'created_by',
    row: (data: any) => (
      <div className="flex items-center gap-4  text-14-medium">
        <div className="space-y-2">
          <p className="text-sm font-medium">{data?.billing_address?.created_by || ''}</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Customer',
    dataKey: 'customer',
    row: (data: any) => (
      <div className="flex items-center gap-4  text-14-medium">
        <div className="space-y-2">
          <p className="text-sm font-medium">{data?.billing_address?.name || ''}</p>
          <p className="text-sm">{data?.billing_address?.phone || ''}</p>
        </div>
      </div>
    ),
  },
  {
    title: 'P.Method',
    dataKey: 'method',
    row: () => (
      <div>
        {' '}
        <p className="text-sm">{'COD'}</p>
      </div>
    ),
  },
  {
    title: 'Total',
    dataKey: 'total',
    row: (data: any) => (
      <div>
        {' '}
        <p className="text-sm">৳ {getOrderSubtotal(data?.custom_purchase_order)}</p>
      </div>
    ),
  },
  {
    title: 'Date',
    dataKey: 'date',
    row: (data: any) => (
      <div>
        <p className="text-sm">{dateWithTimeFormat(data.created_at)}</p>
      </div>
    ),
  },
];

const Action = ({ data }: { data: any }) => {
  const { mutateAsync: handleEdit, isLoading: isDataEditing } = useUpdateManualOrderData(data.id);
  const { mutateAsync: handleDelete, isLoading: isDataDeleting } = useDeleteManualOrder(data.id);
  return (
    <ManualOrderActions
      handleEdit={handleEdit}
      isDataEditing={isDataEditing}
      isDataDeleting={isDataDeleting}
      handleDeleteFun={handleDelete}
      instance={data}
    />
  );
};

const _col = [
  ...ManualOrderDataColumn,
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
const ManualOrderManagement = () => {
  const [prodSearch, setProdSearch] = useState('');
  const { data: productData, isLoading: isProdDataLoading } = useGetDashProductData(
    prodSearch,
    50,
    0,
  );
  const { mutateAsync, isLoading: isOrderSubmitting } = useAddManualOrder();
  //   const [status, setStatus] = useState('PENDING,PROCESS,DELIVERED,SHIFT');
  const [currentPage, setCurrentPage] = useState(1);
  let dataPerpage = 20;
  let offset = (currentPage - 1) * dataPerpage;
  const { data, isLoading } = useGetManualOrderData('', dataPerpage, offset);
  const totalData = data?.count;
  const pageCount = Math.ceil(totalData / dataPerpage);
  // console.log(prodSearch)
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-bold">Manual Order List.</h4>
        <ManualOrderForm
          isProdDataLoading={isProdDataLoading}
          setProdSearch={setProdSearch}
          handleDataSubmit={mutateAsync}
          isDataSubmiting={isOrderSubmitting}
          productData={productData?.results || []}
        />
      </div>
      <div>
        <p className="text-lg capitalize mb-5">
          Manual Orders: <span className="font-semibold">{data?.count}</span>
        </p>
        <div>
          <DashboardTable columns={_col} isLoading={isLoading} data={data?.results || []} />
        </div>
        <div className="flex justify-end mt-4">
          <DashboardPagination
            count={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ManualOrderManagement;
