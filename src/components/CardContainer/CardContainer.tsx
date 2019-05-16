import React, { version } from 'react'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import { Wrapper, Header, Content, Item, MenuHeader } from './Components'
import { variables } from '../../constants/theme'
import { Menu, MenuItem } from '@material-ui/core';
import { LockGroup } from '../../models/LockGroups';

export interface CardContainerProps {
	type: 'rooms' | 'tags'
	items?: Array<string | LockGroup> 
	removeItemFn?: Function
}

export interface CardContainerState {
	menuOpen: { [key: string]: boolean }
}

export class CardContainer extends React.Component<CardContainerProps, CardContainerState> {
	constructor(props: CardContainerProps) {
		super(props)
		this.state = {
			menuOpen: this.initializePopups()
		}
	}

	initializePopups() {
		let obj = {}
		if (this.props.items) {
			this.props.items.forEach((item: any) => {
				obj[item.name || item] = false
			})
			return obj
		}
		else {
			return {}
		}
	}

	toggleMenu = (e: any, item: string) => this.setState({ menuOpen: { ...this.state.menuOpen, [item]: !this.state.menuOpen[item] } })

	render() {
		const { items, type } = this.props
		const { menuOpen } = this.state
		
		return items ? <Wrapper>
			<Header style={{ backgroundColor: `${type === 'tags' ? variables.tagColor : variables.roomColor}` }}>
				{type.toUpperCase()}
			</Header>
			<Content>
				{(items as any).map((_item: any, i: number) => {
					const item = _item.name || _item
					return <div id={`${type}-anchor-${item.replace(/ /g, '-')}`}>
						<Item key={item} >
							<div><DeleteIcon onClick={(e: any) => this.toggleMenu(e, item)} /></div>
							<div>{type === 'tags' ? <VpnKeyIcon /> : <MeetingRoomIcon />} {item}</div>

						</Item>
						<Menu anchorEl={document.querySelector(`#${type}-anchor-${item.replace(/ /g, '-')}`) as any} aria-label="Settings" id="Settings" title="Settings" open={menuOpen[item]} onClose={(e: any) => this.toggleMenu(e, item)}>
							<MenuHeader>Delete <span>{type === 'tags' ? 'Tag: ' : 'Room: '}{item}</span></MenuHeader>
							<MenuItem onClick={(e: any) => this.toggleMenu(e, item)}>Yes</MenuItem>
							<MenuItem onClick={(e: any) => this.toggleMenu(e, item)}>Cancel</MenuItem>
						</Menu>
					</div>
				})}
			</Content>
		</Wrapper> : null
	}
}
