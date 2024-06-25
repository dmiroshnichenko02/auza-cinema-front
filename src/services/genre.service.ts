import axios, { axiosClassic } from '@/api/interceptors'
import { IGenreEditInput } from '@/components/screens/genre/genre-edit.interface'
import { getGenresUrl } from '@/configs/api.config'
import { IGenre } from '@/shared/types/movie.types'

export const GenreService = {
	async getAll(searchTerms?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerms ? { searchTerms } : {}
		})
	},
	async getById(_id: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`))
	},
	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`))
	},

	async deleteGenre(_id: string) {
		return axios.delete<string>(getGenresUrl(`/${_id}`))
	},

	async updateGenre(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${_id}`), data)
	},
	async createGenre() {
		return axios.post<string>(getGenresUrl(`/`))
	}
}
