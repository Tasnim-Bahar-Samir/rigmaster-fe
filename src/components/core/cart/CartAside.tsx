'use client';
import { Drawer } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { MdDelete, MdOutlineShoppingBag } from 'react-icons/md';

const CartAside = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="">
        <span onClick={() => setOpen(!open)} className="relative cursor-pointer">
          <MdOutlineShoppingBag className="w-6 h-6 xl:w-7 xl:h-7" />
          <span className="absolute bg-red-500 text-white rounded-full px-1 top-0 left-0 text-xs">
            2
          </span>
        </span>
      </div>
      <Drawer anchor={'right'} open={open} onClose={() => setOpen(!open)}>
        <div className=" w-80 p-5 h-full dark:text-white dark:bg-[#183423]">
          <div className="flex justify-between items-center border-b">
            <span className="cursor-pointer text-lg font-medium" onClick={() => setOpen(!open)}>
              x
            </span>
            <h1 className="font-bold text-2xl">Cart</h1>
          </div>
          <div className="mt-3">
            <ul className="flex mt-4 flex-col gap-5">
              {[...new Array(2)].map(() => (
                <div className="flex items-center justify-between" key={Math.random()}>
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-200 w-16 h-16"></div>
                    <div className="flex flex-col gap-2">
                      <h5 className="font-medium text-sm xl:text-[16px]">Luxury Punjabi-XL</h5>
                      <p className="text-sm">
                        Qty: <span className="text-slate-500">1</span>
                      </p>
                      <p className="text-sm text-[#C2A466]">৳ 1500</p>
                    </div>
                  </div>
                  <MdDelete className="text-red-600" />
                </div>
              ))}
            </ul>
            <div className="space-y-3 absolute w-[90%] bottom-4 left-4">
              <Link
                href={'/cart'}
                className="px-4 inline-block text-center gap-1 w-full py-2 bg-[black] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4"
              >
                View Cart
              </Link>
              <Link
                href={'/checkout'}
                className="px-4 inline-block text-center w-full gap-1 py-2 bg-[black] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CartAside;
