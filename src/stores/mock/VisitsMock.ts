import { Archetype, Visit } from '../../models/Visit';
import { Tag } from '../../models/Tag';

export class VisitsMock{
    public archetypes:{
        primary: Archetype[],
        secondary: Archetype[]
    } = {
            primary: [],
            secondary: []
        }
        public getArchetypes: Function = jest.fn()
        public detail: Visit = new Visit()
        public clearErrors = jest.fn()
        public validationError?: string = undefined
        public item = ()=> this.detail
        public addTag = (tag: Tag, profileId: string, visitId: string) => {this.detail.tags.push(tag.tagNumber!)}
        public simulateValidationError = () => this.validationError = 'this is an error'
}