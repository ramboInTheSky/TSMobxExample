// first party
import { ProfileStore } from './Profiles'
import { Routing } from './Routing'
import { VisitStore } from './Visits'
import { LockGroupStore } from './LockGroups'

// re-exports
export * from './Profiles'
export * from './Routing'
export * from './Visits'
export * from './LockGroups'

export interface Stores {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
    lockGroups: LockGroupStore
}

type StoreNamesGuard = keyof Stores

export class StoreNames {
    public static profiles: StoreNamesGuard = 'profiles'
    public static routing: StoreNamesGuard = 'routing'
    public static visits: StoreNamesGuard = 'visits'
    public static lockGroups: StoreNamesGuard = 'lockGroups'
}

const localStores: Partial<Stores> = {
    profiles: new ProfileStore(),
    routing: new Routing(),
    visits: new VisitStore(),
    lockGroups: new LockGroupStore(),
}

// test comment
export const stores = { ...localStores }
