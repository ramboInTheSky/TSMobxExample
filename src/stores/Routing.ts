import { observable, action, toJS } from 'mobx'
import { RouterStore } from 'mobx-react-router'
import { isUUID } from 'validator'

export class Routing extends RouterStore {
	@observable protected breadcrumb: Array<{page: string, id?: string}> = []

	constructor() {
		super()
		this.rebuildBreadcrumb()
	}

	splitThings(temp: Array<string>){
		return (temp.map((item: string, index: number, arr: Array<string>) => {
			if(!isUUID(item)){
				return ({page: item, id: (arr[index+1] && isUUID(arr[index+1]) ? arr[index+1] : undefined)} as {page: string, id?: string} )
			}
			else {
				return null
			}
		}).filter(item => item) ) as any 
	}

	@action
	rebuildBreadcrumb = ()=>{
		const pathname = location.pathname !== '/' ? location.pathname : ''
		const temp = pathname.split('/').splice(1)
		this.breadcrumb = this.splitThings(temp)
	}

	getBreadcrumb = () => {
		return toJS(this.breadcrumb)
	}

	@action
	resizeBreadcrumb = () => {
		this.rebuildBreadcrumb()
	}

	@action
	goToPage(route: string) {
		if (route !== '/') {
			const pages = route.split('/').splice(1)
			this.breadcrumb = this.splitThings(pages)
		} else {
			this.breadcrumb = []
		}
		this.push(route)
	}
}
