import { getImgToB64 } from '@/libs/getImgToB64';
import { Reorder } from 'framer-motion';
import { FC } from 'react';
import { RxCross1 } from 'react-icons/rx';

type ProductImageUploadSectionProps = {
  values: any;
  setValue: any;
  errors: any;
  touched: any;
};
const ProductImageUploadSection: FC<ProductImageUploadSectionProps> = ({
  values,
  setValue,
  errors,
  touched,
}) => {
  // const [images, setImages] = useState(values?.product_image);
  // console.log(values.product_image, 555);
  const removeMe = (index: number) =>
    setValue(values?.product_image.filter((_: any, i: any) => i !== index));

  const handleFileChange = async (e: any) => {
    try {
      if (e.target.files[0].size > 2000000) {
        return alert('Image size slould be maximum 2MB');
      }
      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          const _ = {
            _sl: values.product_image.length + 1,
            image: await getImgToB64(selectedFile),
          };
          const __ = values.product_image;
          __.push(_);
          setValue(__);
        }
      }
    } catch (error) {
      {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold pt-5 pb-2 md:text-2xl">
        Upload Product Image<span className="text-red-600">*</span>
      </h3>
      <Reorder.Group axis="x" values={values.product_image} onReorder={(e) => setValue(e)}>
        <div className="flex gap-2 mt-4 overflow-x-auto mb-4">
          {values.product_image.length > 0 &&
            values.product_image.map((i: any, index: number) => (
              <Reorder.Item key={i._sl} value={i}>
                <div
                  style={{ backgroundImage: `url(${i.image})` }}
                  className="bg-cover bg-no-repeat bg-center relative h-40 w-32"
                >
                  <span
                    onClick={() => removeMe(index)}
                    className="absolute p-1 border border-red-600 right-0 rounded-full top-0 bg-white font-bold cursor-pointer text-sm text-red-600"
                  >
                    <RxCross1 />
                  </span>
                </div>
              </Reorder.Item>
            ))}
        </div>
      </Reorder.Group>

      {touched.product_image && Boolean(errors.product_image) && (
        <p className="text-red-600 text-sm" role="alert">
          {touched.product_image && errors.product_image}
        </p>
      )}
      {values.product_image.length < 4 ? (
        <div className="mb-6">
          <div className="pt-3 rounded-3xl grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="text-center bg-[#F5F5F5]">
              <label className=" flex flex-col items-center p-5 justify-center w-full  border border-dashed transition  appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <div>
                  <p className="font-medium text-xs">ThumbnailImage</p>
                  <p className="text-[#9A9A9A] text-sm font-semibold">298 X 398</p>
                  <p className="text-sm text-[#267D3E]">Max-size(1mb)</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  name="thumbnail"
                  className="hidden"
                ></input>
              </label>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {/*  */}

      {/*  */}
      {/* <div className="pt-3 rounded-3xl grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="text-center bg-[#F5F5F5]">
          <label className=" flex flex-col items-center p-5 justify-center w-full  border border-dashed transition  appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <div>
              <p className="font-medium text-xs">ThumbnailImage</p>
              <p className="text-[#9A9A9A] text-sm font-semibold">
                1080 X 1080
              </p>
              <p className="text-sm text-[#267D3E]">
                Add photos or drag and drop
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              //   onChange={(e) => handleImage(e)}
              name="thumbnail"
              className="hidden"
            ></input>
          </label>
        </div>
      </div> */}
    </div>
  );
};

export default ProductImageUploadSection;
