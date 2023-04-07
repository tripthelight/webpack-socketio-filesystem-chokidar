import { io } from "socket.io-client";
import "../common/common.js";
import "../../scss/index/index.scss";
import smile from "../../images/png/smile.png";
// import "../../images/png/smile.png";

const socket = io();
socket.on("connect", () => {
  console.log("connection server >>>> ");
});

document.querySelector("img.ico-smile").src = "";
document.querySelector("img.ico-smile").src = smile;

document.getElementById("root").innerHTML = "WEBPACK XXX";
// if (module.hot) {
//   module.hot.accept();
// }
