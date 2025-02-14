export const getIngredientTypes = async (): Promise<any> => {
  try {
    const endpoint = `/ingredient-types`;
    const response = await axiosWrapper.get(endpoint, {}, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const getIngredientTypeById = async (id: string): Promise<any> => {
  try {
    const endpoint = `/ingredient-types/${id}`;
    const response = await axiosWrapper.get(endpoint, {}, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const createIngredientType = async (
  ingredientType: any,
): Promise<any> => {
  try {
    const endpoint = `/ingredient-types`;
    const response = await axiosWrapper.post(endpoint, ingredientType, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const updateIngredientType = async (
  id: string,
  ingredientType: any,
): Promise<any> => {
  try {
    const endpoint = `/ingredient-types/${id}`;
    const response = await axiosWrapper.put(endpoint, ingredientType, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const deleteIngredientType = async (id: string): Promise<any> => {
  try {
    const endpoint = `/ingredient-types/${id}`;
    const response = await axiosWrapper.delete(endpoint, {}, {});
    return response.data;
  } catch (err) {
    throw new Error();
  }
};
