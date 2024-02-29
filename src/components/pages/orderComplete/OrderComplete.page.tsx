'use client';
import OrderCompletePageContainer from './OrderCompletePageContainer';

const OrderCompletePage = ({ orderDetails }: { orderDetails: any }) => {
  return (
    <div className="rm-commonContainer">
      <div className="my-10 space-y-10 md:space-y-16 md:my-16 xl:space-y-20">
        <OrderCompletePageContainer orderDetails={orderDetails} />
      </div>
    </div>
  );
};

export default OrderCompletePage;
