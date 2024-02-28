import { getImgToB64 } from '@/libs/getImgToB64';
import Image from 'next/legacy/image';
import React, { FC, useState } from 'react';

type DashboardImgUpFieldProps = {
  width: number;
  height: number;
  setValue?: any;
  error?: any;
  value?: any;
  isBg?: boolean;
};

const DashboardImgUpField: FC<DashboardImgUpFieldProps> = ({
  setValue,
  error,
  value,
  width,
  height,
}) => {
  const [prevImg, setPrevImg] = useState<string | null>();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          // const newFileName =
          //   Math.random().toString() + '-' + new Date(new Date().getTime()).toISOString()+selectedFile.type;
          // const renamedFile = new File([selectedFile], newFileName, { type: selectedFile.type });

          // Now 'renamedFile' has the new file name
          setValue(selectedFile);
          const _ = await getImgToB64(selectedFile);
          setPrevImg(_);
        }
      }
    } catch (error) {
      {
        console.error(error);
      }
    }
  };
  // console.log(value.size)
  return (
    <div>
      {
        <div className="flex items-center justify-between border border-dashed border-tt-blue-200 px-9 py-7 rounded-[20px]">
          <div className="flex items-center gap-3">
            <div className={`w-[100px] h-[100px] relative rounded-md bg-slate-200`}>
              {(prevImg || value) && (
                <Image
                  className="object-contain  w-full rounded-[15px]"
                  src={prevImg || value}
                  objectFit={'cover'}
                  layout="fill"
                  alt="icon"
                />
              )}
            </div>
            <div>
              <p className="text-sm text-tt-white-900">
                Image Size{' '}
                <span className="text-slate-700">
                  {width}px {height}px
                </span>
              </p>
              <p className="text-lg text-tt-white-900">
                Maximum <span className="text-tt-blue-500">1mb Allow</span>
              </p>
            </div>
          </div>
          <label
            htmlFor="dropzone-file"
            className="rounded-[10px] border border-tt-blue-500 hover:border-tt-blue-700 text-tt-blue-500 hover:text-tt-blue-700  py-[14px] px-6 md:px-[30px] md:py-[16px] xl:py-[18px]  disabled:border-tt-white-800"
          >
            Browse
          </label>
        </div>
      }

      <input
        onChange={handleFileChange}
        name="file"
        id="dropzone-file"
        type="file"
        accept="image/*"
        className="hidden"
      />
      <p className="text-red-400 mt-6 text-center">{error}</p>
    </div>
  );
};

export default DashboardImgUpField;
