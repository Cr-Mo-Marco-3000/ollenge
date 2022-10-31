from fastapi import FastAPI, Form, File, UploadFile, HTTPException, Request
from fastapi.responses import JSONResponse
import uvicorn
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

# 현재 시간
from datetime import datetime

# S3연결
from pys3 import s3_connection, s3_upload, s3_download, BUCKET_NAME, make_std_url_name, make_feature_url_name, make_classification_url_name, make_common_url_name
# DB 연결
from pysql import execute_insert_std_img, execute_select_std_img, execute_insert_feed, execute_select_challenge_auth_time, execute_select_isauth
# model 연결
from inputbasemodel import StdImgInput, FeatureInput, classificationpicture, CommonInput


def remove_img(img_dir):
    if os.path.isfile(img_dir):
        os.remove(img_dir)
    return True


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


def date_to_str(typedate):
    return str(typedate.year)+str(typedate.month)+str(typedate.day)


def is_auth_intime(participation_id):
    start_date, end_date, start_time, end_time = execute_select_challenge_auth_time(participation_id)
    now = datetime.now()
    current_time_date = now.strftime("%Y%m%d")
    start_date = date_to_str(start_date)
    end_date = date_to_str(end_date)
    current_time_time = now.hour *3600 + now.minute*60 + now.second
    start_time = start_time.seconds
    end_time = end_time.seconds

    if current_time_date <start_date or current_time_date>end_date:
        return [1, "인증 날이 아닙니다."]
    elif start_time > current_time_time or end_time<current_time_time:
        return [2, "인증 시간이 아닙니다."]
    else:
        return [3, now.strftime("%Y%m%d%H%M%S")]



stub = service_pb2_grpc.V2Stub(ClarifaiChannel.get_grpc_channel())

# KEY 관리
config = dotenv_values(".env")
YOUR_CLARIFAI_API_KEY = config.get('CLARIFYKEY')
YOUR_DEEP_API_KEY=os.environ.get('DEEPAIKEY')
YOUR_APPLICATION_ID = "my-first-application"
metadata = (("authorization", f"Key {YOUR_CLARIFAI_API_KEY}"),)

app = FastAPI()

# 메인 화면
@app.get("/")
async def root():
    return JSONResponse(
        status_code=418,
        content={
            "message": f"Oops! did something. There goes a rainbow...",
            "errcode": 0,
            },
    )


# 아무런 인증 방법이 없는 경우
@app.post("/auth/common")
async def authimgcommon(data: CommonInput):
    result = {}
    try:
        data = str(data)
        participation_id = data.split("'")[1]
        feed_img = data.split("'")[3]
        feed_content = data.split("'")[5]
    except:
        return JSONResponse(
            status_code=400,
            content={
                "message": f"입력이 바르지 않습니다.",
                "errcode": 1,
                },
        )
    # 인증 시간 관련
    time_flag = is_auth_intime(int(participation_id))
    if time_flag[0] == 3:
        pass
    else:
        # raise HTTPException(detail='시간이 아니요', status_code=400)
        return JSONResponse(
            status_code=400,
            content={
                "message": f"인증 시간이 아닙니다.",
                "errcode": 2,
                },
        )
    
    imgdata = base64.b64decode(feed_img)
    filename = "./imgs/"+make_common_url_name(participation_id)
    with open(filename, 'wb') as f:
        f.write(imgdata)

    try:
        to = make_common_url_name(participation_id)
        file_url = s3_upload(filename, 'homybk', to)
        if file_url:
            execute_insert_feed(participation_id, file_url, feed_content)
    except:
        remove_img(filename)
        return JSONResponse(
            status_code=500,
            content={
                "message": f"S3 오류",
                "errcode": 3
                },
        )

    remove_img(filename)
    return JSONResponse(
        status_code=200,
        content={
            "message": f"완료 되었습니다.",
            },
    )


