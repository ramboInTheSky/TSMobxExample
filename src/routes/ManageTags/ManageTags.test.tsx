import React from 'react'
import { shallow, mount } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createShallow } from '@material-ui/core/test-utils'
configure({ adapter: new Adapter() })

import { ManageTags } from '.'
import { ProfilesMock, RoutingMock } from '../../stores/mock';
import { VisitsMock } from '../../stores/mock/VisitsMock';

describe('<ManageTags />', () => {
	let props: any
	let shallowMaterial: any
	beforeEach(() => {
		props = {
			match: {
				params: {
                    profileId: '123',
                    visitId: '456'
				},
			},
			profiles: new ProfilesMock(),
			routing: new RoutingMock(),
            visits: new VisitsMock(),
		}
		shallowMaterial = createShallow()
	})

	it('renders correctly', () => {
		expect(shallow(<ManageTags {...props} />)).toMatchSnapshot()
	})

	// it('calls the api correctly', () => {
	// 	const el = mount(<ManageTags {...props} />)
	// 	expect(props.lockGroups.getList).toHaveBeenCalled()
	// })

	it('renders correctly when data is loading', () => {
		const el = shallow(<ManageTags {...props} lockGroups={{ ...props.lockGroups, loading: true }} />)
		expect(el).toMatchSnapshot()
	})

	it('handles API errors', () => {
		const el = shallow(<ManageTags {...props} lockGroups={{ ...props.lockGroups, isError: true }} />)
		expect(el).toMatchSnapshot()
	})
})
