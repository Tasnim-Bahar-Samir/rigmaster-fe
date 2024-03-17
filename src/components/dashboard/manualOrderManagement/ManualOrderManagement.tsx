'use client';
import DashboardTable, { DashboardTableColumn } from '@/components/core/table/DashboardTable';
import { useState } from 'react';
import { useDeleteOrder, useGetOrderData, useUpdateOrderData } from '@/hooks/order.hooks';
import { dateWithTimeFormat } from '@/libs/convertDateFormat';
import DashboardPagination from '@/components/core/pagination/DashboardPagination';
import { getOrderSubtotal } from '@/libs/getOrderSubtotal';
import OrderActions from '../orderManagement/OrderActions';
import ManualOrderForm from './ManualOrderForm';
import { useGetProductData } from '@/hooks/product.hooks';
import { useGetSizeData } from '@/hooks/productSize.hooks';
import { CircularProgress } from '@mui/material';

export const ManualOrderDataColumn: DashboardTableColumn[] = [
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
        <p className="text-sm">৳ {getOrderSubtotal(data?.purchase_order)}</p>
      </div>
    ),
  },
  {
    title: 'O.Status',
    dataKey: 'status',
    row: (data: any) => (
      <div>
        {' '}
        <p
          className={`${data?.status === 'PENDING' ? 'bg-slate-500' : data?.status === 'PROCESS' ? 'bg-yellow-600' : data?.status == 'SHIFT' ? 'bg-blue-600' : data?.status == 'DELIVERED' ? 'bg-green-600' : 'bg-red-600'} text-sm px-2 py-1 rounded-md  w-fit text-white`}
        >
          {data.status || ''}
        </p>
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
  const { mutateAsync: handleEdit, isLoading: isDataEditing } = useUpdateOrderData(data.id);
  const { mutateAsync: handleDelete, isLoading: isDataDeleting } = useDeleteOrder(data.id);
  return (
    <OrderActions
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
  const { data: productData, isLoading: isProdDataLoading } = useGetProductData('', '', 50, 0);
  const { data: sizeData, isLoading: isSizeDataLoading } = useGetSizeData('');
  //   const [status, setStatus] = useState('PENDING,PROCESS,DELIVERED,SHIFT');
  const [currentPage, setCurrentPage] = useState(1);
  let dataPerpage = 20;
  let offset = (currentPage - 1) * dataPerpage;
  const { data, isLoading } = useGetOrderData('', dataPerpage, offset);
  const totalData = data?.count;
  const pageCount = Math.ceil(totalData / dataPerpage);
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-bold">Manual Order List.</h4>
        {isProdDataLoading || isSizeDataLoading ? (
          <div className="flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <ManualOrderForm
            handleDataSubmit={() => undefined}
            isDataSubmiting={false}
            productData={productData?.results}
            sizeData={sizeData?.results}
          />
        )}
      </div>
      <div>
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
