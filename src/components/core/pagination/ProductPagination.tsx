import { Pagination } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FC, useCallback } from 'react';

type ProductPaginationProps = {
  count: number;
};

const ProductPagination: FC<ProductPaginationProps> = ({ count }) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const handlePage = useCallback(
    (value: any) => {
      let q: any = {};
      searchParams.forEach((_value, _key) => {
        q[_key] = searchParams.get(_key)?.split(',');
      });
      q['page'] = value;

      const createQueryString = Object.entries(q)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      push(pathname + '?' + createQueryString);
    },
    [searchParams, pathname, push],
  );

  return (
    <div>
      <Pagination
        page={Number(searchParams?.get('page')) || 1}
        onChange={(_e, value) => handlePage(value)}
        count={count}
      />
    </div>
  );
};

export default ProductPagination;
