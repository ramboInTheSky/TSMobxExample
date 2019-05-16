import React from 'react'
import { shallow, mount } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createShallow } from '@material-ui/core/test-utils'
configure({ adapter: new Adapter() })

import { ProfileDetail } from '.'
import { ProfilesMock, RoutingMock } from '../../stores/mock';
import { VisitsMock } from '../../stores/mock/VisitsMock';

describe('<ProfileDetail />', () => {
	let props: any
	let shallowMaterial: any
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
	})

	it('renders correctly', () => {
		expect(shallow(<ProfileDetail {...props} />)).toMatchSnapshot()
	})

	it('renders correctly when NEW Profile', () => {
		const match = {
			params: {
				profileId: 'new',
			},
		}
		expect(shallow(<ProfileDetail {...props} match={match}/>)).toMatchSnapshot()
	})

	it('calls the api correctly', () => {
		const el = mount(<ProfileDetail {...props} />)
		expect(props.profiles.getDetail).toHaveBeenCalled()
	})

	it('renders correctly when data is loading', () => {
		const el = shallow(<ProfileDetail {...props} profiles={{ ...props.profiles, loading: true }} />)
		expect(el).toMatchSnapshot()
	})

	it('renders correctly when on edit mode', () => {
		props.profiles.editing = true
		const el = shallow(<ProfileDetail {...props} />)
		expect(el).toMatchSnapshot()
	})

	it('renders correctly when on create mode', () => {
		props.match.params.profileId = 'new'
		const el = shallow(<ProfileDetail {...props} />)
		expect(el).toMatchSnapshot()
	})

	it('handles API errors', () => {
		const el = shallow(<ProfileDetail {...props} profiles={{ ...props.profiles, isError: true }} />)
		expect(el).toMatchSnapshot()
	})

	it('renders correctly with data', () => {
		const detail = {
			profileId: 'wert34-324c523-2c356-c34c523-4c23456v23',
			firstName: 'Bruce',
			lastName: 'Wayne',
			company: 'Wayne Enterprises',
			mobileNumber: '555-123-123',
			emailAddress: 'info@waine-enterprises.com',
			notes: 'Gotham is safe',
			created: '2014-03-25T12:00:00Z',
			type: 'member',
			lockGroupNames: ['Default', 'Boiler', '1.11'],
			visits: [
				{
					id: 'q3w4c5-w34cr-w34cw34-5cw3-4cw345-3cw34t',
					from: '2015-03-25T12:00:00Z',
					to: '2015-03-25T12:00:00Z',
					tags: ['123123', '234234', '345345'],
				},
				{
					id: 'vvv4c5-w34cr-w34cw34-5cbb-4cw345-3cw311',
					from: '20190401T10:00:10.000Z',
					to: '20190501T10:00:10.000Z',
					tags: ['123123', '234234', '345345'],
				},
			],
		}

		const el = shallowMaterial(<ProfileDetail {...props} profiles={{ ...props.profiles, detail }} />)
		expect(el).toMatchSnapshot()
	})
})
