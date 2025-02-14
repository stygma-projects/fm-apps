export const getProducts = async (): Promise<any> => {
  try {
    const endpoint = `/products`;
    const response = await axiosWrapper.get(endpoint, {}, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const getProductById = async (id: string): Promise<any> => {
  try {
    const endpoint = `/products/${id}`;
    const response = await axiosWrapper.get(endpoint, {}, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const createProduct = async (product: any): Promise<any> => {
  try {
    const endpoint = `/products`;
    const response = await axiosWrapper.post(endpoint, product, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const updateProduct = async (id: string, product: any): Promise<any> => {
  try {
    const endpoint = `/products/${id}`;
    const response = await axiosWrapper.put(endpoint, product, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const deleteProduct = async (id: string): Promise<any> => {
  try {
    const endpoint = `/products/${id}`;
    const response = await axiosWrapper.delete(endpoint, {}, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};
