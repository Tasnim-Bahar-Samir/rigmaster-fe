import { nav_categoryData } from '@/data/dummy.data';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const SocialSection = () => {
  return (
    <ul>
      <li>
        <Link href={'https://www.facebook.com/'} target="_blank">
          <FaFacebook />
        </Link>
      </li>
    </ul>
  );
};

const DefaultFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="sticky rm-commonContainer w-full top-[100vh] py-10 xl:py-20">
      <div className="flex flex-col justify-between items-center gap-7 text-center lg:gap-5 lg:text-start lg:flex-row lg:items-start">
        <div className="space-y-4 max-w-[240px] md:gap-y-5 xl:space-y-7">
          <h4 className="font-bold text-2xl">LOGO</h4>
          <p className="text-sm xl:text-[16px]">
            Welcome to Rig Master! As a brand, we stand for heritage & contemporary styling. We
            believe, fabulous quality should be affordable!
          </p>
        </div>
        <div className="space-y-4 md:gap-y-5 xl:space-y-7">
          <h5 className="font-medium xl:text-lg">Categories</h5>
          <ul className="flex flex-col gap-3 text-sm xl:gap-4">
            {nav_categoryData.map((i) => (
              <li className="hover:underline" key={Math.random()}>
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 md:gap-y-5 xl:space-y-7">
          <h5 className="font-medium xl:text-lg">Quick Links</h5>
          <ul className="flex flex-col gap-3 text-sm xl:gap-4">
            <li className="hover:underline">Contact Us</li>
            <li className="hover:underline">Terms and Conditions</li>
            <li className="hover:underline">Privacy Policy</li>
          </ul>
        </div>
        <div className="space-y-4 md:gap-y-5 xl:space-y-7">
          <h5 className="font-medium xl:text-lg">Contact Info</h5>
          <ul className="flex flex-col gap-3 text-sm xl:gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MdEmail />
                example@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <FaPhone />
                01244569877
              </div>
            </div>
            <SocialSection />
          </ul>
        </div>
      </div>
      <p className="h-[0.5px] my-7 bg-slate-200"></p>
      <p className="text-center text-sm xl:text-[16px]">{`© Copyright ${year} TalentTracker, All right reserved.`}</p>
    </footer>
  );
};

export default DefaultFooter;
