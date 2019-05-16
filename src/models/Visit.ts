import { LockGroup } from './LockGroups'
export class Visit {
    id: string = ''
    lockGroups?: Array<LockGroup | string>  = []
    fromDate: string = ''
    toDate: string = ''
    tags: Array<string> = []
    archetypeIds: Array<string> = []
}

export class CreateVisit {
    lockGroups?: Array<LockGroup> = []
    fromDate: string = ''
    toDate: string = ''
    tags: Array<string> = []
    archetypeIds: Array<string> = []
}

export interface Archetype {
    id: string
    name: string
    primary: boolean
    lockGroupNames: Array<string>
}

export class Archetypes {
    primary: Array<Archetype> = []
    secondary: Array<Archetype> = []
}