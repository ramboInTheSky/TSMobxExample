import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Loader from 'react-loader'


import { Layout, ErrorMessage, Boundary } from '../../components'
import { ProfileStore, StoreNames, Routing } from '../../stores'
import { Visit } from '../../models/Visit'
import { VisitStore } from '../../stores/Visits';
import { CreateVisitPanel, ViewVisitPanel } from '../../containers'
import { isEmpty } from 'lodash';

export interface VisitDetailProps {
    match: {
        params: {
            profileId: string
            visitId: string
        }
    }
}

export interface VisitDetailConnectedProps extends VisitDetailProps {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
}

export interface VisitState {
    dateFrom: Date
    dateTo: Date | null
    selectedArchetypes: string[]
    noEndDate: boolean
}

@inject(StoreNames.profiles, StoreNames.routing, StoreNames.visits)
@observer
export class VisitDetail extends Component<VisitDetailProps, VisitState> {
    get store() {
        return this.props as VisitDetailConnectedProps
    }
    constructor(props: VisitDetailProps) {
        super(props)
        this.state = {
            dateFrom: new Date(),
            dateTo: null,
            selectedArchetypes: [],
            noEndDate: false
        }
    }

    public componentDidMount() {
        if (!this.store.profiles.item.id) {
            this.store.profiles.getDetail(this.props.match.params.profileId)
        }
        if (this.props.match.params.visitId === 'new') {
            this.store.visits.toggleEditing(true)
        }
        this.store.visits.getArchetypes()
    }

    public save = async (data: Visit, routeTo?: string) => {
        await this.store.visits.save(data, this.props.match.params.profileId)
        if (!isEmpty(this.store.visits.item)) {
            if (routeTo) {
                // this.store.visits.toggleEditing(true)
                this.store.routing.goToPage(`/profile/${this.store.profiles.item.id}/visit/${this.store.visits.item.id}/${routeTo}`)
            }
            else{
                this.store.routing.goToPage(`/profile/${this.store.profiles.item.id}/visit/${this.store.visits.item.id}`)
            }
        }
    }

    public render() {
        const { isError, isLoading, errorMessage, editing } = this.store.visits
        if (isError) return <ErrorMessage>{errorMessage}</ErrorMessage>
        return (
            <Layout>
                <Boundary>
                    <Loader loaded={!isLoading}>
                        {editing ?
                            <CreateVisitPanel saveFn={this.save} />
                            : <ViewVisitPanel />
                        }
                    </Loader>
                </Boundary>
            </Layout >
        )
    }
}
