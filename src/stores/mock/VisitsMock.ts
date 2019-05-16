import { Archetype, Visit } from '../../models/Visit';
import { Tag } from '../../models/Tag';

export class VisitsMock{
    archetypes:{
		primary: Array<Archetype>,
		secondary: Array<Archetype>
	} = {
			primary: [],
			secondary: []
		}
		getArchetypes: Function = jest.fn()
		detail: Visit = new Visit()
		item = ()=> this.detail
		addTag = (tag: Tag, profileId: string, visitId: string) => {this.detail.tags.push(tag.tagNumber!)}
		clearErrors = jest.fn()
		validationError?: string = undefined
		simulateValidationError = () => this.validationError = 'this is an error'
}