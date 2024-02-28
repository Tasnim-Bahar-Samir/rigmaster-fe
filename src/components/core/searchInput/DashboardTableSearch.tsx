import { FC } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

type DashboardTableSearchProps = {
  setSearchValue: Function;
};
const DashboardTableSearch: FC<DashboardTableSearchProps> = ({ setSearchValue }) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchValue(e.target.search.value);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    e.target.value == '' && setSearchValue(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="border border-tt-blue-200 w-fit px-5  text-tt-blue-200 rounded-[10px] flex items-center gap-2.5">
        <input
          onChange={handleChange}
          name="search"
          type="text"
          placeholder="Search"
          className="max-w-[200px] outline-none bg-inherit py-3 text-tt-blue-900 placeholder:text-tt-blue-200"
        />
        <button type="submit">
          <IoSearchOutline className="w-5 h-5 cursor-pointer xl:w-6 xl:h-6" />
        </button>
      </div>
    </form>
  );
};

export default DashboardTableSearch;
