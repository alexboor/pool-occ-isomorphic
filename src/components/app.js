import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {browserHistory} from 'react-router';

import 'semantic-ui-css/semantic.min.css';
import './app.css';


export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    _onClickDashboardLink(e) {
        e.preventDefault();
        // window.location.href='/'
        browserHistory.push('/');
    }

    _onClickSettingsLink(e) {
        e.preventDefault();
        // window.location.href='/settings'
        browserHistory.push('/settings');
    }

    render() {
        return (
            <div>
            <Menu pointing secondary>
                <Menu.Item header>Pool controll center</Menu.Item>
                <Menu.Item name='Dashboard' active={true} href='/' onClick={::this._onClickDashboardLink}/>
                <Menu.Item name="Settings" href='/settings' onClick={::this._onClickSettingsLink}/>

                <Menu.Menu position='right'>
                    <Menu.Item name='Logout' />
                </Menu.Menu>
            </Menu>

            <Segment basic>
                {this.props.children}
            </Segment>


            </div>
        );
    }
}



export default App;

{/*<Grid>*/}
    {/*<Grid.Row columns={1}>*/}
        {/*<Grid.Column>*/}
            {/*{this.props.children}*/}
        {/*</Grid.Column>*/}
    {/*</Grid.Row>*/}
{/*</Grid>*/}