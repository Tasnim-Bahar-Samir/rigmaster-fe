'use client';
import { selectedProductStore } from '@/store/ProductCookiesStore';
import { CartDataType } from '@/type/cart.type';
import { Drawer } from '@mui/material';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { MdDelete, MdOutlineShoppingBag } from 'react-icons/md';

const CartAside = () => {
  const { cartOpen, setCartOpen } = selectedProductStore();
  const { products, deleteSingleProduct } = selectedProductStore();
  return (
    <div>
      <div className="">
        <Link href={'/cart'} className="relative cursor-pointer">
          <MdOutlineShoppingBag className="w-6 h-6 xl:w-7 xl:h-7" />
          <span className="absolute bg-red-500 text-white rounded-full px-1 top-0 left-0 text-xs">
            {products?.length}
          </span>
        </Link>
      </div>
      <Drawer anchor={'right'} open={cartOpen} onClose={() => setCartOpen(!cartOpen)}>
        <div className=" w-80 p-5 h-full md:w-96">
          <div className="flex justify-between items-center border-b">
            <span
              className="cursor-pointer text-lg font-medium"
              onClick={() => setCartOpen(!cartOpen)}
            >
              x
            </span>
            <h1 className="font-bold text-2xl">Cart</h1>
          </div>
          <div className="mt-3">
            <ul className="flex h-[70vh] overflow-y-auto mt-4 flex-col gap-5">
              {products?.map((i: CartDataType) => (
                <div className="flex items-center justify-between" key={Math.random()}>
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-200 w-16 h-16 relative">
                      <Image src={i.thumbnail} layout="fill" objectFit="cover" alt="poduct_image" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h5 className="font-medium text-sm xl:text-[16px]">
                        {i.title}- <span className="uppercase">{i.sizeTitle}</span>
                      </h5>
                      <p className="text-sm">
                        Color: <span className="text-slate-500">{i.color}</span>
                      </p>
                      <p className="text-sm">
                        Qty: <span className="text-slate-500">{i.quantity}</span>
                      </p>
                      <p className="text-sm text-[#C2A466]">৳ {i.price}</p>
                    </div>
                  </div>
                  <MdDelete
                    size={18}
                    onClick={() => deleteSingleProduct(i.id)}
                    className="text-red-600 cursor-pointer"
                  />
                </div>
              ))}
            </ul>
            <div className="space-y-3 absolute w-[90%] bottom-4 left-4">
              <Link
                onClick={() => setCartOpen(false)}
                href={'/cart'}
                className="px-4 inline-block text-center gap-1 w-full py-2 bg-[black] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4"
              >
                View Cart
              </Link>
              <Link
                onClick={() => setCartOpen(false)}
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
