import React from 'react'
import { shallow } from 'enzyme'

import { VisitDetail } from '.'
import { RoutingMock, ProfilesMock } from '../../stores/mock';
import { VisitsMock } from '../../stores/mock/VisitsMock';

describe('<VisitDetail />', () => {
	let props: any
	const Component = (VisitDetail as any).wrappedComponent
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
	})

	it('renders correctly', () => {
		expect(shallow(<Component {...props} />)).toMatchSnapshot()
	})

	it('renders correctly when NEW Profile', () => {
		const match = {
			params: {
				profileId: 'new',
			},
		}
		expect(shallow(<Component {...props} match={match}/>)).toMatchSnapshot()
	})

	it('calls the api correctly', () => {
		const el = shallow(<Component {...props} />)
		expect(props.visits.getArchetypes).toHaveBeenCalled()
	})

	it('renders correctly when data is loading', () => {
		const el = shallow(<Component {...props} profiles={{ ...props.profiles, isLoading: true }} />)
		expect(el).toMatchSnapshot()
	})

	it('handles API errors', () => {
		props.profiles.isError = true
		props.profiles.errorMessage = 'yeah'
		const el = shallow(<Component {...props}  />)
		expect(el).toMatchSnapshot()
	})

})
