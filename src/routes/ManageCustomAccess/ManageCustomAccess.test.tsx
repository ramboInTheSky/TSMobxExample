import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import { ManageCustomAccess } from '.'
import { ProfilesMock, RoutingMock } from '../../stores/mock'
import { VisitsMock } from '../../stores/mock/VisitsMock'
import { LockGroupMock } from '../../stores/mock/LockGroupsMock'

describe('<ManageCustomAccess />', () => {
    let props: any
    let shallowMaterial: any
    const Component = (ManageCustomAccess as any).wrappedComponent
    beforeEach(() => {
        props = {
            match: {
                params: {
                    profileId: '123',
                    visitId: '456',
                },
            },
            profiles: new ProfilesMock(),
            routing: new RoutingMock(),
            visits: new VisitsMock(),
            lockGroups: new LockGroupMock(),
        }
    })

    it('renders correctly', () => {
        expect(shallow(<Component {...props} />)).toMatchSnapshot()
    })

    it('calls the apis correctly', () => {
        shallow(<Component {...props} />)
        expect(props.lockGroups.getList).toHaveBeenCalled()
        // expect(props.profiles.getDetail).toHaveBeenCalled()
        // expect(props.visits.getDetail).toHaveBeenCalled()
    })

   
    it('renders correctly when data is loading', () => {
        const el = shallow(
            <Component
                {...props}
                lockGroups={{ ...props.lockGroups, loading: true }}
            />
        )
        expect(el).toMatchSnapshot()
    })

    it('handles API errors', () => {
        const el = shallow(
            <Component
                {...props}
                lockGroups={{ ...props.lockGroups, isError: true }}
            />
        )
        expect(el).toMatchSnapshot()
    })

    // it('renders correctly with data', () => {
    //     const lockGroups = new LockGroupMock().data
    //     const profile = new ProfilesMock().detail
    //     const visit = new VisitsMock().detail
    //     const el = shallow(
    //         <Component
    //             {...props}
    //             profiles={{ ...props.profiles, item: profile }}
    //             lockGroups={{ ...props.lockGroups, items: lockGroups }}
    //             visits={{ ...props.visits, item: visit }}
    //         />
    //     )
    //     expect(props.lockGroups.getList).toHaveBeenCalled()
    //     expect(props.profiles.getDetail).not.toHaveBeenCalled()
    //     expect(props.visits.getDetail).not.toHaveBeenCalled()
    //     expect(el).toMatchSnapshot()
    // })
})
