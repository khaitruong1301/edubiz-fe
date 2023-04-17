import React, { Component } from 'react';
import {  urlMainPage } from '../../redux/Config/Config'


export default class Index extends Component {
    render() {
        window.location = urlMainPage;
        return (
            <div>

            </div>
        )
    }
}
