var wsUri = "ws://" + location.host;
var client;
var output;
var nameInput;
var messageInput;
var sendButton;

function init() {
    output = $("#output");
    nameInput = $("#nameInput");
    messageInput = $("#messageInput");
    sendButton = $("#sendButton");

    nameInput.val(getRandom(10,100));

    messageInput.keyup (function (evt) {
        if (evt.keyCode == 13) sendChatMessage(evt)
    });
    sendButton.click(function (evt) {
        console.log('XXX');
        sendChatMessage(evt);
    });

    startWebSocket();
}

function getRandom(min, max) {
    var randoms = Math.floor(Math.random() * (max - min)) + min;
    return "游客-" + randoms;
}

function startWebSocket() {
    client = new WebSocket(wsUri);
    client.onopen = function (evt) {
        onOpen(evt)
    };
    client.onclose = function (evt) {
        onClose(evt)
    };
    client.onmessage = function (evt) {
        onMessage(evt)
    };
    client.onerror = function (evt) {
        onError(evt)
    };
}

function onOpen(evt) {
    writeMessage(nameInput.val() +"你好.你已进入聊天室");
    sendMessage(nameInput.val() +"已进入聊天室")
}

function onClose(evt) {
    sendMessage(nameInput.val() +"已离开聊天室");
}

function onMessage(evt) {
    writeMessage(evt.data);
}

function onError(evt) {
    writeMessage("<span style='color: red'>ERROR:</span> " + evt.data);
}

function sendMessage(message) {
    client.send(nameInput.val()+ ">>" + message);
}

function writeMessage(message) {
    var pre = "<p style='word-wrap: break-word'>"+ message +"</p>";
    output.append(pre);
}

function sendChatMessage(evt) {
    var message = messageInput.val();
    sendMessage(message);
    messageInput.val(" ");
}

window.addEventListener("load", init, false);