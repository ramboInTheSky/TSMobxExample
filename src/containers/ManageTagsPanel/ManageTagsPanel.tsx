import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Loader from 'react-loader'

import PersonIcon from '@material-ui/icons/Person'
import { Button } from '@material-ui/core'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import HotelIcon from '@material-ui/icons/Hotel'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'

import { Boundary, CardContainer } from '../../components'

import {
    Wrapper,
    TitleField,
    ProfileName,
    Container,
    Title,
    Action,
    ActionsBar,
    ButtonsContainer,
    InputContainer,
    Input,
    AddTagContainer,
    VisitDateFrom,
    VisitDateTo
} from './Components'

import { StoreNames, ProfileStore, Routing } from '../../stores'
import { VisitStore } from '../../stores/Visits'
import { Tag } from '../../models/Tag';
import { TagsContainer } from '../ViewVisitPanel/Components';
import { getDateTimeString } from '../../utils';


export interface ManageTagsPanelProps {
    addTag: Function
}

export interface ManageTagsPanelConnectedProps extends ManageTagsPanelProps {
    profiles: ProfileStore
    routing: Routing
    visits: VisitStore
}

export interface ManageTagsPanelState {
    currentTag?: string
    validation: { currentTag?: string }
}

@inject(StoreNames.profiles, StoreNames.routing, StoreNames.visits)
@observer
export class ManageTagsPanel extends Component<ManageTagsPanelProps, ManageTagsPanelState> {
    get store() {
        return this.props as ManageTagsPanelConnectedProps
    }
    constructor(props: ManageTagsPanelProps) {
        super(props)
        this.state = {
            currentTag: undefined,
            validation: { currentTag: undefined }
        }
    }

    public done = () => {
        this.store.routing.goToPage(`/profile/${this.store.profiles.item.id}/visit/${this.store.visits.item.id}`)
    }

    public addTag = async () => {
        const { currentTag } = this.state
        if (currentTag && currentTag.length > 6) {
            const tag = new Tag(currentTag)
            const succeeded = await this.props.addTag(tag)
            if(succeeded === true){
                this.clearSelection()
            }
        }
        else {
            this.setState({ validation: { currentTag: 'Tag numbers should be at least 6 digits' } })
        }
    }

    public handleChange = (e: any) => {
        if (e) e.preventDefault()
        this.setState({ currentTag: e.target.value, validation: { currentTag: undefined } }, () => this.store.visits.clearErrors())
    }

    public clearSelection = () => {
        this.setState({ currentTag: undefined, validation: { currentTag: undefined } }, () => this.store.visits.clearErrors())
    }

    public render() {
        const { item: visit, isValidationError, validationError, isLoading } = this.store.visits
        const { item: profile } = this.store.profiles
        const { currentTag, validation } = this.state

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
                                    <VpnKeyIcon /> Manage Tags
                                </span>
                            </TitleField>
                        </Title>
                    </Boundary>
                    <Boundary>
                        <AddTagContainer>
                            <InputContainer elevation={1}>
                                {currentTag && (
                                    <Action id="add-tag-input-clear" aria-label="Clear" onClick={this.clearSelection} title="Clear Search">
                                        <CloseIcon />
                                    </Action>
                                )}
                                <Input
                                    id="add-tag-input-field"
                                    name="add-tag-input-field"
                                    placeholder={'Add a Tag number'}
                                    onChange={this.handleChange}
                                    value={currentTag || ''}
                                    type="number"
                                    error={validation.currentTag || isValidationError}
                                    helperText={validation.currentTag || validationError}
                                />
                                <Loader loaded={!isLoading}>
                                    <Action id="add-tag-input-button" aria-label="Search" onClick={this.addTag} title="Search">
                                        <AddIcon />
                                    </Action>
                                </Loader>
                            </InputContainer>
                        </AddTagContainer>
                    </Boundary>
                </Container>
                {visit.tags && visit.tags.length ?
                    <Boundary>
                        <TagsContainer>
                            <CardContainer items={visit.tags} type="tags" />
                        </TagsContainer>
                    </Boundary>
                    : null
                }
                <Boundary>
                    <ActionsBar>
                        {/* <Button variant="contained" onClick={() => this.store.routing.goToPage(`/profile/${this.store.profiles.item.id}/visit/${this.store.visits.item.id}`)}>
                            <KeyboardArrowLeftIcon />&nbsp; Back
						</Button> */}
                        <ButtonsContainer>
                            <Button
                                className={'detail-panel-manage-rooms-button'}
                                variant="contained"
                                color="primary"
                                onClick={() => this.store.routing.goToPage(`/profile/${this.store.profiles.item.id}/visit/${this.store.visits.item.id}/access`)}
                            >
                                <MeetingRoomIcon />&nbsp;{'Manage Access'}
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
