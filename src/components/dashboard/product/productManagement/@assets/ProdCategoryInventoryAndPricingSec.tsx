import { FC } from 'react';
import {
  ProdCategoryAutoCompleteFiled,
  ProductColorFiled,
  ProductPricingFiled,
} from './AddProductInputFields';

type ProdCategoryInventoryAndPricingSecProps = {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  setFieldValue: any;
};
const ProdCategoryInventoryAndPricingSec: FC<ProdCategoryInventoryAndPricingSecProps> = ({
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
}) => {
  // console.log(values.category)
  return (
    <div>
      <div className="bg-[#F5F5F5] rounded-2xl p-4">
        <h3 className="text-xl font-semibold pb-6 md:text-2xl">Select Category</h3>
        <ProdCategoryAutoCompleteFiled
          values={values}
          setValue={(e: any) => setFieldValue('category', e)}
          errors={errors}
          touched={touched}
        />
      </div>
      {/* pricing section */}
      <div className="bg-[#F5F5F5] rounded-2xl p-4 mt-8">
        <h3 className="text-xl font-semibold pb-6 md:text-2xl">Color & Pricing*</h3>
        <ProductPricingFiled
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
        />

        <div className="py-4">
          <ProductColorFiled
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProdCategoryInventoryAndPricingSec;
