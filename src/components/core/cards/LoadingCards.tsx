export const CategoryLoadingCard = () => {
  return (
    <div className="border block w-full rounded-md p-2">
      <div className="w-full h-[122px] bg-slate-200 md:h-[200px]"></div>
      <div className="h-5 rounded-md w-4/5 bg-slate-200 mx-auto my-3"></div>
    </div>
  );
};

export const ProductLoadingCard = () => {
  return (
    <div className="">
      <div className="w-full h-[170px] bg-slate-200 md:h-[250px] lg:h-[398px]"></div>
      <div className="space-y-4">
        <div className="h-5 rounded-md w-4/5 bg-slate-200 my-3"></div>
        <div className="h-5 rounded-md w-3/5 bg-slate-200 my-3"></div>
      </div>
    </div>
  );
};
