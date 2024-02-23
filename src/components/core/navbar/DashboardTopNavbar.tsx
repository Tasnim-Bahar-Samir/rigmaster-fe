import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
// import { signOut } from "next-auth/react";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
// import { MobileSideMenu } from "./DashAsideNav";

const DashboardTopNav = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white ">
      <div className="pr-3 lg:pr-7 lg:mt-4">
        <div className="flex  pt-5 lg:items-start">
          <div className=" pb-3 rounded-tr-xl rounded-tl-xl md:px-3 lg:min-w-[288px] lg:bg-[#F5F5F5] lg:pt-7 ">
            <div className="w-[120px] h-[30px] md:w-[194px] mx-auto md:h-[54px] relative">
              <Link href="/" className=" ">
                <Image src={'/images/logos/logo2.webp'} alt="logo" layout="fill" />
              </Link>
            </div>
          </div>
          <div className="flex justify-between  items-center w-full pb-6 pl-4 md:pl-7">
            <div className="flex gap-3 md:gap-6">
              <div className="flex gap-2">
                <span className="p-2 cursor-pointer bg-[#878787] hover:bg-[#267D3E] rounded-md border text-white">
                  <HiArrowNarrowLeft className="text-sm md:text-xl" />
                </span>

                <span className="p-2 cursor-pointer bg-[#878787] hover:bg-[#267D3E] rounded-md border text-white">
                  <HiArrowNarrowRight className="text-sm md:text-xl" />
                </span>
              </div>
              <h2 className="text-xl font-bold  mr-3 md:mr-0 md:text-4xl">Overview</h2>
            </div>
            <div className="hidden lg:block">
              <SignOut />
            </div>
            {/* <div className="mr-3 lg:hidden">
              <MobileSideMenu />
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardTopNav;

export const SignOut = () => {
  return (
    <div className="flex mt-auto justify-between items-center mr-3 lg:mr-7 ">
      <div className="flex gap-2 items-center">
        <span className="w-12 h-12 rounded-full bg-[#878787]"></span>
        <div>
          <h4 className="text-lg font-bold w-32">Admin Login</h4>
          <p className="text-sm mt-1 ">Rigmaster</p>
        </div>
      </div>
      <div>
        <FiLogOut className="font-bold cursor-pointer" size={20} />
      </div>
    </div>
  );
};
// signOut({ callbackUrl: "/" })
