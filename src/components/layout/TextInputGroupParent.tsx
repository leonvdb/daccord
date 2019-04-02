//This module is only for testing


import React, { Component } from 'react'
import TextInputGroup from './TextInputGroup';
import { onChange } from '../../utilities/onChange';

export default class TextInputGroupParent extends Component {
    state = {
        test: ''
    }
    render() {
        const { test } = this.state
        return (
            <div>
                <TextInputGroup label="Test" name="test" value={test} onChange={onChange.bind(this)} placeholder="TestPlaceHolder" />
            </div>
        )
    }
}
