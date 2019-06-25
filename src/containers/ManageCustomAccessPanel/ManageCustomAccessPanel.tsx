import React from 'react'
import { inject, observer } from 'mobx-react'
import Loader from 'react-loader'
import PersonIcon from '@material-ui/icons/Person'
import { Button } from '@material-ui/core'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import HotelIcon from '@material-ui/icons/Hotel'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import AddIcon from '@material-ui/icons/Add'

import { Routing, StoreNames, ProfileStore, LockGroupStore, VisitStore } from '../../stores'
import {
    ActionIcon,
    Wrapper,
    TitleField,
    ProfileName,
    Container,
    Title,
    ActionsBar,
    ButtonsContainer,
    VisitDateFrom,
    VisitDateTo,
    RoomsContainer,
} from './Components'

import { Grid, Boundary, CardContainer } from '../../components';
import { getDateTimeString } from '../../utils'

export interface ManageCustomAccessProps {
    addAccessFn: Function
}

export interface ManageCustomAccessConnectedProps extends ManageCustomAccessProps {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
    lockGroups: LockGroupStore
}

@inject(StoreNames.profiles, StoreNames.routing, StoreNames.visits, StoreNames.lockGroups)
@observer
export class ManageCustomAccessPanel extends React.Component<ManageCustomAccessProps>{
    public gridApi: any
    public colDef = [
        {
            headerName: 'Name',
            field: 'name',
            minWidth: 70,
        },
        {
            headerName: 'Type',
            width: 50,
            field: 'type',
        },
        {
            headerName: 'Notes',
            minWidth: 100,
            field: 'notes',
        },
        {
            headerName: 'Add Room',
            width: 50,
            field: 'id',
            cellRendererFramework: (row: any) => (
                <ActionIcon
                    aria-label="Add Rooms Access"
                    title="Add Rooms Access"
                    onClick={(e: any) => this.addAccess(e, row.data.id)}
                    disabled={this.store.visits.isRoomLoading(row.data.id)}
                >
                    <AddIcon data-title="Add Rooms Access" />
                </ActionIcon>
            ),
        },
    ]
    get store() {
        return this.props as ManageCustomAccessConnectedProps
    }

    constructor(props: ManageCustomAccessProps) {
        super(props)
        this.gridApi = null
        
    }

    public done = () => {
        this.store.routing.goToPage(`/profile/${this.store.profiles.item.id}/visit/${this.store.visits.item.id}`)
    }

    public addAccess = async (e: any, id: string)=>{
        this.props.addAccessFn(e, id)
        this.gridApi.refreshCells({
            force: true
        })
    }

    public getGridApi = (gridApi: any)=>{
        this.gridApi = gridApi
    }

    public render() {
        
        const { item: visit } = this.store.visits
        const { item: profile } = this.store.profiles

        return (
            <Wrapper>
                <Container>
                    <Boundary>
                        <Title>
                            <TitleField>
                                <ProfileName>
                                    <PersonIcon />{`${profile.firstName} ${profile.lastName}`}
                                </ProfileName>
                                <span><KeyboardArrowRightIcon /></span>
                                <span>
                                    <HotelIcon /> Visit &nbsp;
                                </span>
                                <VisitDateFrom>
                                    {getDateTimeString(visit.fromDate)}
                                </VisitDateFrom>
                                <span><ArrowForwardIcon /></span>
                                <VisitDateTo>
                                    {getDateTimeString(visit.toDate)}
                                </VisitDateTo>
                                <span><KeyboardArrowRightIcon /></span>
                                <span>
                                    <MeetingRoomIcon /> Manage Custom Access
                                </span>
                            </TitleField>
                        </Title>
                    </Boundary>
                </Container>
                <Boundary>
                    <Loader loaded={!this.store.lockGroups.isLoading && !this.store.visits.isLoading}>
                        <Grid
                            loading={this.store.lockGroups.isLoading}
                            columnDefs={this.colDef}
                            rowData={this.store.lockGroups.items}
                            returnApi={this.getGridApi}
                            showQuickFilter={true}
                            small={true}
                        />
                    </Loader>
                </Boundary>
                {visit.lockGroups && visit.lockGroups.length ?
                    <Boundary>
                        <RoomsContainer>
                            <CardContainer items={visit.lockGroups} type="rooms" />
                        </RoomsContainer>
                    </Boundary>
                    : null
                }
                <Boundary>
                    <ActionsBar>
                        <ButtonsContainer>
                            <Button
                                className={'manage-tags-panel-manage-tags-button'}
                                variant="contained"
                                color="primary"
                                onClick={() => this.store.routing.goToPage(`/profile/${this.store.profiles.item.id}/visit/${this.store.visits.item.id}/tag`)}
                            >
                                <MeetingRoomIcon />&nbsp;{'Manage Tags'}
                            </Button>
                            <Button
                                className={'manage-tags-panel-done-button'}
                                variant="contained"
                                color="primary"
                                onClick={this.done}
                            >
                                <CheckCircleIcon />&nbsp; Done
                            </Button>
                        </ButtonsContainer>
                    </ActionsBar>
                </Boundary>
            </Wrapper>
        )
    }
}