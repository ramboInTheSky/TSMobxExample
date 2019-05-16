import React from 'react'
import { shallow, mount } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createShallow } from '@material-ui/core/test-utils'

import { RoutingMock, ProfilesMock } from '../../stores/mock'
configure({ adapter: new Adapter() })

import { Profiles } from '.'

describe('<Profiles />', () => {
	let props: any
	let shallowMaterial: any
	beforeEach(() => {
		props = {
			profiles: new ProfilesMock(),
            routing: new RoutingMock(),
		}
		shallowMaterial = createShallow()
	})
	it('renders correctly', () => {
		expect(shallow(<Profiles {...props} />)).toMatchSnapshot()
	})

	it('calls the api correctly', () => {
		const el = mount(<Profiles {...props} />)
		expect(props.profiles.getList).toHaveBeenCalled()
	})

	it('renders correctly when data is loading', () => {
		const el = shallow(<Profiles {...props} profiles={{ ...props.profiles, isLoading: true }} />)
		expect(el).toMatchSnapshot()
	})

	it('handles API errors', () => {
		const el = shallow(<Profiles {...props} profiles={{ ...props.profiles, isError: true }} />)
		expect(el).toMatchSnapshot()
	})

})
