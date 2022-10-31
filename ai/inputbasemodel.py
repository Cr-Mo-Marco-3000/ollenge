from pydantic import BaseModel, Json


class CommonInput(BaseModel):
    participation_id: str
    feed_img: str
    feed_content: str


class StdImgInput(BaseModel):
    participation_id: str
    std_img: str

class FeatureInput(BaseModel):
    participation_id: str
    feed_img: str
    feed_content: str

class classificationpicture(BaseModel):
    participation_id: str
    feed_img: str
    feed_content: str
    classification_keyword: str