import React from 'react'
import { shallow } from 'enzyme'
import { createShallow, createMount } from '@material-ui/core/test-utils'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { ProfileStore, } from '../../stores'
configure({ adapter: new Adapter() })

import { DetailPanel, DetailPanelConnectedProps } from '.'
import { RoutingMock, VisitsMock } from '../../stores/mock';

describe('<DetailPanel />', () => {
	let props: DetailPanelConnectedProps
	let mount: any
	beforeEach(() => {
		props = {
			callback: jest.fn(),
			profiles: new ProfileStore(),
			routing: new RoutingMock() as any,
			visits: new VisitsMock() as any
		}
		mount = createShallow()
	})
	it('renders correctly with no data', () => {
		expect(shallow(<DetailPanel {...props} />)).toMatchSnapshot()
	})

	it('renders correctly with data', () => {
		const newProps = {
			...props,
			data: {
				profileId: 'wert34-324c523-2c356-c34c523-4c23456v23',
				firstName: 'Bruce',
				lastName: 'Wayne',
				company: 'Wayne Enterprises',
				mobileNumber: '555-123-123',
				emailAddress: 'info@waine-enterprises.com',
				notes: 'Gotham is safe',
				created: '2014-03-25T12:00:00Z',
				type: undefined,
				lockGroups: ['Default', 'Boiler', '1.11'],
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
			},
		}
		expect(shallow(<DetailPanel {...newProps} />)).toMatchSnapshot()
	})

	it('sets edit mode on edit click and display correctly', () => {
		const el = mount(<DetailPanel {...props} />)
		el
			.dive()
			.find('.detail-panel-edit-button')
			.simulate('click', { preventDefault: () => { }, target: { name: 'input', value: 'value' } })
		el.update()
		expect(el).toMatchSnapshot()
	})

	it('correctly goes back to non-edit mode', () => {
		const el = mount(<DetailPanel {...props} />)
		el
			.dive()
			.find('.detail-panel-edit-button')
			.simulate('click', { preventDefault: () => { }, target: { name: 'input', value: 'value' } })
		el.update()
		el
			.dive()
			.find('.cancel-edit-button')
			.simulate('click', { preventDefault: () => { }, target: { name: 'input', value: 'value' } })
		el.update()
		expect(el).toMatchSnapshot()
	})

	it('calls the callback on save', () => {
		const el = mount(<DetailPanel {...props} />)
		el
			.dive()
			.find('.detail-panel-edit-button')
			.simulate('click', { preventDefault: () => { }, target: { name: 'input', value: 'value' } })
		el.update()
		el
		.dive()
		.find('.detail-panel-save-button')
		.simulate('click', { preventDefault: () => { }, target: { name: 'input', value: 'value' } })
		expect(props.callback).toHaveBeenCalled()
	})

	it('routes out on add visit', () => {
		const el = mount(<DetailPanel {...props} />)
		el
		.dive()
		.find('.detail-panel-add-visit-button')
		.simulate('click', { preventDefault: () => { }, target: { name: 'input', value: 'value' } })
		expect(props.routing.goToPage).toHaveBeenCalled()
	})
})