# base64를 통해 이미지 분류
@app.post("/auth/classification")
async def authimgclassification(data: classificationpicture):
    result = {}
    try:
        data = str(data)
        participation_id = data.split("'")[1]
        feed_img = data.split("'")[3]
        feed_content = data.split("'")[5]
        classification_keyword = data.split("'")[7]
    except:
        return JSONResponse(
            status_code=400,
            content={
                "message": f"입력이 바르지 않습니다.",
                "errcode": 1,
                },
        )
    # 인증 시간 관련
    time_flag = is_auth_intime(int(participation_id))
    if time_flag[0] == 3:
        feed_time = time_flag[1]
    else:
        # raise HTTPException(detail='시간이 아니요', status_code=400)
        return JSONResponse(
            status_code=400,
            content={
                "message": f"인증 시간이 아닙니다.",
                "errcode": 4,
                },
        )
    
    imgdata = base64.b64decode(feed_img)
    filename = "./imgs/"+make_classification_url_name(participation_id)
    with open(filename, 'wb') as f:
        f.write(imgdata)

    with open(filename, "rb") as f:
        file_bytes = f.read()
    try:
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
    except:
        remove_img(filename)
        return JSONResponse(
            status_code=500,
            content={
                "message": f"Clarifai 서버 문제, 혹은 그에 관한 문제",
                "errcode": 2,
                },
        )

    if response.status.code != status_code_pb2.SUCCESS:
        # print(response)
        remove_img(filename)
        return JSONResponse(
            status_code=500,
            content={
                "message": f"Clarifai 서버 문제, 혹은 그에 관한 문제",
                "errcode": 2,
                },
        )

    for concept in response.outputs[0].data.concepts:
        # print("%12s: %.2f" % (concept.name, concept.value))
        result.update({concept.name:concept.value})
    # print(result)
    if classification_keyword in result:
        try:
            to = make_classification_url_name(participation_id)
            file_url = s3_upload(filename, 'homybk', to)
            if file_url:
                execute_insert_feed(participation_id, file_url, feed_content, feed_time)
        except:
            remove_img(filename)
            return JSONResponse(
                status_code=500,
                content={
                    "message": f"S3 오류",
                    "errcode": 5
                    },
            )

        remove_img(filename)
        return JSONResponse(
            status_code=200,
            content={
                "message": f"잘 찍었습니다.",
                },
        )
    else:
        remove_img(filename)
        return JSONResponse(
            status_code=400,
            content={
                "message": f"해당 단어에 알맞지 않은 사진이거나, 사진을 다시 찍어주세요.",
                "errcode": 3,
                },
        )


# 이미지 특징점 확인
@app.post("/auth/stdimg")
async def test(data: StdImgInput):
    filename = ''
    try:
        data = str(data)
        participation_id = (data.split("'")[1])
        std_img=data.split("'")[3]
    except:
        return JSONResponse(
            status_code=400,
            content={
                "message": f"입력이 바르지 않습니다.",
                "errcode": 1
                },
        )
    try:
        imgdata = base64.b64decode(std_img)
        filename = "./imgs/"+make_std_url_name(participation_id)
        with open(filename, 'wb') as f:
            f.write(imgdata)
        src1 = cv2.imread(filename, cv2.IMREAD_GRAYSCALE)
    except:
        if filename:
            remove_img(filename)
        return JSONResponse(
            status_code=400,
            content={
                "message": f"사진이 첨부되지 않았습니다.",
                "errcode": 2
                },
        )
    feature = cv2.AKAZE_create()
    kp1, desc1 = feature.detectAndCompute(src1, None)

    if len(kp1)<80:
        remove_img(filename)
        return JSONResponse(
            status_code=400,
            content={
                "message": f"특징점이 확실한 사직을 찍어주세요.",
                "errcode": 3
                },
        )
    else:
        try:
            to = make_std_url_name(participation_id)
            file_url = s3_upload(filename, 'homybk', to)
            if file_url:
                execute_insert_std_img(participation_id, file_url)
        except:
            remove_img(filename)
            return JSONResponse(
                status_code=500,
                content={
                    "message": f"사진이 업로드 되지 않습니다.",
                    "errcode": 4
                    },
            )

        remove_img(filename)
        return JSONResponse(
            status_code=200,
            content={
                "message": f"완료 되었습니다.",
                },
        )
    remove_img(filename)
    return JSONResponse(
        status_code=500,
        content={
            "message": f"뭔가 잘못 되었고, 문의바랍니다.",
            },
    )

