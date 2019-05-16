import React from 'react'
import { shallow } from 'enzyme'

import { Layout } from '.'
import { RoutingMock } from '../../stores/mock';

describe('<Layout />', () => {
	let props: any
	beforeEach(()=>{
		props = {
			routing: new RoutingMock()
		}
	})
	it('renders correctly', () => {
		expect(shallow(<Layout {...props} />)).toMatchSnapshot()
	})

	it('passes on props correctly', () => {
		expect(shallow(<Layout {...props} children="bar"></Layout>)).toMatchSnapshot()
	})

	it('Does not re-render on children props change', () => {
		const el: any = shallow(<Layout {...props} children="bar" />)
		el.setProps({ children: 'Goodbye' })
		el.update()
		expect(el).toMatchSnapshot()
	})
})
