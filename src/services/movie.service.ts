import { axiosClassic } from '@/api/interceptors'
import { getMoviesUrl } from '@/configs/api.config'
import { IMovie } from '@/shared/types/movie.types'

export const MovieService = {
	async getAll(searchTerms?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerms ? { searchTerms } : {}
		})
	}
}
