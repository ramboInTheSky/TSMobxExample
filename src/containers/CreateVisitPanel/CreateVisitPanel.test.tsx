import React from 'react'
import { shallow } from 'enzyme'
import { createShallow, createMount } from '@material-ui/core/test-utils'
import { mockDateConstructor, ProfilesMock } from '../../stores/mock'

import { CreateVisitPanel } from '.'
import { VisitsMock, RoutingMock } from '../../stores/mock';

mockDateConstructor()

describe('<CreateVisitPanel />', () => {
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
			visits: new VisitsMock(),
			saveFn: jest.fn()
		}
		shallowMaterial = createShallow()
		mountMaterial = createMount()
	})

	it('renders correctly', () => {
		expect(shallow(<CreateVisitPanel {...props} />)).toMatchSnapshot()
	})

	it('hides dateto and timeTo when the checkbox is clicked', () => {
		const el = mountMaterial(<CreateVisitPanel {...props} />)
		el
			// .dive()
			.find('input[type="checkbox"]')
			.simulate('click', { preventDefault: () => { }, target: { name: 'input', value: 'value' } })
		el.update()
		expect(el).toMatchSnapshot()
	})

	it('selects an archetype', () => {
		props.visits.archetypes = {
			primary: [{
				id: "d3aa88e2-c754-41e0-8ba6-4198a34aa0a1",
				archetypeName: "Short Stay",
				archetypePrimary: true,
				ArchetypeLockGroupNames: [
					"lockGroup1",
					"lockGroup2"
				]
			}],
			secondary: []
		}
		props.visits.rawArchetypes = [{
			id: "d3aa88e2-c754-41e0-8ba6-4198a34aa0a1",
			archetypeName: "Short Stay",
			archetypePrimary: true,
			ArchetypeLockGroupNames: [
				"lockGroup1",
				"lockGroup2"
			]
		}]
		const el = shallowMaterial(<CreateVisitPanel {...props} />)
		el
			.dive()
			.find('.archetype-button')
			.simulate('click', { preventDefault: () => { }, target: { name: 'input', value: 'value' } })
		el.update()
		expect(el).toMatchSnapshot()
	})

})