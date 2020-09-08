const Errors=document.getElementById('errors')
function init(Devices=true){
    const Peer = require('simple-peer');
    if(Devices){
        var peer = new Peer({
            initiator: location.hash === "#init",
            trickle: false,
            stream:Devices
        })

    }else{
        var peer = new Peer({
            initiator: location.hash === "#init",
            trickle: false,
        })
    }

    peer.on('signal', function (data) {
        document.getElementById("yourID").value = JSON.stringify(data)
        console.log(data);
    })

    document.getElementById('connect').addEventListener('click', function () {
        var otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId)
    })
    document.getElementById('sendo').addEventListener('click', function () {
        var yourMessage = document.getElementById("yourMessage").value
        peer.send(yourMessage)
    })

    peer.on('data', function (data) {
        document.getElementById('messages').textContent += data + '\n'
    })
    peer.on('stream',function(stream){
        var video=document.createElement('video')
        document.body.appendChild(video)
        if (typeof video.srcObject == "object") {
            video.srcObject = stream;
          } else {
            video.src = URL.createObjectURL(stream);
          }
        video.play()
    })
}
    navigator.webkitGetUserMedia({ video: true, audio: true }, function (stream) {
        console.log(stream)
    init(stream);
    
       
    },function(err){
        init(false)
        Errors.append(err)
    })