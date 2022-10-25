from fastapi import FastAPI, Form, File, UploadFile
from clarifai_grpc.grpc.api import service_pb2, resources_pb2
from clarifai_grpc.grpc.api.status import status_code_pb2
from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import service_pb2_grpc

# .env 파일
from dotenv import load_dotenv
from dotenv import dotenv_values
import os 


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
    return {"message": "I'm python"}

# 로컬에 있는 사진을 바탕으로 img recognition 실행
@app.get("/authimg/local")
async def authimglc():
    print(YOUR_CLARIFAI_API_KEY)
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


# url을 바탕으로 img recognition 실행
@app.get("/authimg/{url}")
async def authimgurl(url: str):
    request = service_pb2.PostModelOutputsRequest(
        # This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id="general-image-recognition",
        user_app_id=resources_pb2.UserAppIDSet(app_id=YOUR_APPLICATION_ID),
        inputs=[
            resources_pb2.Input(
                data=resources_pb2.Data(image=resources_pb2.Image(url=url))
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


# 이미지 비교
@app.get("/cmpimg/")
async def cmpimg():  # 못 써먹을 수준
    print("hi")
    import requests
    r = requests.post(
        "https://api.deepai.org/api/image-similarity",
        files={
            'image1': open('mouse1.jpg', 'rb'),
            'image2': open('mouse2.jpg', 'rb'),
        },
        headers={'api-key': YOUR_DEEP_API_KEY}
    )
    print(r.json())
    return r.json()
