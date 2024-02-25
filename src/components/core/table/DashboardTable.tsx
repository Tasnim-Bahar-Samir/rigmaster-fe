import { CircularProgress } from '@mui/material';
import React, { FC } from 'react';

export type DashboardTableColumn = {
  title: string;
  dataKey: string;
  row: (data: any) => React.ReactNode;
};

export type DashboardTableProps = {
  columns: DashboardTableColumn[];
  data: any[];
  isLoading: boolean;
};

const DashboardTable: FC<DashboardTableProps> = ({ columns, data, isLoading }) => {
  return (
    <div className=" mx-auto overflow-x-auto overflow-hidden relative border border-tt-blue-200 rounded-[20px] ">
      <div className="w-full overflow-y-auto ">
        <table className="w-full text-left text-tt-blue-900">
          <thead className="sticky z-10 top-0 w-full h-fit bg-tt-blue-50 border-[0.5px] rounded-[15px]">
            <tr className="border border-tt-blue-200 ">
              {columns.map((column, index) => (
                <th key={index} scope="col" className="px-[22px] tableAction  py-6">
                  <p className="max-w-[400px]">{column.title}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" w-full bg-white  ">
            <>
              {!isLoading &&
                data &&
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-tt-blue-200 ">
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="px-[22px] py-[18px] h-fit  max-w-[350px] ">
                        {column.row(row)}
                      </td>
                    ))}
                  </tr>
                ))}
            </>
          </tbody>
        </table>
        {isLoading && (
          <div className="flex justify-center items-center h-44 mt-6 overflow-y-hidden">
            <CircularProgress size={24} />
          </div>
        )}
        {!isLoading && data?.length === 0 && (
          <div className="flex justify-center items-center my-6 overflow-y-hidden">
            <p className="text-14-medium">No Data Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTable;
