import React from 'react'
import { shallow } from 'enzyme'

import { Header } from '.'

describe('<Header />', () => {
	it('renders correctly', () => {
		expect(shallow(<Header />)).toMatchSnapshot()
	})

	// it('passes on props correctly', () => {
	// 	expect(shallow(<Header foo="bar">Hello</Header>)).toMatchSnapshot()
	// })

	// it('Does not re-render on children props change', () => {
	// 	const el: any = shallow(<Header foo="bar" />)
	// 	el.setProps({ children: 'Goodbye' })
	// 	el.update()
	// 	expect(el).toMatchSnapshot()
	// })
})
