from fastapi import FastAPI, Form, File, UploadFile
from pydantic import BaseModel, Json
from clarifai_grpc.grpc.api import service_pb2, resources_pb2
from clarifai_grpc.grpc.api.status import status_code_pb2
from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import service_pb2_grpc

# .env 파일
from dotenv import load_dotenv
from dotenv import dotenv_values
import os 

# homography용 함수
import matplotlib.pyplot as plt
import cv2, numpy as np
import sys
import requests

# 이미지 처리용
import base64
import json
import io
from PIL import Image


# 4개의 point를 가지고 넓이 구하는 함수
def explode_xy(xy):
    xl=[]
    yl=[]
    for i in range(len(xy)):
        xl.append(xy[i][0])
        yl.append(xy[i][1])
    return xl,yl

def shoelace_area(x_list,y_list):
    a1,a2=0,0
    x_list.append(x_list[0])
    y_list.append(y_list[0])
    for j in range(len(x_list)-1):
        a1 += x_list[j]*y_list[j+1]
        a2 += y_list[j]*x_list[j+1]
    l=abs(a1-a2)/2
    return l

class pictures(BaseModel):
    data: str
    name: str

class tagpicture(BaseModel):
    data: str
    name: str
    tag: str


stub = service_pb2_grpc.V2Stub(ClarifaiChannel.get_grpc_channel())

# KEY 관리
config = dotenv_values(".env")
YOUR_CLARIFAI_API_KEY = config.get('CLARIFYKEY')
YOUR_DEEP_API_KEY=os.environ.get('DEEPAIKEY')
YOUR_APPLICATION_ID = "my-first-application"
metadata = (("authorization", f"Key {YOUR_CLARIFAI_API_KEY}"),)

app = FastAPI()

# 메인 화면
@app.get("/auth")
async def root():
    return {"message": "I'm python"}

# 로컬에 있는 사진을 바탕으로 img recognition 실행
@app.get("/auth/taglocal")
async def authimglc():
    result = {}
    SAMPLE_URL = "./imgs/cat.jpg"
    with open(SAMPLE_URL, "rb") as f:
        file_bytes = f.read()
    request = service_pb2.PostModelOutputsRequest(
        # This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id="general-image-recognition",
        user_app_id=resources_pb2.UserAppIDSet(app_id=YOUR_APPLICATION_ID),
        inputs=[
            resources_pb2.Input(
                data=resources_pb2.Data(image=resources_pb2.Image(base64=file_bytes))
            )
        ],
    )
    response = stub.PostModelOutputs(request, metadata=metadata)

    if response.status.code != status_code_pb2.SUCCESS:
        # print(response)
        raise Exception(f"Request failed, status code: {response.status}")

    for concept in response.outputs[0].data.concepts:
        # print("%12s: %.2f" % (concept.name, concept.value))
        result.update({concept.name:concept.value})
    return {"response": result}


# base64를 통해 이미지 태그
@app.post("/auth/tag")
async def authimgtag(req: tagpicture):
    result = {}
    req = str(req)
    data = req.split("'")[1]
    name = req.split("'")[3] 
    print(req.split("'")[2:])
    imgdata = base64.b64decode(data)
    filename = 'tag_img.jpg'
    with open(filename, 'wb') as f:
        f.write(imgdata)

    with open(filename, "rb") as f:
        file_bytes = f.read()
    request = service_pb2.PostModelOutputsRequest(
        # This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id="general-image-recognition",
        user_app_id=resources_pb2.UserAppIDSet(app_id=YOUR_APPLICATION_ID),
        inputs=[
            resources_pb2.Input(
                data=resources_pb2.Data(image=resources_pb2.Image(base64=file_bytes))
            )
        ],
    )
    response = stub.PostModelOutputs(request, metadata=metadata)

    if response.status.code != status_code_pb2.SUCCESS:
        # print(response)
        raise Exception(f"Request failed, status code: {response.status}")
        return {"status": 500, "message": "API Fault", "result": {False}}

    for concept in response.outputs[0].data.concepts:
        # print("%12s: %.2f" % (concept.name, concept.value))
        result.update({concept.name:concept.value})
    return {"status": 200, "message": "success", "result": result}


# 이미지 비교
# @app.get("/auth/")
# async def cmpimg():  # 못 써먹을 수준
#     import requests
#     r = requests.post(
#         "https://api.deepai.org/api/image-similarity",
#         files={
#             'image1': open('mouse1.jpg', 'rb'),
#             'image2': open('mouse2.jpg', 'rb'),
#         },
#         headers={'api-key': YOUR_DEEP_API_KEY}
#     )
#     return r.json()


# 이미지 특징점 확인
@app.post("/auth/test")
async def test(data1: pictures):
    data1 = str(data1)
    data = data1.split("'")[1]
    name = data1.split("'")[3]
    print(name)
    imgdata = base64.b64decode(data)
    filename = 'feature_test.jpg'
    with open(filename, 'wb') as f:
        f.write(imgdata)
    
    src1 = cv2.imread('feature_test.jpg', cv2.IMREAD_GRAYSCALE)
    if src1 is None:
        print('Image load failed!')
        return {"status":400, "message": "사진을 다시 찍으세요"}
    
    feature = cv2.AKAZE_create()
    kp1, desc1 = feature.detectAndCompute(src1, None)

    if len(kp1)<80:
        print('need more features')
        return {"status":400, "message": "등록 불가능한 사진입니다."}
    else:
        print('good')
        return {"status":200, "message": "good picture"}
    return {"status":500, "message": "무언가 잘못 되었다!"}

