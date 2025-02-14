export const login = async (): Promise<any> => {
  try {
    const endpoint = `/auth/login`;
    const response = await axiosWrapper.get(endpoint, {}, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};
