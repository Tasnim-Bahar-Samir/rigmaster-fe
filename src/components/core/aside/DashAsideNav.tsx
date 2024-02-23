'use client';
import Link from 'next/link';
import { MdDashboard } from 'react-icons/md';

const AsideMenu = () => {
  //   const router = useRouter();
  return (
    <ul className="">
      <li className="font-semibold lg:text-xl">
        <Link className="flex gap-2.5 items-center" href="/dashboard">
          <MdDashboard /> Dashboard
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
