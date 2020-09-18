import cv2
import pickle
from imutils.video import WebcamVideoStream
import numpy as np
import face_recognition
import matplotlib.pyplot as plt

class VideoCamera(object):
    def __init__(self):
        # self.stream = WebcamVideoStream(src=0).start()
        # self.stream = cv2.VideoCapture(0, cv2.CAP_DSHOW)
        # Load a sample picture and learn how to recognize it.
        # self.dataset_image = face_recognition.load_image_file('dataset/NelsonMario.jpg')
        # self.dataset_face_encoding = face_recognition.face_encodings(self.dataset_image)[0]

        # Create arrays of known face encodings and their names
        # self.known_face_encodings = [self.dataset_face_encoding]
        # self.known_face_names = ["Nelson Mario"]

        self.known_face_encodings = []
        self.known_face_names = []
        self.face_locations = []
        self.face_encodings = []
        self.face_names = []
        self.process_this_frame = True

        temp_dataset = face_recognition.load_image_file('dataset/' + 'NelsonMario' + '.jpg')
        temp_face_encoding = face_recognition.face_encodings(temp_dataset)[0]
        self.known_face_encodings.append(temp_face_encoding)
        self.known_face_names.append('NelsonMario')

        temp_dataset = face_recognition.load_image_file('dataset/' + 'HansonOwen' + '.jpg')
        temp_face_encoding = face_recognition.face_encodings(temp_dataset)[0]
        self.known_face_encodings.append(temp_face_encoding)
        self.known_face_names.append('HansonOwen')


    # def __del__(self):
    #     # self.stream.release()
    #     self.stream.stop()

    def insert_dataset(self, face_name):
        temp_dataset = face_recognition.load_image_file('dataset/' + face_name + '.jpg')
        temp_face_encoding = face_recognition.face_encodings(temp_dataset)[0]
        self.known_face_encodings.append(temp_face_encoding)
        self.known_face_names.append(face_name)


    def get_frame(self, frame):
        # frame =self.stream.read()
        # frame = cv2.imread('./dataset/HansonOwen.jpg')

        data_encode = np.array(frame)
        str_encode = data_encode.tostring()

        nparr = np.fromstring(str_encode, np.uint8)
        img_decode = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        display_frame = img_decode

        # cv2.imshow("img_decode", img_decode)
        # cv2.waitKey()

        # frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        # frame = frame[:, :, ::-1]
        # detector = cv2.CascadeClassifier('.\dataset\haarcascade_frontalface_default.xml')
        # face = detector.detectMultiScale(frame, 1.1, 7)


        if self.process_this_frame:
            self.face_locations = face_recognition.face_locations(display_frame)
            self.face_encodings = face_recognition.face_encodings(display_frame, self.face_locations)
            self.face_names = [] 


            for face_encoding in self.face_encodings:

                
                matches = face_recognition.compare_faces(self.known_face_encodings, face_encoding)
                name = 'Unknown'

                face_distances = face_recognition.face_distance(self.known_face_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = self.known_face_names[best_match_index]

                self.face_names.append(name)

        self.process_this_frame = not self.process_this_frame



        # for (x, y, h, w), name in zip(self.face_locations, self.face_names):

        #     cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        #     font = cv2.FONT_HERSHEY_DUPLEX
        #     cv2.putText(frame, name, (x + 6, y - 6), font, 1.0, (255, 255, 255), 1)
        # print(self.face_names)

        # frame = display_frame
        # jpeg = cv2.imencode('.jpg', frame)[1]





        # data = []
        # data.append(jpeg.tobytes())
        # cv2.destroyAllWindows()
        return self.face_names
