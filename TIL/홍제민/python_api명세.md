# std_img

1. client 에서 python으로

   ```
   {
   	participation_id: str,
   	std_img: str
   }
   ```

2. std_img feature process

   - response 1

     ```
     입력이 알맞지 않다면,
     {
     	status: 400,
     	data: {
     		message: "입력이 바르지 않습니다.",
     		errcode: 1
     	}
     }
     ```

   - response 2

     ```
     사진처리에 문제가 발생한다면, 이건 일단 400찍어둔거라 뜨면 말해주세요,,
     {
     	status: 400,
     	data: {
     		message: "사진이 첨부되지 않았습니다.",
     		errcode: 2
     	}
     }
     ```

   - response 3

     ```
     사진의 특징점이 적다면
     {
     	status: 400,
     	data: {
     		message: "특징점이 확실한 사직을 찍어주세요.",
     		errcode: 3
     	}
     }
     ```

3. S3 저장

   - name = '"std"_participation_id'+"datehourminutesec"

   - url = "https://homybk.s3.ap-northeast-2.amazonaws.com/" + "name.jpg"

   - response 4

     ```
     S3 문제로 저장이 되지 않았다면
     {
     	status: 500,
     	data: {
     		message: "사진이 업로드 되지 않습니다.",
     		errcode: 4
     	}
     }
     ```

   - response 5

     ```
     저장 완료
     {
     	status: 200,
     	data: {
     		message: "완료 되었습니다.",
     	}
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
     입력이 알맞지 않다면,
     {
     	status: 400,
     	data: {
     		message: "입력이 바르지 않습니다.",
     		errcode: 1
     	}
     }
     ```

   - response 2

     ```
     기준 사진이 없다면
     {
     	status: 400,
     	data: {
     		message: "기준 사진이 존재하지 않습니다.",
     		errcode: 2
     	}
     }
     ```

   - response 3

     ```
     participation id -> CG id -> start end time 등등 확인 후 조건 안맞으면
     {
     	status: 400,
     	data: {
     		message: "인증 시간이 아닙니다.",
     		errcode: 3
     	}
     }
     ```

   - response 4

     ```
     이미지 비교 후 맞지 않으면
     {
     	status: 400,
     	data: {
     		message: "사진이 일치하지 않습니다.",
     		errcode: 4
     	}
     }
     ```
     
     

3. S3 저장

   - name = '"feature"_participation_id'+"datehourminutesec"

   - url = "https://homybk.s3.ap-northeast-2.amazonaws.com/" + "name.jpg"

   - response 5

     ```
     저장이 되지 않았다면
     {
     	status: 500,
     	data: {
     		message: "사진이 업로드 되지 않습니다.",
     		errcode: 5
     	}
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

   - response 7

     ```
     저장 완료
     {
     	status: 200,
     	data: {
     		message: "완료되었습니다.",
     	}
     }
     ```
     
     

# classification

1. client 에서 python으로

   ```
   {
   	participation_id: str,
   	feed_img: str,
   	feed_content: str
   	classification_keyword: str
   }
   ```

2. img feature matching process

   - response 1

     ```
     입력이 바르지 않다면
     {
     	status: 400,
     	data: {
     		message: "입력이 바르지 않습니다.",
     		errcode: 1
     	}
     }
     ```

   - response 2

     ```
     Clarifai 측 문제가 있는 경우
     {
     	status: 500,
     	data: {
     		message: "Clarifai 서버 문제, 혹은 그에 관한 문제",
     		errcode: 2
     	}
     }
     ```

   - response 3

     ```
     키워드에 맞지 않는 사진 일 경우
     {
     	status: 400,
     	data: {
     		message: "해당 단어에 알맞지 않은 사진이거나, 사진을 다시 찍어주세요.",
     		errcode: 3
     	}
     }
     ```

   - response 4

     ```
     participation id -> CG id -> start end time 등등 확인 후 조건 안맞으면
     {
     	status: 400,
     	data: {
     		message: "인증 시간이 아닙니다.",
     		errcode: 4
     	}
     }
     ```

3. S3 저장

   - name = '"classification"_participation_id'+"datehourminutesec"

   - url = "https://homybk.s3.ap-northeast-2.amazonaws.com/" + "name.jpg"

   - response 6

     ```
     S3 에 저장이 되지 않았다면
     {
     	status: 500,
     	data: {
     		message: "S3 오류",
     		errcode: 5
     	}
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

   - response 7

     ```
     저장 완료
     {
     	status: 200,
     	data: {
     		message: "완료",
     	}
     }
     ```
     
     