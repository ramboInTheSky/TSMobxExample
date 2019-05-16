import React from 'react'
import axios from 'axios'

import { VisitStore } from './Visits'
import { CreateVisit, Visit } from '../models/Visit';

jest.mock('axios', () => ({
    get: jest.fn(
        (url: string) =>
            url === 'fail' ? Promise.reject({ status: 500 }) : Promise.resolve({ status: 200, data: {} }),
    ),
    post: jest.fn(
        (url: string) =>
            url === 'fail' ? Promise.reject({ status: 500 }) : Promise.resolve({ status: 200, data: {} }),
    ),
}))

describe('<VisitStore />', () => {
    it('renders correctly', () => {
        const store = new VisitStore()
        expect(store).toMatchSnapshot()
    })
    it('sets isError if API issues', async () => {
        const store = new VisitStore()
        await store.getList()
        setTimeout(() => expect(store.isError).toBe(true))
    })
    it('returns data correctly', async () => {
        const store = new VisitStore()
        await store.getList()
        setTimeout(() => expect(store.isError).toBe(false))
    })
    it('saves correctly and polls for status', async () => {
        const store = new VisitStore()
        const visit = Object.assign(new Visit(), { "lock_groups": [], "from_date": "2019-05-11T16:40:00.000Z", "to_date": null, "tags": [], "archetype_ids": ["9108859f-c93a-48dd-8e49-8725390d063d"] })
        await store.save(visit, 'profile-id')
        expect(axios.post).toHaveBeenCalledWith(
            "https://csi-dev.thecollective.com/ac-api/profile/profile-id/visit",
            {
                "archetype_ids": ["9108859f-c93a-48dd-8e49-8725390d063d"],
                "from_date": "2019-05-11T16:40:00.000Z",
                "id": null,
                "lock_groups": [],
                "tags": [],
                "to_date": null
            })

        expect(axios.get).toHaveBeenCalled()
        //TODO test polling better
    })

})
