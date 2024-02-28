import { Pagination } from '@mui/material';
import React, { FC } from 'react';

type ProductPaginationProps = {
  count: number;
  currentPage: number;
  setCurrentPage: Function;
};

const ProductPagination: FC<ProductPaginationProps> = ({ count, currentPage, setCurrentPage }) => {
  return (
    <div>
      <Pagination
        page={currentPage}
        onChange={(_e, value) => setCurrentPage(value)}
        count={count}
      />
    </div>
  );
};

export default ProductPagination;