# 이미지 특징점 비교
@app.post("/auth/feature")
async def featimg(data1:pictures):
    # 영상 불러오기
    # image_nparray1 = np.asarray(bytearray(requests.get(url1).content), dtype=np.uint8)
    # image_nparray2 = np.asarray(bytearray(requests.get(url2).content), dtype=np.uint8)
    data1 = str(data1)
    base1 = data1.split("'")[1]
    name1 = data1.split("'")[3]
    print(name1)
    imgdata = base64.b64decode(base1)
    filename = 'to_auth.jpg'
    with open(filename, 'wb') as f:
        f.write(imgdata)
    
    # pic2은 유저가 찍은 사진, pic1는 이미 찍어둔 사진
    with open('to_auth.jpg', 'rb') as f:
        pic2 = f.read()
    with open('feature_test.jpg', 'rb') as f:
        pic1 = f.read()
    # image_nparray1 = np.fromstring(image_nparray1, dtype = np.uint8)
    image_nparray1 = np.fromstring(pic1, dtype = np.uint8)
    image_nparray2 = np.fromstring(pic2, dtype = np.uint8)

    src1 = cv2.imdecode(image_nparray1, cv2.IMREAD_GRAYSCALE)
    src2 = cv2.imdecode(image_nparray2, cv2.IMREAD_GRAYSCALE)

    if src1 is None:
        print('Image1 load failed!')
        return {"status":400, "message": "사진을 다시 찍으세요"}
    elif src2 is None:
        print('Image2 load failed!')
        return {"status":500, "message": "원본 사진 url 잘못 되었음"}

    # 특징점 알고리즘 객체 생성 (KAZE, AKAZE, ORB 등)
    # feature = cv2.KAZE_create() # 기본값인 L2놈 이용
    feature = cv2.AKAZE_create()
    #feature = cv2.ORB_create()

    # 특징점 검출 및 기술자 계산
    kp1, desc1 = feature.detectAndCompute(src1, None)
    kp2, desc2 = feature.detectAndCompute(src2, None)

    # 특징점 매칭
    matcher = cv2.BFMatcher_create()
    matches = matcher.match(desc1, desc2)

    # 좋은 매칭 결과 선별
    matches = sorted(matches, key=lambda x: x.distance)
    good_matches = matches[:80]

    # print('# of kp1:', len(kp1))
    # print('# of kp2:', len(kp2))
    # print('# of matches:', len(matches))
    # print('# of good_matches:', len(good_matches))

    # 호모그래피 계산
    # DMatch 객체에서 queryIdx와 trainIdx를 받아와서 크기와 타입 변환하기
    pts1 = np.array([kp1[m.queryIdx].pt for m in good_matches]
                    ).reshape(-1, 1, 2).astype(np.float32)
    pts2 = np.array([kp2[m.trainIdx].pt for m in good_matches]
                    ).reshape(-1, 1, 2).astype(np.float32)
                    
    H, _ = cv2.findHomography(pts1, pts2, cv2.RANSAC) # pts1과 pts2의 행렬 주의 (N,1,2)
    # 호모그래피를 이용하여 기준 영상 영역 표시
    dst = cv2.drawMatches(src1, kp1, src2, kp2, good_matches, None,
                        flags=cv2.DRAW_MATCHES_FLAGS_NOT_DRAW_SINGLE_POINTS)

    (h, w) = src1.shape[:2]

    # 입력 영상의 모서리 4점 좌표
    corners1 = np.array([[0, 0], [0, h-1], [w-1, h-1], [w-1, 0]]
                        ).reshape(-1, 1, 2).astype(np.float32)


    # 입력 영상에 호모그래피 H 행렬로 투시 변환
    corners2 = cv2.perspectiveTransform(corners1, H)

    # corners2는 입력 영상에 좌표가 표현되있으므로 입력영상의 넓이 만큼 쉬프트
    corners2 = corners2 + np.float32([w, 0])

    # 다각형 그리기
    cv2.polylines(dst, [np.int32(corners2)], True, (0, 255, 0), 2, cv2.LINE_AA)
    area = corners2.tolist()
    # print(area, type(area[0]))
    # print(area[0][0])
    sqs = []
    for p in range(4):
        sqs.append(area[p][0])

    xy_e=explode_xy(sqs)
    A=shoelace_area(xy_e[0],xy_e[1])
    # print(A)
    plt.imshow(dst,),plt.show()
    cv2.waitKey()
    cv2.destroyAllWindows()
    # 사각형의 넓이에 따라 출력
    print(A)
    if A<=30:
        return {"status": 200, "message":"잘못된 사진입니다."}
    else:
        return {"status": 200, "message":"비교되었습니다."}