# 이미지 특징점 비교
@app.post("/auth/feature")
async def featimg(data:FeatureInput):
    # 영상 불러오기
    # image_nparray2 = np.asarray(bytearray(requests.get(url2).content), dtype=np.uint8)
    try:
        data = str(data)    
        participation_id = data.split("'")[1]
        feed_img = data.split("'")[3]
        feed_content = data.split("'")[5]
    except:
        return JSONResponse(
            status_code=400,
            content={
                "message": f"입력이 바르지 않습니다.",
                "errcode": 1
                },
        )
    url1 = execute_select_std_img(participation_id)
    if not(url1):
        return JSONResponse(
            status_code=400,
            content={
                "message": f"기준 사진이 존재하지 않습니다.",
                "errcode": 2
                },
        )
        # 인증 시간 관련
    time_flag = is_auth_intime(int(participation_id))
    if time_flag[0] == 3:
        pass
    else:
        return JSONResponse(
            status_code=400,
            content={
                "message": f"인증 시간이 아닙니다.",
                "errcode": 3,
                },
        )
    
    imgdata = base64.b64decode(feed_img)

    filename = "./imgs/"+make_feature_url_name(participation_id)
    with open(filename, 'wb') as f:
        f.write(imgdata)
    # pic2은 유저가 찍은 사진
    with open(filename, 'rb') as f:
        pic2 = f.read()
    image_nparray1 = np.asarray(bytearray(requests.get(url1).content), dtype=np.uint8)
    image_nparray1 = np.fromstring(image_nparray1, dtype = np.uint8)
    image_nparray2 = np.fromstring(pic2, dtype = np.uint8)

    src1 = cv2.imdecode(image_nparray1, cv2.IMREAD_GRAYSCALE)
    src2 = cv2.imdecode(image_nparray2, cv2.IMREAD_GRAYSCALE)

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
    print(A)
    # plt.imshow(dst,),plt.show()
    # cv2.waitKey()
    # cv2.destroyAllWindows()
    # # 사각형의 넓이에 따라 출력
    if A<=30:
        remove_img(filename)
        return JSONResponse(
            status_code=400,
            content={
                "message": f"사진이 일치하지 않습니다.",
                "errcode": 4
                },
        )
    else:
        try:
            to = make_feature_url_name(participation_id)
            file_url = s3_upload(filename, 'homybk', to)
            if file_url:
                execute_insert_feed(participation_id, file_url, feed_content, feed_time)
        except:
            remove_img(filename)
            return JSONResponse(
                status_code=500,
                content={
                    "message": f"사진이 업로드 되지 않습니다.",
                    "errcode": 5
                    },
            )
        remove_img(filename)
        return JSONResponse(
            status_code=200,
            content={
                "message": f"완료되었습니다.",
                },
        )


@app.get("/auth/isauthtoday/{participation_id}")
async def isauthedtoday(participation_id: int):
    now = datetime.now()
    today = current_time_date = now.strftime("%Y-%m-%d")
    isauthed = execute_select_isauth(participation_id, today)
    if isauthed:
        return JSONResponse(
            status_code=200,
            content={
                "message": f"이미 인증 되었습니다.",
                "isauthed": True
                },
        )
    else:
        return JSONResponse(
            status_code=200,
            content={
                "message": f"인증이 완료되지 않았습니다.",
                "isauthed": False
                },
        )


@app.get("/auth/isstdimg/{participation_id}")
async def isstdimg(participation_id: int):
    isstdimg = execute_select_std_img(participation_id)
    if isstdimg:
        return JSONResponse(
            status_code=200,
            content={
                "message": f"이미 기준 사진이 존재 합니다.",
                "isauthed": True
                },
        )
    else:
        return JSONResponse(
            status_code=200,
            content={
                "message": f"인증 사진이 존재하지 않습니다.",
                "isauthed": False
                },
        )


# reload app``
if __name__ == '__main__':
    uvicorn.run("authimg:app", host="localhost", port=8000, reload=True)