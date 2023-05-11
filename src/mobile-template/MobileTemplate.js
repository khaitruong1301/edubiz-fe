import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import { LoginMobile, PrivateRouter } from './index'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

function MobileTemplate() {

    const options = {
        // you can also just use 'bottom center'
        position: positions.TOP_RIGHT,
        timeout: 3000,
        offset: '40px',
        transition: transitions.SCALE
    }

    return (
        <AlertProvider template={AlertTemplate} {...options}>
            <BrowserRouter>
                <Switch>
                    <Route path="/lms" component={LoginMobile} />
                    <Route path="/*" component={PrivateRouter} />
                    <Redirect to="/lms" />
                </Switch>
            </BrowserRouter>
        </AlertProvider>
    )
}

export default MobileTemplate;