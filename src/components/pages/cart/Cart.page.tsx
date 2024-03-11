'use client';
import { selectedProductStore } from '@/store/ProductCookiesStore';
import { CartDataType } from '@/type/cart.type';
import Link from 'next/link';
import React, { FC } from 'react';
import { MdDelete } from 'react-icons/md';
import Image from 'next/legacy/image';
import EmptyCard from '@/components/core/EmptyCard';
import { calculateTotalBill } from '@/libs/calculateBill';

type TableRowProps = {
  instance: CartDataType;
};
const TableRow: FC<TableRowProps> = ({ instance }) => {
  const { deleteSingleProduct, setQuantity } = selectedProductStore();
  return (
    <tr className="border-b">
      <td className="lg:px-1 flex items-center gap-1 py-4 md:gap-3">
        <div className="bg-slate-100 rounded-lg min-w-12 h-12 relative lg:w-[75px] lg:h-[75px]">
          <Image src={instance.thumbnail} layout="fill" objectFit="cover" alt="poduct_image" />
        </div>
        <div className="max-w-[150px]">
          <h5 className="font-medium mt-2  lg:mt-0 text-sm ">
            {instance.title}
            <span className={`text-sm font-normal`}>-{instance.sizeTitle}</span>
          </h5>
          <span className={`text-sm font-normal`}>{instance.color}</span>
          <p className="text-[#8C8C8C] text-[10px] md:text-sm md:text-[16px]">
            <span className="md:hidden">/{instance.price}৳</span>
          </p>
        </div>
      </td>
      <td className="lg:px-1 py-4 text-sm md:text-[16px]">
        <p className="hidden md:block ">{instance.price}৳</p>
      </td>
      <td className="lg:px-1 py-4 text-sm px-1 font-bold text-right md:text-[16px]">
        <div className="flex items-center gap-3 border w-fit px-3 py-2 xl:gap-4">
          <button onClick={() => setQuantity(instance.id, 'decrease')}>-</button>
          {instance.quantity}
          <button onClick={() => setQuantity(instance.id, 'increase')}>+</button>
        </div>
      </td>
      <td className="px-1 py-4 text-sm md:text-[16px] ">{instance.quantity * instance.price}৳</td>

      <td className="lg:px-1 py-4 text-sm md:text-[16px]">
        <MdDelete
          onClick={() => deleteSingleProduct(instance.id)}
          className="cursor-pointer text-red-600"
        />
      </td>
    </tr>
  );
};

const CartPage = () => {
  const { products } = selectedProductStore();
  return (
    <div className="my-10 space-y-10 md:space-y-16 md:my-16 xl:space-y-20">
      {products?.length > 0 ? (
        <div className="flex gap-5 flex-col lg:flex-row xl:gap-10">
          <div className="w-full lg:w-3/5">
            <table className="w-full text-sm text-left">
              <thead className="font-medium lg:text-[16px]">
                <tr>
                  <th scope="col" className=" py-3 lg:px-1">
                    Products
                  </th>
                  <th scope="col" className=" py-3 lg:px-1">
                    <p className="hidden md:block">Price</p>
                  </th>
                  <th scope="col" className="lg:px-1 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="lg:px-1 py-3 ">
                    Total
                  </th>
                  <th scope="col" className="lg:px-1 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((i, idx) => (
                  <TableRow instance={i} key={idx} />
                ))}
              </tbody>
            </table>
            <h2 className="mt-3 lg:text-lg xl:mt-5">
              Forgot Something?{' '}
              <Link href={'/shop'} className="text-[#d6ba81] font-semibold">
                Go to shop
              </Link>
            </h2>
          </div>
          <div className="bg-slate-100 w-full lg:w-2/5">
            <div className="p-5">
              <h3 className=" font-semibold mt-3 xl:mb-5 xl:text-lg">Cart Total</h3>
              <div className="space-y-5">
                <div className="text-sm flex justify-between">
                  <span>Subtotal</span>
                  <span className="text--[#C2A466]">৳ {calculateTotalBill(products)}</span>
                </div>
                <div className="text-sm flex justify-between">
                  <span>Vat</span>
                  <span className="text--[#C2A466]">৳ 0</span>
                </div>
                <div className="text-sm flex justify-between">
                  <span>Total</span>
                  <span className="text--[#C2A466]">৳ {calculateTotalBill(products)}</span>
                </div>
              </div>
              <Link
                href={'/checkout'}
                className="px-4 inline-block text-center mt-3 gap-1 w-full py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4 xl:mt-5"
              >
                Proceed To Checkout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCard title="Your Cart Is Empty!" />
      )}
    </div>
  );
};

export default CartPage;
