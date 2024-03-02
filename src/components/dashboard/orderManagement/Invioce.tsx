import { formatTimestamp } from '@/libs/convertDateFormat';
import { getOrderSubtotal } from '@/libs/getOrderSubtotal';
import { MenuItem } from '@mui/material';
import Image from 'next/legacy/image';
import { FC, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

type InvoiceProps = {
  orderDetails: any;
};

const Invoice: FC<InvoiceProps> = ({ orderDetails }) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <MenuItem onClick={handlePrint}>Print Invoice</MenuItem>
      <div
        ref={componentRef}
        className=" items-center h-full p-16 justify-center hidden print:flex"
      >
        <div>
          <div className="flex justify-between">
            <div className="max-w-[130px]">
              <Image
                priority
                src={'/images/logos/logo2.png'}
                width={230}
                height={55}
                alt="RIGMASTER"
              />
            </div>

            <p className="flex items-center gap-2">
              Order Number:{' '}
              <span className="text-sm font-medium xl:text-[16px]">#{orderDetails?.order_id}</span>
            </p>
          </div>
          <div className="space-y-3 my-4 text-gray-600 max-w-[500px]">
            <p className="leading-normal">
              114 Jam-Kon-L Market (8th floor), Dutch Bangla Bank Building, Shenpara, Parbota,
              Mirpur-10, Dhaka, Bangladesh
            </p>
            <p>Phone: 09606-999910</p>
          </div>
          <div className="mb-2">
            <h5 className="text-2xl font-bold">Invoice</h5>
            <p>{formatTimestamp(new Date())}</p>
          </div>
          <div>
            <div className="space-y-2 mt-3">
              <p className="flex items-center gap-2">
                Payment Method:{' '}
                <span className="text-sm font-medium xl:text-[16px]">Cash On Delivery(Cod)</span>
              </p>
              {/* <p className="flex items-center gap-2">
              Total:{' '}
              <span className="text-sm font-medium xl:text-[16px]">
                {getOrderSubtotal(orderDetails?.purchase_order)}
              </span>
            </p> */}
            </div>
          </div>
          <div className="mt-5 xl:mt-8">
            <h3 className="text-lg mb-4 font-semibold xl:mb-5 xl:text-xl">Order Details</h3>
            <div>
              <div className="space-y-3 py-3 border-b">
                {orderDetails?.purchase_order?.map((i: any) => (
                  <div className="flex items-center justify-between" key={Math.random()}>
                    <div className="relative flex items-center gap-3">
                      <p className="text-sm font-medium flex items-center gap-4">
                        {i?.product?.title}
                        {`(${i?.product?.slug})`}-{i?.others_info?.product_size_varient?.size_title}
                        {i.product.color && `-${i?.product?.color}`}
                        <span>x</span> <span>{i.quantity}</span> <span>{i?.product?.price}</span>
                      </p>{' '}
                    </div>
                    <p className="">{i.quantity * i?.product?.price}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <p className="text-sm font-medium">Shipping Charge:</p>
                <p className="text-sm font-semibold">0(free)</p>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <p className="text-sm font-medium">Total:</p>
                <p className="text-xl font-bold">
                  {getOrderSubtotal(orderDetails?.purchase_order)} TK
                </p>
              </div>
            </div>
          </div>

          {/* shipping data  */}
          <div className="mt-5 p-2 bg-slate-100 md:p-5">
            <h3 className="text-lg mb-4 font-semibold xl:mb-5 xl:text-xl">Shipping Details</h3>
            <div className="space-y-3">
              <p className="flex gap-2">
                Name:{' '}
                <span className="text-sm font-medium xl:text-[16px]">
                  {orderDetails?.billing_address?.name || 'n/a'}
                </span>
              </p>
              <p className="flex gap-2">
                Address:{' '}
                <span className="text-sm font-medium xl:text-[16px]">
                  {orderDetails?.billing_address?.address || 'n/a'}
                </span>
              </p>
              <p className="flex gap-2">
                Phone:{' '}
                <span className="text-sm font-medium xl:text-[16px]">
                  {orderDetails?.billing_address?.phone || 'n/a'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
