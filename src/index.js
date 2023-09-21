import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./redux/store";
import * as signalR from "@aspnet/signalr";
import environment from "./environments/environment";
import { version } from "../package.json"

export const connection = new signalR.HubConnectionBuilder()
  .withUrl(environment.baseUrl + "/apphub")
  .configureLogging(signalR.LogLevel.Information)
  .build();

  //Kiểm tra version lưu ở local
const versionLocalStorage = localStorage.getItem('version');

//Nếu có lưu version
//Nếu không có lưu thì cũng load lại 1 lần để đảm bảo clear cache trang cũ

if (!versionLocalStorage || versionLocalStorage !== version) {
    localStorage.setItem('version',version);
    window.location.reload();
}
  
connection.start().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
