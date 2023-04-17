import React, { Component } from 'react';
import { urlMainPage } from '../redux/Config/Config';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default class MainIndex extends Component {

    render() {
        return (
            <div>
                <div class="pie-wrapper pie-wrapper--solid progress-45">
                    <span class="label">1/4</span>
                </div>
            </div>
        )
    }
}
