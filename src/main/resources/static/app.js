var stompClient = null;

function connect() {
    var socket = new SockJS('/stompendpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        
        stompClient.subscribe('/topic/newpoint', function (data) {
           
            alert(data); 
        });
    });
}
function sendPoint(){
 x1 = $("#txtX").val();
 y1 = $("#txtY").val();
   stompClient.send("/topic/newpoint", {}, JSON.stringify({x:x1,y:y1})); 
}
function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}


$(document).ready(
        function () {
            connect();
            console.info('connecting to websockets');

        }
);
