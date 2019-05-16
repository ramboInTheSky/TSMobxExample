import { Visit } from './Visit'

export type ProfileType = 'visitor' | 'member'

export class Profile {
	id?: string = undefined
	fullName?: string = undefined
	firstName: string = ''
	lastName: string = ''
	company?: string = undefined
	mobileNumber?: string = ''
	emailAddress?: string = ''
	notes?: string = undefined
	created?: string = undefined
	type?: ProfileType = undefined
	visits?: Array<Visit> = undefined
}

export class CreateProfile {
	firstName: string = ''
	lastName: string = ''
	company?: string = undefined
	mobileNumber?: string = ''
	emailAddress?: string = ''
	notes?: string = undefined
	type?: ProfileType = undefined
}

export class EditProfile {
	id?: string = undefined
	firstName: string = ''
	lastName: string = ''
	company?: string = undefined
	mobileNumber?: string = ''
	emailAddress?: string = ''
	notes?: string = undefined
	created?: string = undefined
	type?: ProfileType = undefined
}

export interface ProfileResponse {
	count: number
	filters: Array<string>
	items: Array<Profile>
}
