import { CategoryResponseType, useGetCategoryData } from '@/hooks/productCategory.hook';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaPhone, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const SocialSection = () => {
  return (
    <ul className="flex items-center gap-3 xl:gap-4">
      <li className="bg-[#C2A466] rounded-full p-2 text-white w-fit hover:bg-black transition-all">
        <Link href={'https://www.facebook.com/'} target="_blank">
          <FaFacebook size={18} />
        </Link>
      </li>
      <li className="bg-[#C2A466] rounded-full p-2 text-white w-fit hover:bg-black transition-all">
        <Link href={'https://www.instagram.com/'} target="_blank">
          <FaInstagram size={18} />
        </Link>
      </li>
      <li className="bg-[#C2A466] rounded-full p-2 text-white w-fit hover:bg-black transition-all">
        <Link href={'https://twitter.com/'} target="_blank">
          <FaTwitter size={18} />
        </Link>
      </li>
      <li className="bg-[#C2A466] rounded-full p-2 text-white w-fit hover:bg-black transition-all">
        <a aria-label="Chat on WhatsApp" href="https://wa.me/+880 1572-241894" target="_blank">
          <FaWhatsapp size={18} />
        </a>
      </li>
    </ul>
  );
};

const DefaultFooter = () => {
  const { data, isLoading } = useGetCategoryData('', 5, 0);
  const year = new Date().getFullYear();
  return (
    <footer className="sticky rm-commonContainer w-full top-[100vh] pt-10 pb-5 xl:pt-20">
      <div className="flex flex-col justify-between items-center gap-7 text-center lg:gap-5 lg:text-start lg:flex-row lg:items-start">
        <div className="space-y-4 max-w-[240px] md:gap-y-5 xl:space-y-6">
          <Link className="mx-auto w-fit inline-block lg:mx-0" href={'/'}>
            {' '}
            <Image
              priority
              src={'/images/logos/logo2.png'}
              width={200}
              height={50}
              alt="RIGMASTER"
            />
          </Link>
          <p className="text-sm xl:text-[16px]">
            Welcome to Rig Master! As a brand, we stand for heritage & contemporary styling. We
            believe, fabulous quality should be affordable!
          </p>
        </div>
        <div className="space-y-4 md:gap-y-5 xl:space-y-7">
          <h5 className="font-medium xl:text-lg">Categories</h5>
          <ul className="flex flex-col gap-3 text-sm xl:gap-4">
            {isLoading
              ? [...new Array(5)].map(() => (
                  <p key={Math.random()} className="w-20 h-5 bg-slate-100"></p>
                ))
              : data?.results.map((i: CategoryResponseType) => (
                  <Link
                    href={`/product-category/${i.slug}`}
                    className="cursor-pointer hover:underline"
                    key={Math.random()}
                  >
                    {i.title}
                  </Link>
                ))}
          </ul>
        </div>
        <div className="space-y-4 md:gap-y-5 xl:space-y-7">
          <h5 className="font-medium xl:text-lg">Quick Links</h5>
          <ul className="flex flex-col gap-3 text-sm xl:gap-4">
            <Link href={'/contact-us'} className="hover:underline">
              Contact Us
            </Link>
            <Link href={'#'} className="hover:underline">
              Terms and Conditions
            </Link>
            <Link href={'#'} className="hover:underline">
              Privacy Policy
            </Link>
          </ul>
        </div>
        <div className="space-y-4 md:gap-y-5 xl:space-y-7">
          <h5 className="font-medium xl:text-lg">Contact Info</h5>
          <ul className="flex flex-col gap-3 text-sm xl:gap-4">
            <div className="space-y-2">
              <a href="mailto: example@gmail.com" className="flex items-center gap-2">
                <MdEmail className="text-[#C2A466]" />
                rigmasteronline@gmail.com
              </a>
              <a href="tel:09606-999910" className="flex items-center gap-2">
                <FaPhone className="text-[#C2A466]" />
                09606-999910
              </a>
            </div>
            <SocialSection />
          </ul>
        </div>
      </div>
      <p className="h-[0.5px] my-7 bg-slate-200"></p>
      <p className="text-center text-sm xl:text-[16px]">{`© Copyright ${year} Rigmaster, All right reserved.`}</p>
    </footer>
  );
};

export default DefaultFooter;
