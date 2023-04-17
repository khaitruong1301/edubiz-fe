import React from 'react';
import './App.css';
import Login from './components/login/Login';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainUser from './components/user/MainUser';
import DangKy from './components/dangky/DangKy';
import MainAdmin from './components/admin/MainAdmin';
import "../node_modules/video-react/dist/video-react.css";
import BaiHoc from './components/user/BaiHoc/BaiHoc';
import MainIndex from './components/MainIndex';
import baiTestUser from './components/dangky/baiTestUser';
import CheckAdmin from './components/admin/CheckAdmin';
import BaiHocDemo from './components/user/KhoaHocDemo/BaiHocDemo';
import LoTrinhDemo from './components/user/KhoaHocDemo/LoTrinhDemo';
import ChungNhanMain from './components/user/BaiTap/ChungNhanMain';
import Index from './components/admin/Index';
import DieuKhoan from './components/dangky/DieuKhoan';
import QuyDinhRiengTu from './components/dangky/QuyDinhRiengTu';
import Trac from './components/login/Trac';


function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/trac" component={Trac} />

      <Route path="/certificate/:code" component={ChungNhanMain} />
      <Route path="/demo/:idKhoaHoc" component={BaiHocDemo} />
      <Route path="/demo" component={LoTrinhDemo} />
        <Route path="/checkAdmin/:userId/:khoaHocId" component={CheckAdmin} />
        <Route path="/test" component={baiTestUser} />
        <Route path="/user" component={MainUser} />
        <Route path="/admin" component={MainAdmin} />
        <Route path="/course/:idKhoaHoc/:loTrinhId" component={BaiHoc} />
        <Route path="/lms" component={Login} />
        <Route path="/signup" component={DangKy} />
        <Route path="/dieukhoan" component={QuyDinhRiengTu} />
        <Route path="/" component={Index} />
      </Switch>
    </BrowserRouter>


  );
}

export default App;
