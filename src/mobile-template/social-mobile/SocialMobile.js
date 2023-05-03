import { NavBar } from '../common';
import './SocialMobile.css'
function SocialMobile(props) {

    return (
        <>
            <NavBar title={props.title} isPrev={false}/>
            <div>
                SOCIAL MOBILE
            </div>
        </>
    )
}

export default SocialMobile;