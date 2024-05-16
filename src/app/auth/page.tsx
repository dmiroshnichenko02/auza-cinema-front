import Auth from '@/components/screens/auth/Auth'
import { FC } from 'react'

export const metadata = {
	title: 'Auth',
	description: 'Authorize in auza cinema'
}

const AuthPage: FC = () => {
	return <Auth />
}

export default AuthPage
