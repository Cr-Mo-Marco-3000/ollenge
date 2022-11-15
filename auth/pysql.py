import pymysql
from dotenv import dotenv_values
import os


def get_connection():
    return pymysql.connect(
        user = "ollenge",
        password = DB_PASSWORD,
        host = DB_HOST,
        port = int(DB_PORT),
        db = "ollenge",
        charset = 'utf8'
    )


def execute_delete(sql):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql)
    conn.commit()
    cursor.close()
    conn.close()


def execute_select(sql):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result


def execute_select2(sql, vals):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql,vals)
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result


# std_img 관련 sql
def execute_insert_std_img(participation_id, url):
    # 일단 같은 participation으로 들어가있으면 삭제
    participation_id = int(participation_id)
    del_sql = f"DELETE FROM auth_standard_img WHERE participation_id = {participation_id}" 
    execute_delete(del_sql)
    # sql = f"INSERT INTO auth_standard_img (standard_img, participation_id) VALUES ('https://homybk.s3.ap-northeast-2.amazonaws.com/cat.jpg', {participation_id});"
    sql = """INSERT INTO auth_standard_img (standard_img, participation_id) VALUES (%s, %s);"""
    vals = (url, participation_id)
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql, vals)
    conn.commit()
    cursor.close()
    conn.close()


# feature 관련 sql
def execute_select_std_img(participation_id):
    participation_id = int(participation_id)
    sql = f"SELECT standard_img from auth_standard_img WHERE participation_id = {participation_id}"
    result = execute_select(sql)
    if result:
        return result[0][0]
    else:
        return False

def execute_insert_feed(participation_id, url, feed_content, feed_time):
    # 일단 같은 participation으로 들어가있으면 삭제
    participation_id = int(participation_id)
    sql = """INSERT INTO feed (created_datetime, feed_content, feed_img, feed_type, participation_id) VALUES (%s, %s, %s, 'user', %s);"""
    vals = (feed_time, feed_content, url, participation_id)
    # sql = f"INSERT INTO auth_standard_img (standard_img, participation_id) VALUES (url, {participation_id});"
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql, vals)
    conn.commit()
    cursor.close()
    conn.close()


# challenge 인증 시간 뽑아내는 용
def execute_select_challenge_auth_time(participation_id):
    participation_id = int(participation_id)
    sql = f"SELECT start_date, end_date, start_time, end_time FROM challenge WHERE challenge_id = (SELECT challenge_id FROM participation WHERE participation_id = {participation_id});"
    return execute_select(sql)[0]


# challenge 오늘 인증 확인 용
def execute_select_isauth(participation_id, feed_time):
    participation_id = int(participation_id)
    sql = """SELECT * FROM feed WHERE participation_id=%s and created_datetime LIKE %s;"""
    qr = feed_time+"%"
    vals = (participation_id, qr)
    result = execute_select2(sql, vals)
    if result:
        return True
    else:
        return False 


# 인증 관련 아이디 비교
def execute_select_token_user_id(participation_id):
    participation_id = int(participation_id)
    sql = f"SELECT user_id from participation WHERE participation_id = {participation_id}"
    result = execute_select(sql)
    if result:
        return result[0][0]
    else:
        return False


# 프로필 이미지 업로드
def execute_update_profile_img(user_id, img):
    user_id = int(user_id)
    sql = """UPDATE user SET profile_img=%s WHERE user_id=%s"""
    vals = (img, user_id)
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql,vals)
    conn.commit()
    cursor.close()
    conn.close()
    return 0


# participation cnt 증가
def execute_feed_cnt_increase(participation_id):
    participation_id = int(participation_id)
    sql = """UPDATE participation SET feed_cnt=feed_cnt+1 WHERE participation_id=%s"""
    vals = (participation_id,)
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql,vals)
    conn.commit()
    cursor.close()
    conn.close()
    return 0


# challenge_score 증가
def execute_challenge_score_increase(participation_id):
    participation_id = int(participation_id)
    sql = """UPDATE challenge SET challenge_score=challenge_score+10 WHERE challenge_id=(SELECT challenge_id FROM participation WHERE participation_id=%s)"""
    vals = (participation_id,)
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql,vals)
    conn.commit()
    cursor.close()
    conn.close()
    return 0


# challengeId, userid => participation Id
def execute_select_participation_id(challenge_id, user_id):
    challenge_id = int(challenge_id)
    user_id = int(user_id)
    sql = """SELECT participation_id from participation WHERE challenge_id = %s AND user_id=%s"""
    vals = (challenge_id, user_id)
    result = execute_select2(sql, vals)
    if result:
        return result[0][0]
    else:
        return False


# classification type id to keyword List
def execute_select_keword_list(classification_type_id):
    classification_type_id = int(classification_type_id)
    sql = """SELECT keyword FROM classification_keyword WHERE classification_type_id=%s"""
    vals = (classification_type_id, )
    result = execute_select2(sql, vals)
    if result:
        return result
    else:
        return False


config = dotenv_values(".env")
DB_PASSWORD = config.get('DB_PASSWORD')
DB_HOST = config.get('DB_HOST')
DB_PORT= config.get('DB_PORT')
