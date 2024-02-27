'use client';
import { useSearchParams } from 'next/navigation';
import ShopPage from '../shop/Shop.page';
import HomePageContainer from './HomePageContainer';

const HomePage = () => {
  const params = useSearchParams().toString();

  return <div>{params ? <ShopPage /> : <HomePageContainer />}</div>;
};

export default HomePage;
