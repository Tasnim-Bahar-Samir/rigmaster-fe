import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';

interface SelectedProductState {
  products: any[];
  cartOpen: boolean;
  discountAmount: number;
  couponData: any; // Adjust type as per your actual data type

  setDerectByProduct: (data: any) => void;
  setPrevCookies: (data?: any) => void;
  setCartOpen: (data: boolean) => void;
  setCoupon: (data: number) => void;
  setCoupondata: (data: any) => void; // Adjust type as per your actual data type
  setQuantity: (data: any, method: 'increase' | 'decrease') => void;
  setIncreaseQuantityAsDuplicate: (id: any, increaseQuantity: number) => void;
  deleteSingleProduct: (data: any) => void;
  setProduct: (data: any) => void;
}

export const selectedProductStore = create<SelectedProductState>((set, get) => ({
  products: [],
  cartOpen: false,
  discountAmount: 0,
  couponData: null,

  setDerectByProduct: (data) => {
    setCookie('addedProducts', JSON.stringify(data));
    set({ products: data });
  },

  setPrevCookies: () => {
    let _: any = [];
    if (hasCookie('addedProducts')) {
      const __ = getCookie('addedProducts');
      if (__) {
        _ = JSON.parse(__);
      }
    }
    return set({ products: _ });
  },

  setCartOpen: (data) => {
    set({ cartOpen: data });
  },

  setCoupon: (data) => {
    set({ discountAmount: data });
  },
  setCoupondata: (data) => {
    set({ couponData: data });
  },
  setQuantity: (data, method) => {
    let _: any = [];
    get().products.map((i) => {
      if (i.id === data) {
        if (method === 'increase') {
          i.quantity += 1;
        } else if (method === 'decrease' && i.quantity > 1) {
          i.quantity -= 1;
        }
      }
      _.push(i);
    });

    deleteCookie('addedProducts');
    setCookie('addedProducts', JSON.stringify(_));
    return set({ products: _ });
  },

  setIncreaseQuantityAsDuplicate: (id, increaseQuantity) => {
    let _: any = [];
    get().products.map((i) => {
      if (i.id === id) {
        i.quantity += increaseQuantity;
      }
      _.push(i);
    });

    deleteCookie('addedProducts');
    setCookie('addedProducts', JSON.stringify(_));
    return set({ products: _ });
  },

  deleteSingleProduct: (data) => {
    let remainingProducts = [...get().products].filter((prod) => prod.id !== data);
    deleteCookie('addedProducts');
    setCookie('addedProducts', JSON.stringify(remainingProducts));
    return set({ products: remainingProducts });
  },

  setProduct: (data) => {
    const _newList = [...get().products, ...[data]];
    deleteCookie('addedProducts');
    setCookie('addedProducts', JSON.stringify(_newList));
    return set({ products: _newList });
  },
}));
