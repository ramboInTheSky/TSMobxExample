import React from 'react'


import { Boundary } from '../ErrorBoundary'
import { Header } from '../Header'
import { Wrapper, Heading, Content } from './Components'
import { Breadcrumb } from '../'

export interface LayoutProps {
	children?: any
}

export const Layout = (props: LayoutProps) => 
	<Boundary>
		<Wrapper>
			<Heading>
				<Header />
				<Breadcrumb />
			</Heading>
			<Content>{props.children}</Content>
		</Wrapper>
	</Boundary>
