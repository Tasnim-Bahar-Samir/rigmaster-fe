'use client';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { SearchSection } from './DefaultNavbar';
import { nav_categoryData } from '@/data/dummy.data';

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
            <h1 className="font-bold text-2xl">LOGO</h1>
            <span className="cursor-pointer" onClick={() => setOpen(!open)}>
              x
            </span>
          </div>
          <div className="mt-3">
            <SearchSection />
            <ul className="flex mt-4 flex-col ">
              {nav_categoryData.map((i) => (
                <li className="py-3 inline-block border-b" key={Math.random()}>
                  {i}
                </li>
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
