export const getProductCategories = async (): Promise<any> => {
  try {
    const endpoint = `/product-categories`;
    const response = await axiosWrapper.get(endpoint, {}, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const getProductCategoryById = async (id: string): Promise<any> => {
  try {
    const endpoint = `/product-categories/${id}`;
    const response = await axiosWrapper.get(endpoint, {}, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const createProductCategory = async (
  productCategory: any,
): Promise<any> => {
  try {
    const endpoint = `/product-categories`;
    const response = await axiosWrapper.post(endpoint, productCategory, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const updateProductCategory = async (
  id: string,
  productCategory: any,
): Promise<any> => {
  try {
    const endpoint = `/product-categories/${id}`;
    const response = await axiosWrapper.put(endpoint, productCategory, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const deleteProductCategory = async (id: string): Promise<any> => {
  try {
    const endpoint = `/product-categories/${id}`;
    const response = await axiosWrapper.delete(endpoint, {}, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};
