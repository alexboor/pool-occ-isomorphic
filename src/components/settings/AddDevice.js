/**
 * Created by alexboor on 8/9/2017.
 */
'use strict';
import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

import * as actions from '../../actions/settings';

import { Button, Loader } from 'semantic-ui-react';

class AddDevice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ipaddr: ''
        };
    }

    _onChangeIpaddr(e) {
        this.setState({ipaddr:e.target.value})
    }

    render() {
        return(
            <Form onSubmit={this.props.create.bind(this,this.state.ipaddr)}>
                <Form.Group>
                    <Form.Input
                        placeholder='IP address'
                        name='ipaddr'
                        onChange={::this._onChangeIpaddr}
                        value={this.state.ipaddr}
                        disabled={this.props.isLoading}
                        error={this.props.isError}
                    />
                    <Form.Button
                        content='Add'
                        disabled={!this.state.ipaddr.length}
                        loading={this.props.isLoading}
                    />
                </Form.Group>
            </Form>
        )
    }
}

export default AddDevice;