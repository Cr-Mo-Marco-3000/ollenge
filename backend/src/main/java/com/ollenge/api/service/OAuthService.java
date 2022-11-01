package com.ollenge.api.service;

import com.ollenge.db.entity.User;
import com.ollenge.db.repository.UserRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class OAuthService {

    @Autowired
    UserRepository userRepository;

    public String getKakaoAccessToken(String code) {
        String accessToken="";
        String reqURL="https://kauth.kakao.com/oauth/token";

        try {
            URL url=new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id="+"e92257cb82c9cbdfea8773e3656f72a2");
            sb.append("&redirect_uri=http://localhost:8080/api/oauth/kakao");
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            StringBuilder result = new StringBuilder();

            while ((line = br.readLine()) != null) {
                result.append(line);
            }

            JSONObject jObject=new JSONObject(result.toString());
            accessToken = jObject.getString("access_token");

            br.close();
            bw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return accessToken;
    }

    public JSONObject getKakaoUser(String token) throws Exception {
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        StringBuilder result = new StringBuilder();
        BufferedReader br = null;

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token);

            br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            while ((line = br.readLine()) != null) {
                result.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (br != null) br.close();
        }

        return new JSONObject(result.toString());
    }

    public boolean checkUser(JSONObject jsonObject) throws JSONException {
        String id = jsonObject.getString("id");
        return userRepository.findUserByAuthCode(id).isPresent();
    }

    public User createUser(JSONObject jsonObject) throws JSONException {
        User user = new User();
        user.setNickname(jsonObject.getString("id"));
        user.setAuthCode(jsonObject.getString("id"));
        user.setLoginType(jsonObject.getString("login_type"));
        user.setUserFlag(false);
        return userRepository.save(user);
    }
}
