/**
 * Created by alexboor on 2/9/2017.
 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/settings';

import { Button, Loader, Message } from 'semantic-ui-react';

import ListDevices from './ListDevice';
import AddDevice from './AddDevice';

export class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.actions.getDevicesList();
    }

    _onAddDevice(ipaddr) {
        if (ipaddr) this.props.actions.addDevice(ipaddr);
    }

    _onDeleteDevice(id) {
        this.props.actions.deleteDevice(id);
    }

    _onDissmissError() {
        this.props.actions.cleanError();
    }

    render() {
        return(
            <div>
                <h1>Settings</h1>

                {this.props.isAddDeviceError ?
                    <Message
                        negative
                        onDismiss={::this._onDissmissError}
                        content={this.props.isAddDeviceError.message}
                    />
                    : null
                }

                {this.props.isAddrListLoading ?
                    <Loader inline active />
                    : <ListDevices list={this.props.devlist} onDelete={::this._onDeleteDevice}/>
                }

                <AddDevice
                    create={::this._onAddDevice}
                    isLoading={this.props.isAddDeviceLoading}
                    isError={this.props.isAddDeviceFormError}
                />
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    isAddrListLoading: state.settings.isAddrListLoading,
    isAddDeviceLoading: state.settings.isAddDeviceLoading,
    isAddDeviceError: state.settings.isAddDeviceError,
    isAddDeviceFormError: state.settings.isAddDeviceFormError,
    devlist: state.settings.devlist
});


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings)