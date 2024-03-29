'use client';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import { IoSearchOutline } from 'react-icons/io5';
import MobileNav from './MobileNav';
import CartAside from '../cart/CartAside';
import Image from 'next/legacy/image';
import { useGetCategoryData } from '@/hooks/productCategory.hook';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

const CategoryMenu = () => {
  const { data, isLoading } = useGetCategoryData('', 10, 0);
  return (
    <div className="items-center justify-center gap-4 text-white hidden py-3 bg-[#C2A466] flex-wrap lg:flex xl:gap-5">
      {isLoading
        ? [...new Array(5)].map(() => <p key={Math.random()} className="h-4 bg-slate-200 w-10"></p>)
        : data?.results?.map((i: any) => (
            <Link href={`/product-category/${i.slug}`} key={Math.random()}>
              {i.title}
            </Link>
          ))}
    </div>
  );
};

export const SearchSection = ({ setOpen }: { setOpen?: Function }) => {
  const pathname = usePathname();

  const { push } = useRouter();
  const searchParams = useSearchParams();
  const handleSearch = useCallback(
    (e: any) => {
      push(
        pathname.includes('shop') || pathname.includes('product-category')
          ? pathname + '?' + `search=${e.target.search.value}`
          : '/?' + `search=${e.target.search.value}`,
      );
    },
    [pathname, push],
  );
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setOpen && setOpen(false);
        handleSearch(e);
      }}
      className="bg-slate-100 flex w-full items-center gap-2 p-3"
    >
      <input
        name="search"
        type="text"
        defaultValue={searchParams?.get('search') || ''}
        className="h-full w-full bg-inherit outline-none"
        placeholder="Search.."
      />
      <button>
        <IoSearchOutline className="w-5 h-5 cursor-pointer xl:w-6 xl:h-6" />
      </button>
    </form>
  );
};
const DefaultNavbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 bg-white z-10">
      <div className="py-4 ">
        <div className="rm-commonContainer flex justify-between items-center lg:grid lg:grid-cols-3">
          <div className="lg:hidden">
            <MobileNav open={open} setOpen={setOpen} />
          </div>
          <div className="max-w-[150px] md:max-w-full">
            <Link className="" href={'/'}>
              <Image
                priority
                src={'/images/logos/logo2.png'}
                width={230}
                height={55}
                alt="RIGMASTER"
              />
            </Link>
          </div>
          <div className="items-center w-full gap-4 hidden lg:flex xl:gap-5">
            <SearchSection setOpen={setOpen} />
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
