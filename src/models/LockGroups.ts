export class LockGroup{
    constructor(id?: string, name?: string, type?: string){
        this.id = id || ''
        this.name = name || ''
        this.type = type || 'Room'
    }
    id: string = ''
    name: string = ''
    type: string = ''
    notes: string = ''
    selected: boolean = false
}

export class CreateLockGroup{
    name: string = ''
    type: string = ''
    notes: string = ''
}

export interface LockGroupResponse {
	count: number
	filters: Array<string>
	items: Array<LockGroup>
}
