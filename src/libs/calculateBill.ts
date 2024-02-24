export const calculateTotalBill = (_obj: any = []) => {
  let t_bill = 0;
  _obj.map((i: any) => {
    t_bill += i.price * i.quantity;
  });

  return t_bill;
};

export const orderItem = (_obj: any = []) => {
  const arr: any = [];
  _obj.map((i: any) => {
    const product = i.productId;
    const quantity = i.quantity;
    const data = {
      product: product,
      quantity: quantity,
      others_info: {
        product_size_variant: {
          size_title: i.sizeTitle,
          quantity: i.stockQuantity,
        },
      },
    };
    arr.push(data);
  });
  return arr;
};

// export const calculateDicountAmount = (couponData, bill) => {
//   let discountTotal = 0;
//   if (couponData) {
//     if (couponData?.isPercentage) {
//       discountTotal = (bill * couponData.amount) / 100;
//     } else {
//       discountTotal = couponData.amount;
//     }
//   }
//   return discountTotal;
// };
