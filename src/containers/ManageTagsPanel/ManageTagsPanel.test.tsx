import React from 'react'
import { createShallow } from '@material-ui/core/test-utils'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { ProfileStore, } from '../../stores'
configure({ adapter: new Adapter() })

import { ManageTagsPanel, ManageTagsPanelConnectedProps } from '.'
import { RoutingMock, VisitsMock } from '../../stores/mock';

describe('<ManageTagsPanel />', () => {
	let props: any
	let shallow: any
	beforeEach(() => {
		props = {
			addTag: jest.fn(),
			profiles: new ProfileStore(),
			routing: new RoutingMock() as any,
			visits: new VisitsMock() as any
		}
		shallow = createShallow()
	})
	it('renders correctly with no data', () => {
		expect(shallow(<ManageTagsPanel {...props} />)).toMatchSnapshot()
	})

	it('correctly add a tag', () => {
		const el = shallow(<ManageTagsPanel {...props} />)
		console.log(el.debug())
		el
			.dive()
			.find('#add-tag-input-field')
			.simulate('change', { preventDefault: () => { }, target: { name: 'add-tag-input-field', value: '123123' } })
		el.update()
		el
			.dive()
			.find('#add-tag-input-button')
			.simulate('click', { preventDefault: () => { }, target: { name: 'add-tag-input-button', value: 'value' } })
		el.update()
		expect(el).toMatchSnapshot()
	})

	it('shows validation error when adding an invalid tag number', () => {
		const el = shallow(<ManageTagsPanel {...props} />)
		console.log(el.debug())
		el
			.dive()
			.find('#add-tag-input-field')
			.simulate('change', { preventDefault: () => { }, target: { name: 'add-tag-input-field', value: '123' } })
		el.update()
		el
			.dive()
			.find('#add-tag-input-button')
			.simulate('click', { preventDefault: () => { }, target: { name: 'add-tag-input-button', value: 'value' } })
		el.update()
		expect(el).toMatchSnapshot()
	})

	it('returns a vaildation error when the tag API returns an error', () => {
		const el = shallow(<ManageTagsPanel {...props} />)
		props.visits.simulateValidationError()
		el.update()
		expect(el).toMatchSnapshot()
	})

})
