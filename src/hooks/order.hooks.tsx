import axiousResuest from '@/libs/axiosRequest';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useGetOrderData = (search = '', status = '') => {
  const { data: session }: any = useSession();
  return useQuery({
    queryKey: ['order', search, status],
    queryFn: () =>
      axiousResuest({
        url: `/order/cod/?search=${search}&status=${status}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
  });
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  // const { data: session }: any = useSession();

  return useMutation({
    mutationFn: async (body: any) =>
      await axiousResuest({
        url: `/order/cod/`,
        method: 'post',
        data: body,
      }),
    onSuccess: () => queryClient.invalidateQueries(['order']),
  });
};

export const useUpdateOrderData = (id: string) => {
  const queryClient = useQueryClient();
  const { data: session }: any = useSession();
  return useMutation({
    mutationFn: async (body: any) =>
      await axiousResuest({
        url: `/order/cod/${id}/`,
        method: 'patch',
        data: body,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });
};

export const useDeleteOrder = (id: string) => {
  const queryClient = useQueryClient();
  const { data: session }: any = useSession();
  return useMutation({
    mutationFn: async () =>
      await axiousResuest({
        url: `/order/cod/${id}/`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });
};
