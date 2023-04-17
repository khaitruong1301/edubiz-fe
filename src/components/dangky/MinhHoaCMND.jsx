import React, { Component } from 'react';
import CMNDTruoc from '../../assets/CMND_truoc.jpg';
import CMNDSau from '../../assets/CMND_sau.jpg';

export default class MinhHoaCMND extends Component {
    render() {
        return (
            <div className="row">
               <div className="col-md-6 pb-3">
                   <p className="h4 text-center">Mặt trước</p>
                   <img src={CMNDTruoc} />
                   </div>
               <div className="col-md-6">
               <p className="h4 text-center">Mặt sau</p>
                   <img src={CMNDSau} />
               </div>
            </div>
        )
    }
}
