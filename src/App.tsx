import React, { Component, Fragment } from 'react'
import { Router, Route, Link } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'
import { Provider } from 'mobx-react'
import { syncHistoryWithStore } from 'mobx-react-router'


import { Profiles, ProfileDetail, VisitDetail, ManageTags, ManageCustomAccess } from './routes'
import { stores } from './stores'

class App extends Component {
	browserHistory: History
	mobxSyncedHistory: any
	constructor(props: any) {
		super(props)
		this.browserHistory = createBrowserHistory()
		this.mobxSyncedHistory = syncHistoryWithStore(this.browserHistory, stores.routing!)
	}
	render() {
		return (
			<Provider {...stores}>
				<Router history={this.mobxSyncedHistory}>
					<Fragment>
						<Route path="/" exact component={Profiles} />
						<Route path="/profile/:profileId?" exact component={ProfileDetail} />
						<Route path="/profile/:profileId/visit/:visitId?" exact component={VisitDetail} />
						<Route path="/profile/:profileId/visit/:visitId/tag" exact component={ManageTags} />
						<Route path="/profile/:profileId/visit/:visitId/access" exact component={ManageCustomAccess} />
					</Fragment>
				</Router>
			</Provider>
		)
	}
}

export default App