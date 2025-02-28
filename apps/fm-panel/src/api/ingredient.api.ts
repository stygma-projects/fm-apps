export const getIngredients = async (): Promise<any> => {
  try {
    const endpoint = `/ingredients`
    const response = await axiosWrapper.get(endpoint, {}, {})
    return response.data
  } catch (err) {
    throw new Error()
  }
}

export const getIngredientById = async (id: string): Promise<any> => {
  try {
    const endpoint = `/ingredients/${id}`
    const response = await axiosWrapper.get(endpoint, {}, {})
    return response.data
  } catch (err) {
    throw new Error()
  }
}

export const createIngredient = async (ingredient: any): Promise<any> => {
  try {
    const endpoint = `/ingredients`
    const response = await axiosWrapper.post(endpoint, ingredient, {})
    return response.data
  } catch (err) {
    throw new Error()
  }
}

export const updateIngredient = async (
  id: string,
  ingredient: any,
): Promise<any> => {
  try {
    const endpoint = `/ingredients/${id}`
    const response = await axiosWrapper.put(endpoint, ingredient, {})
    return response.data
  } catch (err) {
    throw new Error()
  }
}

export const deleteIngredient = async (id: string): Promise<any> => {
  try {
    const endpoint = `/ingredients/${id}`
    const response = await axiosWrapper.delete(endpoint, {}, {})
    return response.data
  } catch (err) {
    throw new Error()
  }
}
