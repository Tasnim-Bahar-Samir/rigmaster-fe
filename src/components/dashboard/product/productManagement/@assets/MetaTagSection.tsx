import { TextField } from '@mui/material';
import React, { FC } from 'react';
import { ProductMetaDescriptionFiled } from './AddProductInputFields';

type MetaTagSectionProps = {
  values: any;
  handleChange: any;
  touched: any;
  errors: any;
};
const MetaTagSection: FC<MetaTagSectionProps> = ({ values, handleChange, touched, errors }) => {
  return (
    <div className="flex flex-col space-y-5">
      <TextField
        size="small"
        value={values.slug}
        error={touched.slug && Boolean(errors.slug)}
        helperText={touched.slug && errors.slug}
        className="w-full"
        name="slug"
        onChange={handleChange}
        label="Slug"
      />
      <div className="">
        <ProductMetaDescriptionFiled
          values={values}
          handleChange={handleChange}
          errors={errors}
          touched={touched}
        />
      </div>
      {/* <div>
        {values.og_image ? (
          <div
            className="w-24 my-2 bg-cover bg-center bg-no-repeat h-24"
            style={{ backgroundImage: `url(${values.og_image})` }}
          ></div>
        ) : (
          ''
        )}
        <label className="">
          <div className="text-center bg-[#F5F5F5] rounded-lg p-2 w-40">
            <div className=" flex flex-col items-center p-5 justify-center rounded-lg w-full border border-dashed transition cursor-pointer border-gray-400">
              <div>
                <p className="font-medium text-xs">Meta Img</p>
                <p className="text-[#9A9A9A] text-sm font-semibold">1200 X 628</p>
                <p className="text-xs text-[#267D3E]">Add photos or drag and drop</p>
              </div>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e)}
            name="og_image"
            className="hidden"
          ></input>
        </label>
        {touched.og_image && Boolean(errors.og_image) && (
          <p className="text-red-600 text-sm" role="alert">
            {touched.og_image && errors.og_image}
          </p>
        )}
      </div> */}
    </div>
  );
};

export default MetaTagSection;
