import React, { Component } from 'react'
import SettingsIcon from '@material-ui/icons/Settings'

import { Boundary } from '../ErrorBoundary'
import logo from '../../assets/logo_dark_vertical.svg'
import { Wrapper, Logo, Title, MenuButton } from './Components'
import { MenuItem, Menu } from '@material-ui/core';
// tslint:disable-next-line: no-var-requires
const version = require('../../../package.json').version

export interface HeaderProps { }

export interface HeaderState {
    menuOpen?: boolean
}

export class Header extends Component<HeaderProps, HeaderState> {
    public state = {
        menuOpen: false
    }
    
    public toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen })
    
    public render() {
        const { menuOpen } = this.state;
        return (
            <Boundary>
                <Wrapper>
                    <Logo src={logo} alt="The Collective" />
                    <Title>ROOST</Title>
                    <div id="anchor-000">
                        <MenuButton
                            aria-owns={'Settings'}
                            aria-haspopup="true"
                            onClick={this.toggleMenu}><SettingsIcon
                            />
                        </MenuButton>
                        <Menu anchorEl={document.querySelector('#anchor-000') as any} aria-label="Settings" id="Settings" title="Settings" open={menuOpen} onClose={this.toggleMenu}>
                            <MenuItem onClick={this.toggleMenu}>UI version: {version}</MenuItem>
                            <MenuItem onClick={this.toggleMenu}>Build number: 1.0.0</MenuItem>
                        </Menu>
                    </div>
                </Wrapper>
            </Boundary>
        )
    }
}
