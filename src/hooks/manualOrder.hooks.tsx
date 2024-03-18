import axiousResuest from '@/libs/axiosRequest';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useGetManualOrderData = (status = '', limit: number, offset: number) => {
  const { data: session }: any = useSession();
  return useQuery({
    queryKey: ['manual_order', status, limit, offset],
    queryFn: () =>
      axiousResuest({
        url: `/order/custom/?status__in=${status}&limit${limit}&offset=${offset}&ordering=-created_at`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
  });
};

export const useAddManualOrder = () => {
  const queryClient = useQueryClient();
  // const { data: session }: any = useSession();

  return useMutation({
    mutationFn: async (body: any) =>
      await axiousResuest({
        url: `/order/custom/`,
        method: 'post',
        data: body,
      }),
    onSuccess: () => queryClient.invalidateQueries(['manual_order']),
  });
};

export const useUpdateManualOrderData = (id: string) => {
  const queryClient = useQueryClient();
  const { data: session }: any = useSession();
  return useMutation({
    mutationFn: async (body: any) =>
      await axiousResuest({
        url: `/order/custom/${id}/`,
        method: 'patch',
        data: body,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manual_order'] });
    },
  });
};

export const useDeleteManualOrder = (id: string) => {
  const queryClient = useQueryClient();
  const { data: session }: any = useSession();
  return useMutation({
    mutationFn: async () =>
      await axiousResuest({
        url: `/order/custom/${id}/`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manual_order'] });
    },
  });
};
