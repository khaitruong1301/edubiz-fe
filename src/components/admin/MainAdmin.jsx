import React, { Component } from 'react'
import '../../templates/user/vendors/font-awesome/css/font-awesome.min.css';
import '../../templates/user/assets/css/style.css';
import logocyber from "../../templates/login/images/cyberlogo.png";
import avatarUser from "../../templates/user/assets/avatar.jpg";
import QuanLyLoTrinh from './QuanLyLoTrinh';
import QuanLyNguoiDung from "./QuanLyNguoiDung";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';

class MainUser extends Component {

    render() {

        return (

            <BrowserRouter>
                <div>
                    <aside id="left-panel" className="left-panel">
                        <nav className="navbar navbar-expand-sm navbar-default">
                            <div className="navbar-header">
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="fa fa-bars" />
                                </button>
                                <a className="navbar-brand" href="https://cybersoft.edu.vn">
                                    <img src={logocyber} alt="Logo" />
                                </a>
                                <a className="navbar-brand hidden" href="https://cybersoft.edu.vn">
                                    <img src={logocyber} alt="Logo" />
                                </a>
                            </div>
                            <div id="main-menu" className="main-menu collapse navbar-collapse">
                                <ul className="nav navbar-nav">
                                    <li className="active">

                                        <Link to="/admin/scheduleM"> <i className="menu-icon fa fa-dashboard" /> Quản lý lộ trình </Link>
                                        <Link to="/admin/userM"> <i className="menu-icon fa fa-dashboard" /> Quản lý người dùng </Link>
                                    </li>
                                    
                                </ul>
                            </div>
                        </nav>
                    </aside>
                    <div id="right-panel" className="right-panel">
                        <header id="header" className="header">
                            <div className="row header-menu">
                                <div className="col-sm-7">
                                    DANH SÁCH
                            </div>
                                <div className="col-sm-5">
                                    <div className="user-area dropdown float-right">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img src={avatarUser} className="user-avatar rounded-circle" alt="User Avatar" />
                                        </a>
                                        <div className="user-menu dropdown-menu">
                                            <a className="nav-link" href="#"><i className="fa fa-user" /> My Profile</a>
                                            <a className="nav-link" href="#"><i className="fa fa-user" /> Notifications <span className="count">13</span></a>
                                            <a className="nav-link" href="#"><i className="fa fa-cog" /> Settings</a>
                                            <a className="nav-link" href="#"><i className="fa fa-power-off" /> Logout</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <p></p>

                        <Switch>
                            <Route path="/admin/scheduleM" component={QuanLyLoTrinh} />
                            <Route path="/admin/userM" component={QuanLyNguoiDung} />
                        </Switch>

                    </div>
                </div>
            </BrowserRouter>
        )
    }

    // kiem tra dang nhap
    componentDidMount = () => {
        
        //  if (this.props.iCheckLogin.length===0)
        //      this.props.history.push('/');
    }
}

const mapStateToProps = (state) => {

    return {
        iCheckLogin: state.NguoiDungReducer.nguoiDung //lay thong tin dang nhap tu store
    }


}
export default connect(mapStateToProps)(MainUser)