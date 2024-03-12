'use client';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdDashboard } from 'react-icons/md';
import { RiListUnordered } from 'react-icons/ri';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaRegFileArchive } from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';

const AsideMenu = () => {
  //   const router = useRouter();
  const pathname = usePathname();
  return (
    <ul className="">
      <li className="font-semibold lg:text-xl">
        <Link className="flex gap-2.5 items-center" href="/dashboard">
          <MdDashboard /> Dashboard
        </Link>
      </li>
      <li className=" py-2 mt-4 lg:text-lg">
        <Accordion
          sx={{
            backgroundColor: '#F5F5F5',
            width: '240px',
            boxShadow: 'none',
            borderRadius: 'none',
            margin: '-8px 0',
          }}
        >
          <AccordionSummary
            sx={{ padding: '0px' }}
            expandIcon={<ExpandMoreIcon sx={{}} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              sx={{
                margin: '0px',
                padding: '0px',
                //   color:`${active?'#EAA41D':''}`
              }}
            >
              <span className="flex items-center gap-2.5">
                <GiClothes className="text-2xl" />
                <span className="lg:text-lg">Product</span>
              </span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '0px' }}>
            <ul className="space-y-3 ml-6">
              <li
                className={`list-disc ${
                  pathname === '/dashboard/product/size' ? 'text-[#C2A466]' : ''
                }`}
              >
                <Link href="/dashboard/product/size">Size</Link>
              </li>
              <li
                className={`list-disc ${
                  pathname === '/dashboard/product/category' ? 'text-[#C2A466]' : ''
                }`}
              >
                <Link href="/dashboard/product/category">Category</Link>
              </li>
              <li
                className={`list-disc ${
                  pathname === '/dashboard/product/add-product' ? 'text-[#C2A466]' : ''
                }`}
              >
                <Link href="/dashboard/product/add-product">Add Product</Link>
              </li>
              <li
                className={`list-disc ${
                  pathname === '/dashboard/product/all' ? 'text-[#C2A466]' : ''
                }`}
              >
                <Link href="/dashboard/product/all">Product List</Link>
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
      </li>
      <li className={` text-lg mt-5 ${pathname === '/dashboard/orders' ? 'text-[#C2A466]' : ''}`}>
        <Link href="/dashboard/orders">
          <span className="flex items-center gap-2.5">
            <RiListUnordered className="text-2xl" />
            <span className="lg:text-lg">All Orders</span>
          </span>
        </Link>
      </li>
      <li
        className={` text-lg mt-5 ${pathname === '/dashboard/orders/archive' ? 'text-[#C2A466]' : ''}`}
      >
        <Link href="/dashboard/orders/archive">
          <span className="flex items-center gap-2.5">
            <FaRegFileArchive className="text-2xl" />
            <span className="lg:text-lg">Cancelled Orders</span>
          </span>
        </Link>
      </li>
    </ul>
  );
};

// main component
const DashBoardAside = () => {
  return (
    <aside
      id="logo-sidebar"
      className="fixed bg-[#F5F5F5] top-16 rounded-br-xl rounded-bl-xl left-50 bottom-3 z-40 w-72  pt-24 transition-transform -translate-x-fullborder-r border-gray-200  hidden lg:block lg:bottom-7 md:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col px-5 pb-4 overflow-y-auto">
        <AsideMenu />
      </div>
    </aside>
  );
};

export default DashBoardAside;
