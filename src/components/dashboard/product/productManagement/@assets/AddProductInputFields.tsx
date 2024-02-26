import { Autocomplete, TextField } from '@mui/material';
import { FC, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useGetSizeData } from '@/hooks/productSize.hooks';
import { useGetCategoryData } from '@/hooks/productCategory.hook';

type InputFieldProps = {
  values: any;
  handleChange?: any;
  touched: any;
  setValue?: any;
  errors: any;
};

export const ProductTitleFiled: FC<InputFieldProps> = ({
  values,
  handleChange,
  touched,
  errors,
}) => {
  return (
    <div className="w-full">
      <TextField
        size="small"
        value={values.title}
        error={touched.title && Boolean(errors.title)}
        helperText={touched.title && errors.title}
        className="w-full"
        name="title"
        onChange={handleChange}
        label="Title"
      />
    </div>
  );
};

export const ProductMetaDescriptionFiled: FC<InputFieldProps> = ({
  values,
  handleChange,
  touched,
  errors,
}) => {
  return (
    <div className="w-full">
      <TextField
        size="small"
        value={values.meta_description}
        error={touched.meta_description && Boolean(errors.meta_description)}
        helperText={touched.meta_description && errors.meta_description}
        className="w-full"
        name="meta_description"
        onChange={handleChange}
        label="Short Description (Max 250 characters)*"
        rows={4}
      />
    </div>
  );
};

export const ProdCategoryAutoCompleteFiled: FC<InputFieldProps> = ({
  values,
  setValue,
  touched,
  errors,
}) => {
  const { data: categoryList } = useGetCategoryData();

  return (
    <div className="w-full">
      {categoryList && (
        <Autocomplete
          size="small"
          fullWidth
          disablePortal
          value={values.category}
          options={categoryList?.results || []}
          getOptionLabel={(option) => option.title || ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(e, value) => {
            setValue(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name="category"
              label="Category"
              error={touched.category && Boolean(errors.category)}
              helperText={touched.category && errors.category}
            />
          )}
        />
      )}
    </div>
  );
};

export const ProductPricingFiled: FC<InputFieldProps> = ({
  values,
  handleChange,
  touched,
  errors,
}) => {
  return (
    <div className="w-full">
      <TextField
        size="small"
        value={values.price}
        error={touched.price && Boolean(errors.price)}
        helperText={touched.price && errors.price}
        className="w-full"
        name="price"
        onChange={handleChange}
        label="Price*"
      />
    </div>
  );
};

export const ProductColorFiled: FC<InputFieldProps> = ({
  values,
  handleChange,
  touched,
  errors,
}) => {
  return (
    <div className="w-full">
      <TextField
        size="small"
        value={values.color}
        error={touched.color && Boolean(errors.color)}
        helperText={touched.color && errors.color}
        className="w-full"
        name="color"
        onChange={handleChange}
        label="Color Name*"
      />
    </div>
  );
};

export const ProductDiscountFiled: FC<InputFieldProps> = ({
  values,
  handleChange,
  touched,
  errors,
}) => {
  return (
    <div className="w-full">
      <TextField
        size="small"
        value={values.discount_amount}
        error={touched.discount_amount && Boolean(errors.discount_amount)}
        helperText={touched.discount_amount && errors.discount_amount}
        className="w-full"
        name="discount_amount"
        onChange={handleChange}
        label="Discount Amount*"
      />
    </div>
  );
};

type AddProductStockProps = {
  values: any;
  setValue: Function;
  setError: any;
};
export const AddProductStock: FC<AddProductStockProps> = ({ values, setValue, setError }) => {
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { data: sizeList } = useGetSizeData();

  const handleSubmit = () => {
    const _obj: any = {};
    if (size && quantity) {
      _obj.size = size;
      _obj.quantity = quantity || 1;
      const _ = values.product_size_varient;
      _.push(_obj);
      setValue(_);
      setSize(null);
      setQuantity(1);
    } else {
      setError('Please fill all fields!');
    }
  };
  return (
    <div className="my-4">
      <div className="flex space-x-2 items-center">
        <div className="w-32">
          {sizeList && (
            <Autocomplete
              size="small"
              fullWidth
              disablePortal
              value={size}
              options={sizeList?.results}
              getOptionLabel={(option: any) => option.size_title || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => {
                setSize(value);
                setError('');
              }}
              renderInput={(params) => <TextField {...params} name="size" label="Size" />}
            />
          )}
        </div>
        <div>
          <TextField
            type="number"
            size="small"
            value={quantity}
            // error={touched.discount_amount && Boolean(errors.discount_amount)}
            // helperText={touched.discount_amount && errors.discount_amount}
            className="w-full"
            name="quantity"
            onChange={(e: any) => {
              setQuantity(e.target.value);
              setError('');
            }}
            label="quantity"
          />
        </div>

        <div>
          <AddCircleOutlineIcon onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

type EditProductStockProps = {
  values: any;
  setValue: Function;
  setError: any;
  data: any;
  idx: number;
};

export const EditProductStock: FC<EditProductStockProps> = ({ values, setValue, data, idx }) => {
  const [size1, setSize1] = useState(data.size);
  const [quantity1, setQuantity1] = useState(data.quantity);

  const [flag, setFlag] = useState(true);

  const { data: sizeList } = useGetSizeData();

  const handleSubmit = () => {
    const { unit: _unit, quantity: _quantity, price: _price, ...rest } = data; // eslint-disable-line @typescript-eslint/no-unused-vars

    const _ = values?.product_size_varient;
    _[idx] = {
      size: size1,
      quantity: quantity1 || 1,
      ...rest,
    };

    setValue(_);
  };
  const handleDelete = () => {
    const _ = values?.product_size_varient;
    _.splice(idx, 1);
    setValue(_);
  };
  return (
    <div>
      <div className="flex space-x-4"></div>
      <div className="flex space-x-2 items-center">
        <div>
          {sizeList && (
            <Autocomplete
              size="small"
              fullWidth
              disabled={flag}
              disablePortal
              value={size1}
              options={sizeList?.results}
              getOptionLabel={(option) => option.size_title || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, value) => {
                if (value) {
                  setSize1(value);
                }
              }}
              renderInput={(params) => <TextField {...params} name="size" label="Size" />}
            />
          )}
        </div>
        <div>
          <TextField
            type="number"
            size="small"
            value={quantity1}
            disabled={flag}
            className="w-full"
            name="quantity"
            onChange={(e) => setQuantity1(e.target.value)}
            label="quantity"
          />
        </div>
        <div></div>

        <div>
          <DeleteForeverIcon color="error" onClick={handleDelete} />
        </div>
        <div>
          {!flag ? (
            <button type="button" onClick={handleSubmit}>
              Keep Change
            </button>
          ) : (
            <ChangeCircleIcon onClick={() => setFlag(!flag)} />
          )}
        </div>
      </div>
    </div>
  );
};
