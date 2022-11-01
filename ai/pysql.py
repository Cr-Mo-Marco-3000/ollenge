import pymysql
from dotenv import dotenv_values
import os


def get_connection():
    return pymysql.connect(
        user = "ollenge",
        password = DB_PASSWORD,
        host = DB_HOST,
        port = 32000,
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
    sql = """INSERT INTO feed (created_datetime, feed_content, feed_img, feed_type, participation_id) VALUES (%s, %s, %s, '1', %s);"""
    vals = (feed_time, feed_content, url, participation_id)
    # sql = f"INSERT INTO auth_standard_img (standard_img, participation_id) VALUES (url, {participation_id});"
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(sql, vals)
    conn.commit()
    cursor.close()
    conn.close()


# classification 관련 sql
# def execute_select_keyword(classification_keyword_id):
#     classification_keyword_id = int(classification_keyword_id)
#     sql = f"SELECT standard_img from classification_keyword WHERE classification_keyword_id = {classification_keyword_id}"
#     return execute_select(sql)[0][0]


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

        
config = dotenv_values(".env")
DB_PASSWORD = config.get('DB_PASSWORD')
DB_HOST = config.get('DB_HOST')