import axiousResuest from '@/libs/axiosRequest';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export type CategoryResponseType = {
  id: string;
  title: string;
  priority: string;
  img: string;
  slug: string;
};

export const useGetCategoryData = (search = '', limit = 25, offset = 0) => {
  return useQuery({
    queryKey: ['product_category', search, limit, offset],
    queryFn: () =>
      axiousResuest({
        url: `/product/category/?search=${search}&limit=${limit}&offset=${offset}`,
        method: 'get',
      }),
  });
};

export const useAddCategoryData = () => {
  const queryClient = useQueryClient();
  const { data: session }: any = useSession();

  return useMutation({
    mutationFn: async (body: any) =>
      await axiousResuest({
        url: `/product/category/`,
        method: 'post',
        data: body,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
    onSuccess: () => queryClient.invalidateQueries(['product_category']),
  });
};

export const useUpdateCategoryData = (id: string) => {
  const queryClient = useQueryClient();
  const { data: session }: any = useSession();
  return useMutation({
    mutationFn: async (body: any) =>
      await axiousResuest({
        url: `/product/category/${id}/`,
        method: 'patch',
        data: body,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product_category'] });
    },
  });
};

export const useDeleteCategoryData = (id: string) => {
  const queryClient = useQueryClient();
  const { data: session }: any = useSession();
  return useMutation({
    mutationFn: async () =>
      await axiousResuest({
        url: `/product/category/${id}/`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product_category'] });
    },
  });
};
