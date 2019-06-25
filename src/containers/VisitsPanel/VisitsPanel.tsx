import React, { PureComponent } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Boundary } from '../../components'
import { Wrapper, Entry, Dates, Times, Access, DatesContainer, Status, AccessContainer } from './Components'
import { Visit } from '../../models/Visit'

export interface VisitsPanelProps {
    visits?: Visit[]
}

export class VisitsPanel extends PureComponent<VisitsPanelProps> {
    constructor(props: VisitsPanelProps) {
        super(props)
    }

    public render() {
        const { visits } = this.props
        return (
            <Boundary>
                <Wrapper>
                    {visits &&
                        visits.map(visit => (
                            <ReactCSSTransitionGroup
                                key={visit.fromDate + visit.toDate}
                                transitionName="expand"
                                transitionAppear={true}
                                transitionAppearTimeout={200}
                                transitionEnterTimeout={200}
                                transitionLeaveTimeout={200}
                            >
                                <Entry style={{ opacity: new Date(visit.toDate) > new Date() ? 1 : 0.6 }}>
                                    <AccessContainer>
                                        <DatesContainer>
                                            <Dates>
                                                {`${new Date(visit.fromDate).toLocaleDateString()} - ${new Date(
                                                    visit.toDate,
                                                ).toLocaleDateString()}`}
                                            </Dates>
                                            <Times>
                                                {`${new Date(visit.fromDate).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })} - ${new Date(visit.toDate).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}`}
                                            </Times>
                                        </DatesContainer>
                                        <Access>
                                            {visit.lockGroups &&
                                                visit.lockGroups.length &&
                                                visit.lockGroups.join(', ')}
                                        </Access>
                                    </AccessContainer>
                                    <Status>{new Date(visit.toDate) > new Date() ? 'Active' : 'Inactive'}</Status>
                                </Entry>
                            </ReactCSSTransitionGroup>
                        ))}
                </Wrapper>
            </Boundary>
        )
    }
}
