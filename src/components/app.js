import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import {browserHistory} from 'react-router';
import { withRouter } from 'react-router';

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

    getPathname() {
        return this.props.router.location.pathname;
    }

    render() {
        return (
            <div>
            <Menu pointing secondary>
                <Menu.Item header>Pool controll center</Menu.Item>
                <Menu.Item name='Dashboard' active={this.getPathname() === '/'} href='/' onClick={::this._onClickDashboardLink}/>
                <Menu.Item name="Settings" active={this.getPathname() === '/settings'} href='/settings' onClick={::this._onClickSettingsLink}/>

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



export default withRouter(App);

{/*<Grid>*/}
    {/*<Grid.Row columns={1}>*/}
        {/*<Grid.Column>*/}
            {/*{this.props.children}*/}
        {/*</Grid.Column>*/}
    {/*</Grid.Row>*/}
{/*</Grid>*/}