import { Routing } from '../Routing';

export class RoutingMock extends Routing{
	goToPage:any = jest.fn()
	goBackToPage:any = jest.fn()
	push:any = jest.fn()
	replace:any = jest.fn()
	go:any = jest.fn()
	goBack:any = jest.fn()
	goForward:any = jest.fn()
	breadcrumb: Array<any> = []
	location: any = {}
	history: any = {}
	getBreadcrumb: any = jest.fn()
	resizeBreadcrumb: any = jest.fn()
	splitThings: any = jest.fn()
	rebuildBreadcrumb: any = jest.fn()
}