import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { Breadcrumb } from './Breadcrumb'
import { RoutingMock } from '../../stores/mock';

describe('<Breadcrumb />', () => {
	let props: any
	let el: ShallowWrapper<Breadcrumb>
	beforeEach(()=>{
		props = {
			routing: new RoutingMock()
		}
		el = shallow(<Breadcrumb {...props}/>)
	})
	it('renders correctly', () => {
		expect(el).toMatchSnapshot()
	})

	// it('Does not re-render on children props change', () => {
	// 	const el: any = shallow(<Breadcrumb foo="bar" />)
	// 	el.setProps({ children: 'Goodbye' })
	// 	el.update()
	// 	expect(el).toMatchSnapshot()
	// })
})
