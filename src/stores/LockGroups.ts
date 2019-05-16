import { observable, action } from 'mobx'
import { Store } from './APIStore'
import { LockGroup } from '../models/LockGroups'
import urls from '../constants/urls'

const sortingFn = (a: LockGroup, b: LockGroup) => {
	const first = a.name
	const last = b.name
	if (first > last) return -1
	if (last > first) return 1
	return 0
}

export class LockGroupStore extends Store<LockGroup> {
	@observable
	public selectedLockGroups: Array<LockGroup> = []

	constructor() {
		super(urls.lockGroups)
	}

	async getList(filter?: string) {
		const data = await super.getList(undefined, filter)
		this.data =
			data && data.items ? data.items : []
	}

	@action 
	setList(newList: Array<LockGroup>){
		this.data = newList
	}

}
