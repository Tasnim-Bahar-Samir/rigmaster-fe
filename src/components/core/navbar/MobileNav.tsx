'use client';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { SearchSection } from './DefaultNavbar';
import { nav_categoryData } from '@/data/dummy.data';
import Image from 'next/legacy/image';
import Link from 'next/link';

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="lg:hidden">
        <GiHamburgerMenu
          onClick={() => setOpen(!open)}
          className="w-5 h-5 cursor-pointer lg:hidden"
        />
      </div>
      <Drawer anchor={'left'} open={open} onClose={() => setOpen(!open)}>
        <div className=" w-72 p-5 h-full dark:text-white dark:bg-[#183423]">
          <div className="flex justify-between items-center border-b">
            <Link href={'/'}>
              <Image src={'/images/logos/logo2.webp'} width={120} height={30} alt="RIGMASTER" />
            </Link>
            <span className="cursor-pointer" onClick={() => setOpen(!open)}>
              x
            </span>
          </div>
          <div className="mt-3">
            <SearchSection />
            <ul className="flex mt-4 flex-col ">
              {nav_categoryData.map((i) => (
                <Link
                  href={'/product-category/eid-collection'}
                  className="py-3 inline-block border-b"
                  key={Math.random()}
                >
                  {i}
                </Link>
              ))}
            </ul>
          </div>
          {/* <div className="flex justify-between items-center mt-12">
            <AccountIcon />
            <WishListIcon />
            <CartIcon />
          </div> */}

          {/* <div className="my-8">
            <SearchInputForm />
          </div> */}
        </div>
      </Drawer>
    </div>
  );
};

export default MobileNav;
