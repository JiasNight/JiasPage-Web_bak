import service from '@/utils/request';

export const userLogin = async (userLoginForm: object) => {
  return await service.axios({
    url: '/api/client/login',
    method: 'post',
    data: userLoginForm
  });
};
