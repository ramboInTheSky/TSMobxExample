import React from 'react'
import { shallow } from 'enzyme'
import { mockDateConstructor, ProfilesMock } from '../../stores/mock'

import { ViewVisitPanel } from '.'
import { VisitsMock, RoutingMock } from '../../stores/mock';

mockDateConstructor()

describe('<ViewVisitPanel />', () => {
	let props: any
	beforeEach(() => {
		props = {
			match: {
				params: {
					profileId: '123',
				},
			},
			profiles: new ProfilesMock(),
			routing: new RoutingMock(),
			visits: new VisitsMock(),
		}
	})

	it('renders correctly', () => {
		expect(shallow(<ViewVisitPanel {...props} />)).toMatchSnapshot()
	})
})