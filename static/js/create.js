import { returnHome, autoReturn } from "./main.js";
import { handLeftDetection, handRightDetection } from "./utilityFunctions.js";

var host = "cpsc484-02.yale.internal:8888";
// var host = "127.0.0.1:4444"; // recorded data

$(document).ready(function () {
    setTimeout(function () {frames.start();}, 3000);
});

var info = document.getElementById("info");

var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
        }
    },

    show: function (frame) {
        returnHome(frame);
        autoReturn(frame);
        if (handLeftDetection(frame) == 1) {
            info.innerHTML = "Returning to Homepage. . .";
        }
        else {
            info.innerHTML = "Use your phone to scan!"
        }
    }

};
