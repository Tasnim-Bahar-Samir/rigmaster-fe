export const getOrderSubtotal = (data: any) => {
  let subTotal = 0;
  data?.map((i: any) => {
    const price = i?.quantity * i?.product?.price;
    subTotal += price;
  });
  return subTotal;
};
