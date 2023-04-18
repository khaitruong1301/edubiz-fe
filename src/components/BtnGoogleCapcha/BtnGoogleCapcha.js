import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
export default function BtnGoogleCapcha() {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey="6Ldb3eEUAAAAAHRKJkJeU7QDppMGw4rtwmkXi1qU"
            language="vi"
        />
    )
}
