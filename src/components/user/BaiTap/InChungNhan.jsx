import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import LayOutIn from './LayOutIn';
import {
    FacebookMessengerShareButton,
    FacebookMessengerIcon,

    FacebookShareButton,
    FacebookIcon,

    EmailShareButton,
    EmailIcon,

    TwitterShareButton,
    TwitterIcon,

    TelegramShareButton,
    TelegramIcon
} from "react-share";

import { idFacebook } from '../../../redux/Config/Config';
import { Base64 } from 'js-base64';
import { apiURL_main } from '../../../redux/Config/Config'



export default class InChungNhan extends Component {


    render() {
        const { chungNhan } = this.props;

        let code = Base64.encode(chungNhan.idNguoiDung + "@@" + chungNhan.idLoTrinh)

        return (
            <div className="row">
                <div className="col-md-2">
                    <ReactToPrint
                        trigger={() => {

                            return <button className="btn btn-success btn-lg"><i class="fa fa-print" aria-hidden="true"></i>
                            </button>;
                        }}
                        content={() => this.componentRef}

                    />
                </div>
                <div className="col-md-2">
                    <FacebookShareButton
                        url={apiURL_main + "/certificate/" + code}
                    >
                        <FacebookIcon
                            size={"50px"}
                        />

                    </FacebookShareButton>

                </div>
                <div className="col-md-2">
                    <FacebookMessengerShareButton
                         url={apiURL_main + "/certificate/" + code}
                        appId={idFacebook}
                    >
                        <FacebookMessengerIcon
                            size={"50px"}
                            round={true}
                        />

                    </FacebookMessengerShareButton>

                </div>
                <div className="col-md-2">
                    <EmailShareButton
                        url={apiURL_main + "/certificate/" + code}
                    >
                        <EmailIcon
                            size={"50px"}
                        />

                    </EmailShareButton>

                </div>
                <div className="col-md-2">

                    <TwitterShareButton
                         url={apiURL_main + "/certificate/" + code}
                    >
                        <TwitterIcon
                            size={"50px"}
                        />

                    </TwitterShareButton>

                </div>
                <div className="col-md-2">
                    <TelegramShareButton
                       url={apiURL_main + "/certificate/" + code}
                    >
                        <TelegramIcon
                            size={"50px"}
                        />

                    </TelegramShareButton>

                </div>
                <div className="pt-3">
                    <LayOutIn ref={el => (this.componentRef = el)} chungNhan={chungNhan} />
                </div>
            </div>
        )
    }
}
