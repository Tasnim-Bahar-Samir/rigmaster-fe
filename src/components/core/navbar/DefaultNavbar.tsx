import { nav_categoryData } from '@/data/dummy.data';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoSearchOutline } from 'react-icons/io5';
import { MdOutlineShoppingBag } from 'react-icons/md';

const DefaultNavbar = () => {
  return (
    <nav className="bg-slate-100 py-4 ">
      <div className="rm-commonContainer flex items-center justify-between">
        <GiHamburgerMenu className="w-5 h-5 lg:hidden" />
        <div>
          <h1 className="font-bold text-2xl">LOGO</h1>
        </div>
        <div className="items-center gap-4 hidden lg:flex xl:gap-5">
          {nav_categoryData.map((i) => (
            <Link href={'#'} key={Math.random()}>
              {i}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <IoSearchOutline className="w-5 h-5 cursor-pointer xl:w-6 xl:h-6" />
          <MdOutlineShoppingBag className="w-5 h-5 cursor-pointer xl:w-6 xl:h-6" />
        </div>
      </div>
    </nav>
  );
};

export default DefaultNavbar;
