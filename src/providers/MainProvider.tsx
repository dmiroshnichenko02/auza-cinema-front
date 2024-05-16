'use client'

import Layout from '@/components/layout/Layout'
import { store } from '@/store/store'
import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import HeadProvider from './HeadProvider'
import ReactQueryProvider from './ReactQueryProvider'
import ReduxToastLib from './ReduxToastr'

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<ReactQueryProvider>
					<Layout>{children}</Layout>
					<ReduxToastLib />
				</ReactQueryProvider>
			</Provider>
		</HeadProvider>
	)
}

export default MainProvider
