import { Profile } from '../../models/Profile';

export class ProfilesMock {
    item: Profile = {
        id: "1aa657bc-d556-4643-a68f-af46f1bdba89",
        firstName: "Clark",
        lastName: "Kent",
        company: "test 123",
        mobileNumber: "01234567890",
        emailAddress: "dsg@dsf.com",
        notes: "fdsdfsfs",
        created: "2019-04-16T12:03:37.493156",
        visits: [
            {
                id: "d3aa88e2-c754-41e0-8ba6-4198a34aa0a2",
                lockGroups: ["Default", "Boiler", "1.11"],
                fromDate: "2015-03-23T11:00:00Z",
                toDate: "2015-11-25T12:00:00Z",
                tags: ["123123", "234234", "345345"],
                archetypeIds: []
            },
        ]
    }
    items: Array<Profile> = [{
        id: "1aa657bc-d556-4643-a68f-af46f1bdba89",
        firstName: "Clark",
        lastName: "Kent",
        company: "test 123",
        mobileNumber: "01234567890",
        emailAddress: "dsg@dsf.com",
        notes: "fdsdfsfs",
        created: "2019-04-16T12:03:37.493156",
        visits: [
            {
                id: "d3aa88e2-c754-41e0-8ba6-4198a34aa0a2",
                lockGroups: ["Default", "Boiler", "1.11"],
                fromDate: "2015-03-23T11:00:00Z",
                toDate: "2015-11-25T12:00:00Z",
                tags: ["123123", "234234", "345345"],
                archetypeIds: []
            },
        ]
    }]
    isLoading: boolean = false
    isError: boolean = false
    getDetail: Function = jest.fn()
    getList: Function = jest.fn()
}