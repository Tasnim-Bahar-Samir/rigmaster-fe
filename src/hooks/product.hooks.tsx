import axiousResuest from '@/libs/axiosRequest';
import { useQuery } from '@tanstack/react-query';

export type TeamMemberResponseType = {
  id: string;
  avatar: string;
  name: string;
  designation: string;
  fb_url: string;
  linkedin_url: string;
  insta_url: string;
  status: string;
  created_at: string;
};

export const useGetProductData = () => {
  return useQuery({
    queryKey: ['product'],
    queryFn: () =>
      axiousResuest({
        url: `/product/management/`,
        method: 'get',
      }),
  });
};

// export const useAddTeamMemberData = () => {
//   const queryClient = useQueryClient();
//   const { data: session }: any = useSession();

//   return useMutation({
//     mutationFn: async (body: any) =>
//       await axiousResuest({
//         url: `/team/member/`,
//         method: 'post',
//         data: body,
//         headers: {
//           Authorization: `Bearer ${session?.accessToken}`,
//         },
//       }),
//     onSuccess: () => queryClient.invalidateQueries(['member']),
//   });
// };

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
