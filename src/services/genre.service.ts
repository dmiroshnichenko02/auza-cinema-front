import { axiosClassic } from '@/api/interceptors'
import { getGenresUrl } from '@/configs/api.config'
import { IGenre } from '@/shared/types/movie.types'

export const GenreService = {
	async getAll(searchTerms?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerms ? { searchTerms } : {}
		})
	}
}
