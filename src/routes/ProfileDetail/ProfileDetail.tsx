import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { isEmpty } from 'lodash'
import Loader from 'react-loader'

import { Layout, ErrorMessage } from '../../components'
import { DetailPanel, VisitsPanel } from '../../containers'
import { ProfileStore, StoreNames, Routing } from '../../stores'
import { Profile } from '../../models/Profile'
import { VisitStore } from '../../stores/Visits';

export interface ProfileDetailProps {
	match: {params: {profileId: string}}
}

interface ProfileDetailConnectedProps extends ProfileDetailProps {
	profiles: ProfileStore
	routing:  Routing
	visits: VisitStore
}

export interface ProfileDetailState {
	data: Partial<Profile>
}

@inject(StoreNames.profiles, StoreNames.routing, StoreNames.visits)
@observer
export class ProfileDetail extends Component<ProfileDetailProps, ProfileDetailState> {
	get store(){
		return this.props as ProfileDetailConnectedProps
	}
	constructor(props: ProfileDetailProps) {
		super(props)
		this.state = {
			data: {},
		}
	}

	componentDidMount() {
		this.store.profiles.getDetail(this.props.match.params.profileId)
		if(this.props.match.params.profileId === 'new'){
			this.store.profiles.toggleEditing(true)	
		}
	}

	save = async (data: Profile, addVisits?: boolean) => {
		await this.store.profiles.save(data, data.id)
		if (!isEmpty(this.store.profiles.item)) {
			if (addVisits) {
				this.store.visits.toggleEditing(true)
				this.store.routing.goToPage(`/profile/${this.store.profiles.item.id}/visit/new`)
			}
		}
	}

	render() {
		// debugger
		if(!this.props.match.params.profileId){
			this.store.routing.goToPage('/')
		}
		const { isError, isLoading, errorMessage, item } = this.store.profiles
		return (
			<Layout>
				{!isError ? (
					<Loader loaded={!isLoading}>
						<DetailPanel callback={this.save} />
						<VisitsPanel visits={item.visits} />
					</Loader>
				) : (
					<ErrorMessage>{errorMessage}</ErrorMessage>
				)}
			</Layout>
		)
	}
}
