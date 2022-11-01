import boto3
from datetime import datetime
from dotenv import load_dotenv
from dotenv import dotenv_values
import os 


def s3_connection(id, key):
    try:
        # s3 클라이언트 생성
        s3 = boto3.client(
            service_name="s3",
            region_name="ap-northeast-2",
            aws_access_key_id=id,
            aws_secret_access_key=key,
        )
    except Exception as e:
        print(e)
    else:
        print("s3 bucket connected!") 
        return s3


def s3_upload(fr, bk, to):  # local 파일인  fr을  bk버킷에 to 라는 이름으로 저장
    try:
        s3.upload_file(fr, bk, to)
        return "https://homybk.s3.ap-northeast-2.amazonaws.com/"+to
    except Exception as e:
        print(e)
        return 0


def s3_download(bk, fr, to):
    try:
        s3.download_file(bk, fr, to)
        return to
    except Exception as e:
        print(e)
        return 0


def make_common_url_name(participation_id):
    now = datetime.now()
    current_time = now.strftime("%Y_%m_%d_%H_%M_%S.jpg")
    name = "common_"+participation_id + "_" + current_time
    return name


def make_std_url_name(participation_id):
    now = datetime.now()
    current_time = now.strftime("%Y_%m_%d_%H_%M_%S.jpg")
    name = "std_"+participation_id + "_" + current_time
    return name


def make_feature_url_name(participation_id):
    now = datetime.now()
    current_time = now.strftime("%Y_%m_%d_%H_%M_%S.jpg")
    name = "feature_"+participation_id + "_" + current_time
    return name


def make_classification_url_name(participation_id):
    now = datetime.now()
    current_time = now.strftime("%Y_%m_%d_%H_%M_%S.jpg")
    name = "classification_"+participation_id + "_" + current_time
    return name


# S3 key관리
BUCKET_NAME = 'homybk'
config = dotenv_values(".env")
S3_KEY_ID = config.get('S3KEYID')
S3_SECRET_KEY = config.get('S3SECRETKEY')        
s3 = s3_connection(S3_KEY_ID, S3_SECRET_KEY)