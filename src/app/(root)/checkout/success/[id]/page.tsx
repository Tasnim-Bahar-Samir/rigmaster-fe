import OrderCompletePage from '@/components/pages/orderComplete/OrderComplete.page';
import axiousResuest from '@/libs/axiosRequest';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Order Complete',
  description: 'Rigmaster',
};

type OrderSuccessProps = {
  params: { id: string };
};
const OrderSuccess: FC<OrderSuccessProps> = async ({ params }) => {
  try {
    const orderDetails = await axiousResuest({
      url: `/order/cod/${params.id}/`,
      method: 'get',
    });
    // console.log(orderDetails)
    return (
      <div>
        <OrderCompletePage orderDetails={orderDetails} />
      </div>
    );
  } catch (error) {
    notFound();
  }
};

export default OrderSuccess;
