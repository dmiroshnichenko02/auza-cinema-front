import axios, { axiosClassic } from '@/api/interceptors'
import { IMovieEditInput } from '@/components/screens/admin/movie/movie-edit.interface'
import { getMoviesUrl } from '@/configs/api.config'
import { IMovie } from '@/shared/types/movie.types'

export const MovieService = {
	async getAll(searchTerms?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerms ? { searchTerms } : {}
		})
	},

	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
	},

	async getMostPopularMovies() {
		return axiosClassic.get<IMovie[]>(getMoviesUrl('/most-popular'))
	},

	async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl('/by-genres'), {
			genreIds
		})
	},

	async getByActor(actorId: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`))
	},

	async deleteMovie(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`))
	},

	async updateMovie(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data)
	},

	async createMovie() {
		return axios.post<string>(getMoviesUrl(`/`))
	}
}
