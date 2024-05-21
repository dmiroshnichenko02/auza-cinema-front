import axios from '@/api/interceptors'
import { getUsersUrl } from '@/configs/api.config'
import { IUser } from '@/shared/types/user.types'

export const UserService = {
	async getProfile(accessToken: string = '') {
		return axios.get<IUser>(getUsersUrl('/profile'), {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
	},

	async getAll(searchTerms?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerms ? { searchTerms } : {}
		})
	},

	async deleteUser(_id: string) {
		return axios.delete(getUsersUrl(`/${_id}`))
	}
}
