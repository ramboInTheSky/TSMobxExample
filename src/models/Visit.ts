import { LockGroup } from './LockGroups'
export class Visit {
    public id: string = ''
    public lockGroups?: Array<LockGroup | string>  = []
    public fromDate: string = ''
    public toDate: string = ''
    public tags: string[] = []
    public archetypeIds: string[] = []
}

export class CreateVisit {
    public lockGroups?: LockGroup[] = []
    public fromDate: string = ''
    public toDate: string = ''
    public tags: string[] = []
    public archetypeIds: string[] = []
}

export interface Archetype {
    id: string
    name: string
    primary: boolean
    lockGroupNames: string[]
}

export class Archetypes {
    public primary: Archetype[] = []
    public secondary: Archetype[] = []
}