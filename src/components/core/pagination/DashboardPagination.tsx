import { Pagination } from '@mui/material';
import React, { FC } from 'react';

type DashboardPaginationProps = {
  count: number;
  currentPage: number;
  setCurrentPage: Function;
};

const DashboardPagination: FC<DashboardPaginationProps> = ({
  count,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div>
      <Pagination
        page={currentPage}
        onChange={(_e, value) => setCurrentPage(value)}
        count={count}
        shape="rounded"
      />
    </div>
  );
};

export default DashboardPagination;
