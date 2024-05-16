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
	}
}
