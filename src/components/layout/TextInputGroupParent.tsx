//This module is only for testing


import React, { Component } from 'react'
import TextInputGroup from './TextInputGroup';
import { onChange } from '../../utilities/onChange';

interface Props {
    error?: string
}

export default class TextInputGroupParent extends Component<Props> {
    state = {
        test: ''
    }
    render() {
        const { test } = this.state
        return (
            <div>
                <TextInputGroup label="Test" name="test" value={test} onChange={onChange.bind(this)} placeholder="TestPlaceHolder" error={this.props.error ? this.props.error : undefined} />
            </div>
        )
    }
}
