import axiousResuest from '@/libs/axiosRequest';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useGetOrderData = () => {
  return useQuery({
    queryKey: ['order'],
    queryFn: () =>
      axiousResuest({
        url: `/order/cod/`,
        method: 'get',
      }),
  });
};

export const useAddOrder = () => {
  const queryClient: any = useQueryClient();
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

// export const useUpdateTeamMember = (id: string) => {
//   const queryClient = useQueryClient();
//   const { data: session }: any = useSession();
//   return useMutation({
//     mutationFn: async (body: any) =>
//       await axiousResuest({
//         url: `/team/member/${id}/`,
//         method: 'patch',
//         data: body,
//         headers: {
//           Authorization: `Bearer ${session.accessToken}`,
//         },
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['member'] });
//     },
//   });
// };

// export const useDeleteTeamMember = (id: string) => {
//   const queryClient = useQueryClient();
//   const { data: session }: any = useSession();
//   return useMutation({
//     mutationFn: async () =>
//       await axiousResuest({
//         url: `/team/member/${id}/`,
//         method: 'delete',
//         headers: {
//           Authorization: `Bearer ${session.accessToken}`,
//         },
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['member'] });
//     },
//   });
// };
