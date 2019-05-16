import React from 'react'
import { shallow, mount } from 'enzyme'
import { createShallow, createMount } from '@material-ui/core/test-utils'

import { VisitDetail } from '.'
import { RoutingMock, ProfilesMock } from '../../stores/mock';
import { VisitsMock } from '../../stores/mock/VisitsMock';

describe('<VisitDetail />', () => {
	let props: any
	let shallowMaterial: any
	let mountMaterial: any
	beforeEach(() => {
		props = {
			match: {
				params: {
					profileId: '123',
				},
			},
			profiles: new ProfilesMock(),
            routing: new RoutingMock(),
            visits: new VisitsMock()
		}
		shallowMaterial = createShallow()
		mountMaterial = createMount()
	})

	it('renders correctly', () => {
		expect(shallow(<VisitDetail {...props} />)).toMatchSnapshot()
	})

	it('renders correctly when NEW Profile', () => {
		const match = {
			params: {
				profileId: 'new',
			},
		}
		expect(shallow(<VisitDetail {...props} match={match}/>)).toMatchSnapshot()
	})

	it('calls the api correctly', () => {
		const el = mountMaterial(<VisitDetail {...props} />)
		expect(props.visits.getArchetypes).toHaveBeenCalled()
	})

	it('renders correctly when data is loading', () => {
		const el = shallow(<VisitDetail {...props} profiles={{ ...props.profiles, isLoading: true }} />)
		expect(el).toMatchSnapshot()
	})

	it('handles API errors', () => {
		props.profiles.isError = true
		props.profiles.errorMessage = 'yeah'
		const el = shallow(<VisitDetail {...props}  />)
		expect(el).toMatchSnapshot()
	})

})
