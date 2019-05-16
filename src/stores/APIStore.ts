import { observable, action, toJS } from 'mobx'
import axios from 'axios'

import { getErrorCode, toSnakeCase, toCamelCase } from '../utils'

export { observable, action }

export class Store<T> {
	private url: string
	private fresh = false

	@observable protected data: Array<T> = []

	@observable protected detail: T | Partial<T> = {}

	@observable protected count: number = 0

	@observable protected loading: boolean = false

	@observable public error?: string = undefined

	constructor(uri: string) {
		this.url = uri
	}
	// public API
	// public getItems = (): Array<T> => {
	// 	return toJS(this.data) as Array<T>
	// }

	public get items(): Array<T> {
		return toJS(this.data) as Array<T>
	}

	public get item(): T {
		return toJS(this.detail) as T
	}

	// public getItem = (): T => {
	// 	return toJS(this.detail) as T
	// }

	public get errorMessage(): string {
		return this.error as string
	}

	public get isLoading(): boolean {
		return this.loading
	}

	public get isError(): boolean {
		return !!this.error
	}

	public isFresh = () => this.fresh
	// end public API

	protected apiEnded = (e?: any, customMessage?: string) => {
		this.loading = false
		this.error = e ? customMessage || getErrorCode(e) : undefined
		this.fresh = true
		const self = this
		setTimeout(function () {
			self.fresh = false
		})
	}

	@action
	async getList(url?: string, filter?: string) {
		if (!this.url && !url) return
		try {
			this.loading = true
			let res: any
			res = await axios.get(url || this.url + '?filter=' + filter)
			this.apiEnded()
			this.count = res.data && res.data.count ? res.data.count : 0
			return toCamelCase(res.data)
		} catch (e) {
			this.apiEnded(e)
			this.count = 0
			return []
		}
	}

	@action
	async getDetail(item: string) {
		try {
			this.loading = true
			let res: any
			res = await axios.get(`${this.url}/${item}`)
			this.apiEnded()
			return toCamelCase(res.data)
		} catch (e) {
			this.apiEnded(e)
			return {}
		}
	}

	@action
	async save(item: Partial<T>, id?: string, url?: string) {
		try {
			this.loading = true
			let res: any
			if (id) {
				res = await axios.put(`${url || this.url}/${id}`, toSnakeCase(item))
			} else {
				res = await axios.post(url || this.url, toSnakeCase(item))
			}
			this.apiEnded()
			return toCamelCase(res.data)
		} catch (e) {
			this.apiEnded(e)
			return {}
		}
	}
}
