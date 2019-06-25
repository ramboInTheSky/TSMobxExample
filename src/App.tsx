import React, { Component, Fragment } from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import { Provider } from 'mobx-react'
import { syncHistoryWithStore } from 'mobx-react-router'

import {
    Profiles,
    ProfileDetail,
    VisitDetail,
    ManageTags,
    ManageCustomAccess,
} from './routes'
import { stores } from './stores'

class App extends Component {
    public browserHistory: History
    public mobxSyncedHistory: any
    constructor(props: any) {
        super(props)
        this.browserHistory = createBrowserHistory()
        this.mobxSyncedHistory = syncHistoryWithStore(
            this.browserHistory,
            stores.routing!
        )
    }
    public render() {
        return (
            <Provider {...stores}>
                <Router history={this.mobxSyncedHistory}>
                    <Fragment>
                        <Route path="/" exact={true} component={Profiles} />
                        <Route
                            path="/profile/:profileId?"
                            exact={true}
                            component={ProfileDetail}
                        />
                        <Route
                            path="/profile/:profileId/visit/:visitId?"
                            exact={true}
                            component={VisitDetail}
                        />
                        <Route
                            path="/profile/:profileId/visit/:visitId/tag"
                            exact={true}
                            component={ManageTags}
                        />
                        <Route
                            path="/profile/:profileId/visit/:visitId/access"
                            exact={true}
                            component={ManageCustomAccess}
                        />
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

export default App
