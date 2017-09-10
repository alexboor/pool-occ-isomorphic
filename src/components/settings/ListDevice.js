'use strict';
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class ListDevice extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    _onDeleteClick(id,e) {
        e.preventDefault();
        this.props.onDelete(id)
    }

    row(ipaddr, k, id) {
        return(
            <Table.Row key={k}>
                <Table.Cell>{ipaddr}</Table.Cell>
                <Table.Cell><a href="#" onClick={this._onDeleteClick.bind(this, id)}>Del</a></Table.Cell>
            </Table.Row>
        )
    }

    list() {
        return this.props.list.map((i,k) => {
            return this.row(i.ipaddr,k,i._id)
        });
    }

    render() {
        return(
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.list.length ?
                        this.list()
                        : null
                    }
                </Table.Body>
            </Table>
        )
    }
}

export default ListDevice;