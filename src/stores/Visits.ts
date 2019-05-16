import { observable, action, computed } from 'mobx'
import axios from 'axios'
import { Store } from './APIStore'
import { Visit, CreateVisit, Archetype } from '../models/Visit'
import urls from '../constants/urls'
import { Tag } from '../models/Tag';
import { toSnakeCase, toCamelCase, getErrorCode } from '../utils';
import { error } from 'util';
import { LockGroup } from '../models/LockGroups';

const sortingFn = (a: Visit, b: Visit) => {
	const first = new Date(a.toDate)
	const last = new Date(b.toDate)
	if (first > last) return -1
	if (last > first) return 1
	return 0
}

export class VisitStore extends Store<Visit> {
	@observable protected archetypesObj: {
		primary: Array<Archetype>,
		secondary: Array<Archetype>
	} = {
			primary: [],
			secondary: []
		}

	@observable protected edit: boolean = false
	@observable protected roomLoading: {[key: string]:boolean} = {}
	@observable protected internalValidationError?: string = undefined
	@observable protected erroredTag?: string = undefined

	public get editing() {
		return this.edit
	}

	public get isValidationError() {
		return !!this.validationError
	}

	public isRoomLoading(id: string) {
		return !!this.roomLoading[id]
	}

	@action
	clearErrors = () => {
		this.internalValidationError = undefined
		this.erroredTag = undefined
	}

	public get validationError() {
		return this.internalValidationError
	}

	@action
	toggleEditing(editing?: boolean) {
		if (editing !== undefined) {
			this.edit = editing
		} else this.edit = !this.edit
	}


	public get archetypes() {
		return this.archetypesObj
	}

	constructor() {
		super(urls.visits)
	}

	async getArchetypes() {
		const data = await super.getList(urls.archetypes, undefined)
		const primary = data.items.filter((item: Archetype) => item.primary)
		const secondary = data.items.filter((item: Archetype) => !item.primary)
		this.archetypesObj = { primary, secondary }
	}

	async save(item: Visit, profileId: string) {
		let timeout: any = undefined
		try {
			let tries = 0
			const maxTries = 30
			const pollingTime = 3000
			const url = `${urls.profiles}/${profileId}/visit`
			const payload = Object.assign(new CreateVisit(), item)
			this.detail = {}
			const data = await super.save(payload, undefined, url)
			this.loading = true
			this.edit = false
			this.detail = data
			const self = this
			try {
				let pollingResult: any = {}
				timeout = setInterval(async () => {
					try {
						if (tries < maxTries) {
							pollingResult = await axios.get(`${url}/${self.detail.id}/status`)
							tries++
							if (pollingResult && pollingResult.data.finished) {
								if (!pollingResult.data.error) {
									self.apiEnded()
								}
								else {
									self.apiEnded(pollingResult, pollingResult.data.error)
								}
								clearInterval(timeout)
							}
						}
						else {
							throw new Error('maximum number of polls exceeded')
						}
					}
					catch (pollingError) {
						this.apiEnded(pollingError)
						clearInterval(timeout)
					}
				}, pollingTime)
			}
			catch (err) {
				this.apiEnded(err, 'TEMP MESSAGE - Something has gone wrong with Salto!')
			}
		}
		catch (failsafe) {
			clearInterval(timeout)
		}
	}

	async addTag(tag: Tag, profileId: string, visitId: string) {
		const url = `${urls.profiles}/${profileId}/visit/${visitId}/tag`
		let res: any
		try {
			this.loading = true
			res = await axios.post(url, toSnakeCase(tag))
			this.apiEnded()
			const data = toCamelCase(res.data)
			if (data.success) {
				this.detail.tags = this.detail.tags || []
				this.detail.tags.push(data.tagNumber)
			}
			else {
				this.apiEnded()
				this.erroredTag = data.tagNumber
				this.internalValidationError = getErrorCode(data)
			}
			return data.success
		} catch (error) {
			this.apiEnded()
			let data = {}
			if (error.response) {
				data = toCamelCase(error.response.data)
			}
			this.erroredTag = tag.tagNumber!
			this.internalValidationError = getErrorCode(data)
			return {}
		}
	}

	async addAccess(lockGroup: LockGroup, profileId: string, visitId: string) {
		const url = `${urls.profiles}/${profileId}/visit/${visitId}/lockgroup`
		let res: any
		try {
			this.roomLoading[lockGroup.id] = true
			res = await axios.post(url, {
				"lock_group_id": lockGroup.id
			})
			const data = toCamelCase(res.data)
			if (data.lockGroupId) {
				this.detail.lockGroups = this.detail.lockGroups || []
				this.detail.lockGroups.push(lockGroup as LockGroup)
				return true
			}
			this.roomLoading[lockGroup.id] = false
			return false
		} catch (error) {
			if (error.response) {
				this.apiEnded(toCamelCase(error.response.data))
			}
			else {
				this.apiEnded(error)
			}
			this.roomLoading[lockGroup.id] = false
			return {}
		}
	}
}