import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./redux/store";
import * as signalR from "@aspnet/signalr";
import environment from "./environments/environment";

export const connection = new signalR.HubConnectionBuilder()
  .withUrl(environment.baseUrl + "/apphub")
  .configureLogging(signalR.LogLevel.Information)
  .build();
connection.start().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
