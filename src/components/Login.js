import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap'
import styles from '../styles/modal.module.css'
import Message from './Message.js'
import OTP from './OTP.js'
import io from 'socket.io-client'



const onResponseBack = (socket) => {
    socket.on('response_back', function(image){
        const image_id = document.getElementById('image');
        image_id.src = image;
    });
}

const onResponseUser = (socket, video, getFrame) => {
    socket.on('response_user', function(response_user){
        const user = document.getElementById('user')
        user.innerHTML = response_user
        if(response_user.length > 0){
            clearInterval(getFrame)
            video.srcObject.getTracks()[0].stop()
            socket.off()
        }
    })
}

const onConnect = (socket) => {
    socket.on('connect', function(){
        console.log("Connected...!", socket.connected)
    })
}

const recognizeUser = (socket, video) => {

    const FPS = 22
    const X = 0, Y = 0
    const TIME = 10000

    var canvas = document.getElementById('canvasOutput')
    var context = canvas.getContext('2d')

    canvas.width = 500
    canvas.height = 500

    var getFrame = setInterval(() => {
        context.drawImage(video, X, Y)
        var type = "image/png"
        var data = document.getElementById("canvasOutput").toDataURL(type);
        data = data.replace('data:' + type + ';base64,', '');
        socket.emit('image', data);
    }, TIME/FPS);

    
    onResponseBack(socket)
    onResponseUser(socket, video, getFrame)
    
}



  // const [initialData, setInitialData] = useState([{}])
  // const [initialData, setinitialData] = useState(null)
  // const [loading, setLoading] = useState(false)


  // const dataFunction = async () => {
  //   try{
  //     const data = await Axios
  //     .get(`video_feed`)
  //     .then(
  //       res => {
  //         console.log(res)
  //         setinitialData(res.data.username)
  //       }
  //     )
  //     setLoading(true)
  //   }catch(e){
  //     console.log(e)
  //   }
  // }

  // useEffect(() => {
  //   dataFunction()
  // }, [])
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => {
  //   dataFunction()
  //   setShow(true)
  // }

function Login(){
    const URI = 'http://localhost:5000'

    useEffect(()=>{
        var socket = io(URI)
        onConnect(socket)
        
        const video = document.querySelector("#videoElement")
        
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
        }
        recognizeUser(socket, video)
    
    }, [])
    
    return (
        <div className="App">
            {/* <>
                <ReactBootStrap.Button variant="primary" onClick={handleShow}>
                Login
                </ReactBootStrap.Button>

                <ReactBootStrap.Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                <ReactBootStrap.Modal.Header className={styles.modal}>
                    <ReactBootStrap.Modal.Title>Recognize your face</ReactBootStrap.Modal.Title>
                </ReactBootStrap.Modal.Header>
                <ReactBootStrap.Modal.Body className={styles.modal}>
                    <div>
                        {
                            loading ? 'Completed' : 'See your webcam' 
                        }
                    
                    </div>
                    <div>
                        {
                            loading ? <OTP name = {initialData}/> : 
                            <ReactBootStrap.Spinner animation="grow" />
                        }
                    </div>
                    
                </ReactBootStrap.Modal.Body>
                <ReactBootStrap.Modal.Footer>
                    <ReactBootStrap.Button variant="secondary" onClick={handleClose}>
                    Close
                    </ReactBootStrap.Button>
                </ReactBootStrap.Modal.Footer>
                </ReactBootStrap.Modal>
            </> */}
            <div id="container" className={styles.modal}>
                <canvas id="canvasOutput"></canvas>
                <video autoPlay={true} width={600} height={800} id="videoElement" hidden = {'hidden'} ></video>
            </div>
            <div className = 'video' hidden = {'hidden'}>
                <img id="image"></img>
            </div>
            <h1 id="user"></h1>
        </div>
    );
}

export default Login