from flask import Flask, Response, request, render_template
import time
from camera import VideoCamera
from flask_socketio import SocketIO, emit
from skimage.io import imread
from PIL import Image
import imutils
import io
import base64
import cv2

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
videoCamera = VideoCamera()

@app.route('/api', methods=['GET'])
def api():
    return {
        'userId': 1,
        'title': 'Flask React Application',
        'completed': False
    }

# def gen(camera):
#     timeout = time.time() + 2
#     while True:
        
#         data, face_names = camera.get_frame()

#         frame = data[0]
        
#         for face_name in face_names:

#             if face_name != '' or face_name != 'Unknown':
#                 return {
#                     'username': face_name,
#                     'status' : 'pass'
#                 }

#         if time.time() > timeout:
#             return {
#                 'username': '', 
#                 'status': 'notpass'
#             }
        
        # yield (b'--frame\r\n'
        #         b'Content-Type: image/jpeg\r\n\r\n'+ frame + b'\r\n\r\n')




@socketio.on('image')
def image(data_image):

    sbuf = io.StringIO()
    sbuf.write(data_image)

    b = io.BytesIO(base64.b64decode(data_image))
    pimg = imread(b)
    pimg = cv2.cvtColor(pimg, cv2.COLOR_BGR2RGB)

    # Process the image frame
    frame = imutils.resize(pimg, 1366)
    imgencode = cv2.imencode('.jpg', frame)[1]

    face_names = videoCamera.get_frame(imgencode)


    # base64 encode
    stringData = base64.b64encode(imgencode).decode('utf-8')
    b64_src = 'data:image/jpg;base64,'
    stringData = b64_src + stringData

    # emit the frame back
    emit('response_back', stringData)

    #emit the user
    emit('response_user', face_names)


@app.route('/video_feed')
def video_feed():
    #to show video when you hit backend api
    # return Response(gen(VideoCamera()), mimetype = 'multipart/x-mixed-replace; boundary=frame')

    videoCamera.insert_dataset('NelsonMario')
    videoCamera.insert_dataset('HansonOwen')
    
    return gen(videoCamera)