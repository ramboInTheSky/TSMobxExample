import React from 'react'
import { shallow, mount } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createShallow } from '@material-ui/core/test-utils'
configure({ adapter: new Adapter() })

import { ManageCustomAccess } from '.'
import { ProfilesMock, RoutingMock } from '../../stores/mock';
import { VisitsMock } from '../../stores/mock/VisitsMock';
import { LockGroupMock } from '../../stores/mock/LockGroupsMock';

describe('<ManageCustomAccess />', () => {
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
            lockGroups: new LockGroupMock()
		}
		shallowMaterial = createShallow()
	})

	it('renders correctly', () => {
		expect(shallow(<ManageCustomAccess {...props} />)).toMatchSnapshot()
	})

	it('calls the api correctly', () => {
		const el = mount(<ManageCustomAccess {...props} />)
		expect(props.lockGroups.getList).toHaveBeenCalled()
	})

	it('renders correctly when data is loading', () => {
		const el = shallow(<ManageCustomAccess {...props} lockGroups={{ ...props.lockGroups, loading: true }} />)
		expect(el).toMatchSnapshot()
	})

	it('handles API errors', () => {
		const el = shallow(<ManageCustomAccess {...props} lockGroups={{ ...props.lockGroups, isError: true }} />)
		expect(el).toMatchSnapshot()
	})

	it('renders correctly with data', () => {
		const data = new LockGroupMock().data

		const el = shallowMaterial(<ManageCustomAccess {...props} lockGroups={{ ...props.lockGroups, data }} />)
		expect(el).toMatchSnapshot()
	})
})
