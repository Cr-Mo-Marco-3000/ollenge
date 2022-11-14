from pydantic import BaseModel, Json


class CommonInput(BaseModel):
    challenge_id: int
    feed_img: str
    feed_content: str


class StdImgInput(BaseModel):
    challenge_id: int
    std_img: str


class FeatureInput(BaseModel):
    challenge_id: int
    feed_img: str
    feed_content: str


class classificationpicture(BaseModel):
    challenge_id: int
    feed_img: str
    feed_content: str
    classification_type_id: int


class uploadImg(BaseModel):
    profile_img: str