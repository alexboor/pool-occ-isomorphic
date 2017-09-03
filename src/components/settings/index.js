/**
 * Created by alexboor on 2/9/2017.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/settings';

import { Button } from 'semantic-ui-react';

export class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    _onClickButton() {
        this.props.actions.getDevicesList();
    }

    render() {
        return(
            <div>
                <h1>Settings</h1>

                <div>{this.props.vv}</div>

                <Button onClick={::this._onClickButton}>
                    Test!
                </Button>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    vv: state.settings.vv
});


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings)