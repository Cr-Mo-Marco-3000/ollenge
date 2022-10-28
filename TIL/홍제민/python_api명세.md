# std_img

1. client 에서 python으로

   ```
   {
   	participation_id: int,
   	std_img: str
   }
   ```

2. std_img feature process

   - response 1

     ```
     입력이 옳바르지 않다면
     {
     	status: 400,
     	message: "다시 입력해 주세요",
     	res: 1
     }
     ```

   - response 2

     ```
     사진이 없다면
     {
     	status: 400,
     	message: "사진이 첨부되지 않았습니다.",
     	res: 2
     }
     ```

   - response 3

     ```
     사진의 특징점이 적다면
     {
     	status: 400,
     	message: "더 확실한 사진을 찍어주세요",
     	res: 3
     }
     ```

3. S3 저장

   - name = 'participation_id'+"datehourminutesec"

   - url = "https://homybk.s3.ap-northeast-2.amazonaws.com/" + "name.jpg"

   - response 4

     ```
     저장이 되지 않았다면
     {
     	status: 500,
     	message: "사진이 업로드 되지 않습니다.",
     	res: 4
     }
     ```

   - response 5

     ```
     저장 완료
     {
     	status: 200,
     	message: "완료되었습니다.",
     	res: 5,
     	result: True,
     	std_url: url
     }
     ```

     

4. DB 저장

   - 데이터 베이스 저장

     ```
     {
     	auth_standard_img_id : int,
     	participation_id: participation_id(int),
     	standart_img: url(str),
     }
     ```

     

# img_feature

1. client 에서 python으로

   ```
   {
   	participation_id: int,
   	feed_img: str,
   	feed_content: str
   }
   ```

2. img feature matching process

   - response 1

     ```
     입력이 옳바르지 않다면
     {
     	status: 400,
     	message: "다시 입력해 주세요",
     	res: 1
     }
     ```

   - response 2

     ```
     피드 사진이 없다면
     {
     	status: 400,
     	message: "사진이 첨부되지 않았습니다.",
     	res: 2
     }
     ```

   - response 3

     ```
     기준 사진이 없다면
     {
     	status: 400,
     	message: "기준 사진이 없습니다",
     	res: 3
     }
     ```

   - response 4

     ```
     participation id -> CG id -> start end time 등등 확인 후 조건 안맞으면
     {
     	status: 400,
     	message: "인증 기간이 아닙니다.",
     	res: 4
     }
     ```

   - response 5

     ```
     이미지 비교 후 맞지 않으면
     {
     	status: 400,
     	message: "옳바른 사진이 아닙니다.",
     	res: 5
     }
     ```

     

3. S3 저장

   - name = 'participation_id'+"datehourminutesec"

   - url = "https://homybk.s3.ap-northeast-2.amazonaws.com/" + "name.jpg"

   - response 6

     ```
     저장이 되지 않았다면
     {
     	status: 500,
     	message: "사진이 업로드 되지 않습니다.",
     	res: 6
     }
     ```

4. DB 저장

   - 데이터 베이스 저장

     ```
     {
     	feed_id: int
     	feed_type: 'auth'(str),
     	participation_id: participation_id(int),
     	created_datetime: DATE(),
     	feed_img: url(str),
     	feed_content: feed_content(str)
     	
     }
     ```

     