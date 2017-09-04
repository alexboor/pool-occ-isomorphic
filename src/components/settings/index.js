/**
 * Created by alexboor on 2/9/2017.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/settings';

import { Button, Loader } from 'semantic-ui-react';

export class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.actions.getDevicesList();
    }

    render() {
        return(
            <div>
                <h1>Settings</h1>

                <Loader inline active={this.props.isAddrListLoading} />
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    isAddrListLoading: state.settings.isAddrListLoading
});


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings)