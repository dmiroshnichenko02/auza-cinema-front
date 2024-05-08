import { API_URL } from '@/configs/api.config'
import axios from 'axios'

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})
