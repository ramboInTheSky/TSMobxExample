import React from 'react'
import { shallow } from 'enzyme'
import { createShallow } from '@material-ui/core/test-utils';

import { Search, SearchProps } from './Search'
import { ELOOP } from 'constants';

describe('<Search />', () => {
	let props: SearchProps
	let shallowMaterial: any
	beforeEach(() => {
		props = {
            onChange: jest.fn(()=>{}),
            placeholder: 'this is a placeholder'
		}
		shallowMaterial = createShallow()
	})
	it('renders correctly', () => {
		expect(shallow(<Search {...props}/>)).toMatchSnapshot()
	})
	it('calls onChange on clicking clear', () => {
		const component = shallowMaterial(<Search {...props}/>)
		component.find('[title="Search"]').simulate('click')
		expect(props.onChange).toHaveBeenCalled()
	})
})
