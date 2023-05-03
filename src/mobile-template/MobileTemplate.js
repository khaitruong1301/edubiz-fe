import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import { LoginMobile, PrivateRouter } from './index'

function MobileTemplate() {

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/lms" component={LoginMobile} />
                <Route path="/*" component={PrivateRouter} />
                <Redirect to="/lms" />
            </Switch>
        </BrowserRouter>
)}

export default MobileTemplate;