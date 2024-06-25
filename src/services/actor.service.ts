import axios, { axiosClassic } from '@/api/interceptors'
import { IActorEditInput } from '@/components/screens/admin/actor/actor-edit.interface'
import { getActorsUrl } from '@/configs/api.config'
import { IActor } from '@/shared/types/movie.types'

export const ActorService = {
	async getAll(searchTerms?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(''), {
			params: searchTerms ? { searchTerms } : {}
		})
	},

	async getById(_id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`/${_id}`))
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`))
	},

	async deleteActor(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	},

	async updateActor(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${_id}`), data)
	},

	async createActor() {
		return axios.post<string>(getActorsUrl(`/`))
	}
}
