from pydantic import BaseModel, Json


class CommonInput(BaseModel):
    participation_id: int
    feed_img: str
    feed_content: str


class StdImgInput(BaseModel):
    participation_id: int
    std_img: str


class FeatureInput(BaseModel):
    participation_id: int
    feed_img: str
    feed_content: str


class classificationpicture(BaseModel):
    participation_id: int
    feed_img: str
    feed_content: str
    classification_keyword: str