'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
	const { user } = useAuth()

	const { push } = useRouter()

	const searchParams = useSearchParams()

	const redirect =
		searchParams.get('redirect') === null
			? '/'
			: String(searchParams.get('redirect'))

	useEffect(() => {
		if (user) {
			push(redirect)
		}
	}, [user, redirect, push])
}
