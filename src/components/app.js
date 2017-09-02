import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './app.css';


export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    _onClickDashboardLink() {
        window.location.href='/'
    }

    _onClickSettingsLink() {
        window.location.href='/settings'
    }

    render() {
        return (
            <Menu pointing secondary>
                <Menu.Item header>Pool controll center</Menu.Item>
                <Menu.Item name='Dashboard' active={true} onClick={::this._onClickDashboardLink}/>
                <Menu.Item name="Settings" onClick={::this._onClickSettingsLink}/>

                <Menu.Menu position='right'>
                    <Menu.Item name='Logout' />
                </Menu.Menu>
            </Menu>
        );
    }
}



export default App;