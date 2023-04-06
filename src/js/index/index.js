import { io } from "socket.io-client";
import "../common/common.js";
import "../../scss/index/index.scss";

const socket = io();
socket.on("connect", () => {
  console.log("connection server >>>> ");
});

document.getElementById("root").innerHTML = "WEBPACK XXX";
// if (module.hot) {
//   module.hot.accept();
// }
