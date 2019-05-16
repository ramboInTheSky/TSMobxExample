import React from 'react'
import { shallow } from 'enzyme'

import { CardContainer } from './CardContainer'

describe('<CardContainer />', () => {
	let props: any
	beforeEach(()=>{
		props = {
			
		}
	})
	it('renders correctly', () => {
		expect(shallow(<CardContainer {...props}/>)).toMatchSnapshot()
	})

	// it('passes on props correctly', () => {
	// 	expect(shallow(<CardContainer foo="bar">Hello</CardContainer>)).toMatchSnapshot()
	// })

	// it('Does not re-render on children props change', () => {
	// 	const el: any = shallow(<CardContainer foo="bar" />)
	// 	el.setProps({ children: 'Goodbye' })
	// 	el.update()
	// 	expect(el).toMatchSnapshot()
	// })
})
