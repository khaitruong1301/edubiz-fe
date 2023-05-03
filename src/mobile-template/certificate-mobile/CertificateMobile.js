import { NavBar } from '../common';
import './CertificateMobile.css'
function CertificateMobile(props) {

    return (
        <>
            <NavBar title={props.title} isPrev={false}/>
            <div>
                Certificate MOBILE
            </div>
        </>
    )
}

export default CertificateMobile;