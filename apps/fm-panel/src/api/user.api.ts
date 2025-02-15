export const getUsers = async (): Promise<any> => {
  try {
    const endpoint = `/users`
    const response = await axiosWrapper.get(endpoint, {}, {})
    return response.data
  } catch (err) {
    throw new Error()
  }
}

export const getUserById = async (id: string): Promise<any> => {
  try {
    const endpoint = `/users/${id}`
    const response = await axiosWrapper.get(endpoint, {}, {})
    return response.data
  } catch (err) {
    throw new Error()
  }
}
