'use client';
import DashboardTable, { DashboardTableColumn } from '@/components/core/table/DashboardTable';
import { useState } from 'react';
import { useDeleteOrder, useGetOrderData, useUpdateOrderData } from '@/hooks/order.hooks';
import { dateWithTimeFormat } from '@/libs/convertDateFormat';
import OrderActions from './OrderActions';
import { statusData } from '@/data/dummy.data';
import DashboardPagination from '@/components/core/pagination/DashboardPagination';

export const OrderDataColumn: DashboardTableColumn[] = [
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
    title: 'O.Status',
    dataKey: 'status',
    row: (data: any) => (
      <div>
        {' '}
        <p className="text-sm px-2 py-1 rounded-md bg-slate-500 w-fit text-white">
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
  ...OrderDataColumn,
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
const OrderManagement = () => {
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  let dataPerpage = 20;
  let offset;
  if (status) {
    offset = 0;
  } else {
    offset = (currentPage - 1) * dataPerpage;
  }
  const { data, isLoading } = useGetOrderData(status, dataPerpage, offset);
  const totalData = data?.count;
  const pageCount = Math.ceil(totalData / dataPerpage);
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="w-fit px-4 border rounded-lg">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-inherit py-2 outline-none"
          >
            <option value="">All Orders</option>
            {statusData.map((i) => (
              <option value={i.value} key={Math.random()}>
                {i.title}
              </option>
            ))}
          </select>
        </div>
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

export default OrderManagement;
