'use client';
import { Drawer } from '@mui/material';
import { GiHamburgerMenu } from 'react-icons/gi';
import { SearchSection } from './DefaultNavbar';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useGetCategoryData } from '@/hooks/productCategory.hook';

const MobileNav = ({ open, setOpen }: { open: boolean; setOpen: Function }) => {
  const { data, isLoading } = useGetCategoryData();
  return (
    <div>
      <div className="lg:hidden">
        <GiHamburgerMenu
          onClick={() => setOpen(!open)}
          className="w-5 h-5 cursor-pointer lg:hidden"
        />
      </div>
      <Drawer anchor={'left'} open={open} onClose={() => setOpen(!open)}>
        <div className=" w-72 p-5 h-full ">
          <div className="flex justify-between items-center border-b">
            <Link href={'/'}>
              <Image
                priority
                src={'/images/logos/logo2.webp'}
                width={120}
                height={30}
                alt="RIGMASTER"
              />
            </Link>
            <span className="cursor-pointer" onClick={() => setOpen(!open)}>
              x
            </span>
          </div>
          <div className="mt-3">
            <SearchSection setOpen={setOpen} />
            <ul className="flex mt-4 flex-col ">
              {isLoading
                ? [...new Array(5)].map(() => (
                    <p key={Math.random()} className="h-4 bg-slate-200 w-4/5"></p>
                  ))
                : data?.results?.map((i: any) => (
                    <Link
                      href={`/product-category/${i?.slug}`}
                      className="py-3 inline-block border-b"
                      key={Math.random()}
                    >
                      {i?.title}
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
