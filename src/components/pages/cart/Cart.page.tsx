import Link from 'next/link';
import React from 'react';
import { MdDelete } from 'react-icons/md';
const TableRow = () => {
  return (
    <tr className="border-b">
      <td className="lg:px-1 flex items-center gap-1 py-4 md:gap-3">
        <div className="bg-slate-100 rounded-lg min-w-14 h-14 relative lg:w-[75px] lg:h-[75px]"></div>
        <div>
          <h5 className="font-medium mt-2  lg:mt-0 text-sm ">
            Luxury Punjabi
            <span className={`text-sm font-normal`}>-XL</span>
          </h5>
          <p className="text-[#8C8C8C] text-[10px] md:text-sm md:text-[16px]">
            <span className="md:hidden">/{1500}৳</span>
          </p>
        </div>
      </td>
      <td className="lg:px-1 py-4 text-sm text-[#102515] md:text-[16px] dark:text-white">
        <p className="hidden md:block ">{1500}৳</p>
      </td>
      <td className="lg:px-1 py-4 text-sm font-bold text-right md:text-[16px]">
        <div className="flex items-center gap-3 border p-2 w-fit md:px-3 xl:gap-4">
          <button>-</button>1 <button>+</button>
        </div>
      </td>
      <td className="lg:px-1 py-4 text-sm text-[#102515] md:text-[16px] dark:text-white">
        {1500}৳
      </td>

      <td className="lg:px-1 py-4 text-sm md:text-[16px]">
        <MdDelete className="text-red-600" />
      </td>
    </tr>
  );
};

const CartPage = () => {
  return (
    <div className="my-10 space-y-10 md:space-y-16 md:my-16 xl:space-y-20">
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
              {[...new Array(2)].map((i, idx) => (
                <TableRow key={idx} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-100 w-full lg:w-2/5">
          <div className="p-5">
            <h3 className=" font-semibold mt-3 xl:mb-5 xl:text-lg">Cart Total</h3>
            <div className="space-y-5">
              <div className="text-sm flex justify-between">
                <span>Subtotal</span>
                <span className="text--[#C2A466]">৳ 3000</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>Vat</span>
                <span className="text--[#C2A466]">৳ 0</span>
              </div>
              <div className="text-sm flex justify-between">
                <span>Total</span>
                <span className="text--[#C2A466]">৳ 3000</span>
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
    </div>
  );
};

export default CartPage;
