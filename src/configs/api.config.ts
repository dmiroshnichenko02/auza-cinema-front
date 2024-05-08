export const API_URL = `${process.env.APP_SERVER_URL}`

export const getGenresUrl = (string: string) => `${API_URL}/genres${string}`
export const getAuthUrl = (string: string) => `${API_URL}/auth${string}`
export const getUsersUrl = (string: string) => `${API_URL}/users${string}`
export const getActorsUrl = (string: string) => `${API_URL}/actors${string}`
export const getRatingsUrl = (string: string) => `${API_URL}/ratings${string}`
export const getMoviesUrl = (string: string) => `${API_URL}/movies${string}`
