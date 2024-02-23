import React from 'react';

const OrderCompletePageContainer = () => {
  return (
    <div>
      <div>
        <h5 className="xl:text-lg font-medium text-green-700">
          Thank you. Your order has been received.
        </h5>
        <div className="space-y-2 mt-3">
          <p className="flex items-center gap-2">
            Order Number: <span className="text-sm font-medium xl:text-[16px]">#183423</span>
          </p>
          <p className="flex items-center gap-2">
            Payment Method:{' '}
            <span className="text-sm font-medium xl:text-[16px]">Cash On Delivery(Cod)</span>
          </p>
          <p className="flex items-center gap-2">
            Total: <span className="text-sm font-medium xl:text-[16px]">৳ 3000</span>
          </p>
        </div>
      </div>
      <div className="mt-5 xl:mt-8">
        <h3 className="text-lg mb-4 font-semibold xl:mb-5 xl:text-xl">Order Detals</h3>
        <div>
          <div className="space-y-3 py-3 border-b">
            {[...new Array(2)].map(() => (
              <div className="flex items-center justify-between" key={Math.random()}>
                <p className="text-sm font-medium flex items-center gap-4">
                  Luxury Punjabi-XL <span>x</span> <span>1</span> <span>৳1500</span>
                </p>{' '}
                <p className="text-[#C2A466] font-semibold">৳1500</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <p className="text-sm font-medium">Shipping Charge:</p>
            <p className="text-sm font-semibold">৳ 0(free)</p>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <p className="text-sm font-medium">Total:</p>
            <p className="text-sm font-semibold">৳ 3000</p>
          </div>
        </div>
      </div>

      {/* shipping data  */}
      <div className="mt-5 p-2 bg-slate-100 md:p-5">
        <h3 className="text-lg mb-4 font-semibold xl:mb-5 xl:text-xl">Shipping Detals</h3>
        <div className="space-y-3">
          <p className="flex gap-2">
            Name: <span className="text-sm font-medium xl:text-[16px]">Test</span>
          </p>
          <p className="flex gap-2">
            Address:{' '}
            <span className="text-sm font-medium xl:text-[16px]">
              Bhuiyan Residence(1st floor) Road#Mouchak
            </span>
          </p>
          <p className="flex gap-2">
            Phone: <span className="text-sm font-medium xl:text-[16px]">012345678</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletePageContainer;
