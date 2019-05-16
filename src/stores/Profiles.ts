import { observable, action } from 'mobx'
import { Store } from './APIStore'
import { Profile, CreateProfile, EditProfile } from '../models/Profile'
import urls from '../constants/urls'
import { Visit } from '../models/Visit'

const sortingFn = (a: Visit, b: Visit) => {
	const first = new Date(a.toDate)
	const last = new Date(b.toDate)
	if (first > last) return -1
	if (last > first) return 1
	return 0
}

export class ProfileStore extends Store<Profile> {
	constructor() {
		super(urls.profiles)
	}

	@observable protected edit: boolean = false

	public get editing(){
		return this.edit
	}
	
	@action
	toggleEditing(editing?: boolean) {
		if (editing !== undefined) {
			this.edit = editing
		} else this.edit = !this.edit
	}

	async getList(filter?: string) {
		const data = await super.getList(undefined, filter)
		this.data =
			data && data.items && data.items.length
				? data.items.map((item: Profile) => {
						item.fullName = item.firstName + ' ' + item.lastName
						return item
					})
				: []
	}

	async getDetail(profileId: string) {
		if (profileId !== 'new') {
			const data = await super.getDetail(profileId)
			if (data) {
				const item: Profile = { ...data, fullName: `${data.firstName} ${data.lastName}` }
				const sorted = item.visits && item.visits.length ? item.visits.sort(sortingFn) : item
				this.detail = item
				return
			}
			this.detail = new Profile()
		}
		this.detail = new Profile()
	}

	async save(item: Profile, id?: string) {
		const payload = Object.assign(id ? new EditProfile() : new CreateProfile(), item)
		this.detail = {}
		const data = await super.save(payload, id)
		this.edit = false
		this.detail = data
	}
}
