'use client';
import { nav_categoryData } from '@/data/dummy.data';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import MobileNav from './MobileNav';
import CartAside from '../cart/CartAside';
import Image from 'next/legacy/image';

const CategoryMenu = () => {
  return (
    <div className="items-center justify-center gap-4 text-white hidden py-3 bg-[#C2A466] lg:flex xl:gap-5">
      {nav_categoryData.map((i) => (
        <Link href={'/product-category/eid-collection'} key={Math.random()}>
          {i}
        </Link>
      ))}
    </div>
  );
};

export const SearchSection = () => {
  return (
    <div className="bg-slate-100 flex w-full items-center gap-2 p-3">
      <input type="text" className="h-full w-full bg-inherit outline-none" placeholder="Search.." />
      <IoSearchOutline className="w-5 h-5 cursor-pointer xl:w-6 xl:h-6" />
    </div>
  );
};
const DefaultNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-10">
      <div className="py-4 ">
        <div className="rm-commonContainer flex justify-between items-center lg:grid lg:grid-cols-3">
          <div className="lg:hidden">
            <MobileNav />
          </div>
          <Link href={'/'}>
            <Image
              priority
              src={'/images/logos/logo2.webp'}
              width={120}
              height={30}
              alt="RIGMASTER"
            />
          </Link>
          <div className="items-center w-full gap-4 hidden lg:flex xl:gap-5">
            <SearchSection />
          </div>
          <div className="flex justify-end items-center gap-4">
            <div>
              <CartAside />
            </div>
            <Link
              href={'/shop'}
              className="px-4 flex items-center gap-1 py-2 bg-[#C2A466] text-white hover:bg-[#d6ba81] transition-all font-medium xl:px-8 xl:py-4"
            >
              Shop <FiShoppingCart />
            </Link>
          </div>
        </div>
      </div>
      <CategoryMenu />
    </nav>
  );
};

export default DefaultNavbar;
