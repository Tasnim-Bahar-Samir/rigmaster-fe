import axiousResuest from '@/libs/axiosRequest';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export const useGetProductData = (
  search = '',
  category = '',
  dataPerpage: number,
  offset: number,
) => {
  const params = useSearchParams().toString();
  return useQuery({
    queryKey: ['product', search, category, params, dataPerpage, offset],
    queryFn: () =>
      axiousResuest({
        url: `/product/management/?${params}&category__slug__in=${category}&limit=${dataPerpage}&offset=${offset}`,
        method: 'get',
      }),
  });
};
export const useGetDashProductData = (search = '', dataPerpage: number, offset: number) => {
  return useQuery({
    queryKey: ['product', search],
    queryFn: () =>
      axiousResuest({
        url: `/product/management/?search=${search}&limit=${dataPerpage}&offset=${offset}`,
        method: 'get',
      }),
  });
};

export const useAddProductData = () => {
  const queryClient = useQueryClient();
  const { data: session }: any = useSession();

  return useMutation({
    mutationFn: async (body: any) =>
      await axiousResuest({
        url: `/product/management/`,
        method: 'post',
        data: body,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
    onSuccess: () => queryClient.invalidateQueries(['product']),
  });
};

export const useUpdateProductData = (id: string) => {
  const queryClient = useQueryClient();
  const { data: session }: any = useSession();
  return useMutation({
    mutationFn: async (body: any) =>
      await axiousResuest({
        url: `/product/management/${id}/`,
        method: 'patch',
        data: body,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
};

export const useDeleteProductData = (id: string) => {
  const queryClient = useQueryClient();
  const { data: session }: any = useSession();
  return useMutation({
    mutationFn: async () =>
      await axiousResuest({
        url: `/product/management/${id}/`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
};
