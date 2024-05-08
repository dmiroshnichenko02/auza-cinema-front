'use client'

import styles from '@/components/layout/Layout.module.scss'
import Navigation from '@/components/layout/navigation/Navigation'
import Sidebar from '@/components/layout/sidebar/Sidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

function ReactQueryProvider({ children }: React.PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return (
		<QueryClientProvider client={client}>
			<Navigation />
			<div className={styles.center}>{children}</div>
			<Sidebar />
		</QueryClientProvider>
	)
}

export default ReactQueryProvider
