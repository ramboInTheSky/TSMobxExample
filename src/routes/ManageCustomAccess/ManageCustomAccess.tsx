import React from 'react'
// import Loader from 'react-loader'
import { Routing, StoreNames, ProfileStore, LockGroupStore } from '../../stores'
import { VisitStore } from '../../stores/Visits'
import { inject, observer } from 'mobx-react'


import { Layout, Boundary, ErrorMessage } from '../../components'
import { ManageCustomAccessPanel } from '../../containers/ManageCustomAccessPanel';

export interface ManageCustomAccessProps {
    match: {
        params: {
            profileId: string
            visitId: string
        }
    }
}

export interface ManageCustomAccessConnectedProps extends ManageCustomAccessProps {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
    lockGroups: LockGroupStore
}
@inject(StoreNames.profiles, StoreNames.routing, StoreNames.visits, StoreNames.lockGroups)
@observer
export class ManageCustomAccess extends React.Component<ManageCustomAccessProps> {
    get store() {
        return this.props as ManageCustomAccessConnectedProps
    }

    constructor(props: ManageCustomAccessProps) {
        super(props)
    }

    public componentDidMount() {
        if (!this.store.lockGroups.items.length) {
            this.store.lockGroups.getList()
        }
        if (!this.store.profiles.item.id) {
            this.store.profiles.getDetail(this.props.match.params.profileId)
        }
        // if (!this.store.visits.item.id) {
        //     this.store.visits.getDetail(this.props.match.params.visitId)
        // }
    }

    public addAccess = async (e: any, id: string) => {
        e.preventDefault()
        console.log(id)
        const lockGroup = this.store.lockGroups.items.find(item => item.id === id)
        if (lockGroup) {
            const success = await this.store.visits.addAccess(lockGroup, this.store.profiles.item.id!, this.store.visits.item.id)
            if (success === true) {
                this.store.lockGroups.setList(this.store.lockGroups.items.filter(item => item.id !== id))
                this.store.lockGroups.selectedLockGroups.push(lockGroup)
            }
        }
    }

    public render() {
        if (this.store.visits.isError || this.store.lockGroups.isError) return <ErrorMessage>{this.store.visits.errorMessage || this.store.lockGroups.errorMessage}</ErrorMessage>
        return (
            <Layout>
                <Boundary>
                    {/* <Loader loaded={!isLoading}> */}
                    <ManageCustomAccessPanel addAccessFn={this.addAccess} />
                    {/* </Loader> */}
                </Boundary>
            </Layout>
        )
    }
}