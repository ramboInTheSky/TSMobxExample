import React from 'react'
import { shallow } from 'enzyme'

import {
	Wrapper,
	Container,
	TitleField,
	Title,
	ProfileName,
	AddTagContainer,
	InputContainer,
	Input,
	Action,
	ActionsBar,
	ButtonsContainer,
	VisitDateFrom,
	VisitDateTo
} from './Components'

describe('<Wrapper />', () => {
	it('renders correctly', () => {
		expect(shallow(<Wrapper />)).toMatchSnapshot()
	})
})

describe('<Container />', () => {
	it('renders correctly', () => {
		expect(shallow(<Container />)).toMatchSnapshot()
	})
})

describe('<TitleField />', () => {
	it('renders correctly', () => {
		expect(shallow(<TitleField />)).toMatchSnapshot()
	})
})

describe('<Title />', () => {
	it('renders correctly', () => {
		expect(shallow(<Title />)).toMatchSnapshot()
	})
})

describe('<ProfileName />', () => {
	it('renders correctly', () => {
		expect(shallow(<ProfileName />)).toMatchSnapshot()
	})
})

describe('<AddTagContainer />', () => {
	it('renders correctly', () => {
		expect(shallow(<AddTagContainer />)).toMatchSnapshot()
	})
})

describe('<Action />', () => {
	it('renders correctly', () => {
		expect(shallow(<Action />)).toMatchSnapshot()
	})
})

describe('<InputContainer />', () => {
	it('renders correctly', () => {
		expect(shallow(<InputContainer />)).toMatchSnapshot()
	})
})

describe('<Input />', () => {
	it('renders correctly', () => {
		expect(shallow(<Input />)).toMatchSnapshot()
	})
})

describe('<ButtonsContainer />', () => {
	it('renders correctly', () => {
		expect(shallow(<ButtonsContainer />)).toMatchSnapshot()
	})
})

describe('<ActionsBar />', () => {
	it('renders correctly', () => {
		expect(shallow(<ActionsBar />)).toMatchSnapshot()
	})
})

describe('<VisitDateFrom />', () => {
	it('renders correctly', () => {
		expect(shallow(<VisitDateFrom />)).toMatchSnapshot()
	})
})

describe('<VisitDateTo />', () => {
	it('renders correctly', () => {
		expect(shallow(<VisitDateTo />)).toMatchSnapshot()
	})
})
