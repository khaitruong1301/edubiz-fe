import React, { Component } from 'react'
import '../../templates/user/vendors/font-awesome/css/font-awesome.min.css';
import 'antd/dist/antd.css';
import '../../templates/user/assets/css/style.css';
import logocyber from "../../assets/none.png";
import avatarUser from "../../templates/user/assets/avatar.jpg"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import LoTrinhNguoiDung from './LoTrinhNguoiDung';
import { connect } from 'react-redux';
import DashBoard from './DashBoard';
import ChiTietKhoaHoc from './khoahoc/ChiTietKhoaHoc';
import LichSuNguoiDung from './LichSuNguoiDung';
import ChiTietNguoiDung from './chitietUser/ChiTietNguoiDung';
import { urlMainPage } from '../../redux/Config/Config';
import DanhSachBaiTap from './BaiTap/DanhSachBaiTap';

class MainUser extends Component {

    state = {
        userLogin: JSON.parse(localStorage.getItem('checkLogin'))
    }

    logOutHandle = () => {
        localStorage.clear();
        window.location = urlMainPage;
    }

    //dua component ra ngoai template
    linkBaiHoc = (idKhoaHoc, idBaiHoc) => {
        this.props.history.push(`/course/${idKhoaHoc}/${idBaiHoc}`);
    }

    render() {
        // kiem tra dang nhap
        const checkLogin = localStorage.getItem('checkLogin');

        if (checkLogin === null) {
            window.location = urlMainPage;
        }
       
        return (

            <BrowserRouter>
                <div>
                    <aside id="left-panel" className="left-panel">
                        <nav className="navbar navbar-expand-sm navbar-default" >
                            <div className="navbar-header">
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="fa fa-bars" />
                                </button>
                                <a className="navbar-brand" href={urlMainPage}>
                                    <img src={logocyber} alt="Logo" />
                                </a>
                                <a className="navbar-brand hidden" href={urlMainPage}>
                                    <img src={logocyber} alt="Logo" />
                                </a>
                            </div>
                            <div id="main-menu" className="main-menu collapse navbar-collapse">
                                <ul className="nav navbar-nav" id="ulMenu" >
                                    <li className="liMenu active">
                                        <Link to="/user"> <i className="fa fa-dashboard" /> Dashboard </Link>
                                    </li>
                                    <li className="liMenu">
                                        <Link to="/user/schedule"> <i className="fa fa-line-chart" /> Lộ Trình Học </Link>
                                    </li>
                                    <li className="liMenu">
                                        <Link to="/user/quiz"> <i class="fa fa-graduation-cap" ></i> Chứng nhận, điểm </Link>
                                    </li>
                                    <li className="liMenu">
                                        <Link to="/user/history"> <i className="fa fa-history" /> Lịch sử tương tác </Link>
                                    </li>
                                    {/* <li className="liMenu">
                                        <Link to="/user/history"> <i className="fa fa-credit-card" /> Ví của bạn </Link>
                                    </li> */}
                                    <li className="liMenu">
                                        <Link to={`/user/detail/${this.state.userLogin.id}`}> <i className="fa fa-user" /> Thông tin cá nhân </Link>
                                    </li>
                                    <li className="liMenu">
                                        <a href="#" onClick={() => this.logOutHandle()} ><i className="fa fa-sign-out" /> Logout</a>
                                    </li>
                                    {/* <li className="menu-item-has-children dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-table" />Tables</a>
                                        <ul className="sub-menu children dropdown-menu">
                                            <li><i className="fa fa-table" /><a href="tables-basic.html">Basic Table</a></li>
                                            <li><i className="fa fa-table" /><a href="tables-data.html">Data Table</a></li>
                                        </ul>
                                    </li> */}
                                </ul>
                            </div>
                        </nav>
                    </aside>
                    <div id="right-panel" className="right-panel">

                        <p></p>

                        <Switch>
                            <Route path="/user/quiz" render={() => <DanhSachBaiTap linkBaiHoc={this.linkBaiHoc} />}/>
                            <Route path="/user/coursedetail/:id" component={ChiTietKhoaHoc} />
                            <Route path="/user/schedule" render={() => <LoTrinhNguoiDung linkBaiHoc={this.linkBaiHoc} />} />
                            <Route path="/user/history" component={LichSuNguoiDung} />
                            <Route exact path="/user/detail/:idUser" component={ChiTietNguoiDung} />
                            <Route path="/user" render={() => <DashBoard linkBaiHoc={this.linkBaiHoc} />} />
                        </Switch>

                    </div>
                </div>
            </BrowserRouter>
        )
    }


    componentDidMount = () => {

        // active menu
        var btnContainer = document.getElementById("ulMenu");

        // Get all buttons with class="btn" inside the container
        var btns = btnContainer.getElementsByClassName("liMenu");

        // Loop through the buttons and add the active class to the current/clicked button
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("active");

                // If there's no active class
                if (current.length > 0) {
                    current[0].className = current[0].className.replace(" active", "");
                }

                // Add the active class to the current/clicked button
                this.className += " active";
            });
        }
    }
}

const mapStateToProps = (state) => {

    return {
        nguoiDung: state.NguoiDungReducer.nguoiDung //lay thong tin dang nhap tu store
    }


}
export default connect(mapStateToProps)(MainUser)