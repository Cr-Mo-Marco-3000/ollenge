package com.ollenge.api.service;

import com.ollenge.db.entity.User;
import org.json.JSONException;
import org.json.JSONObject;

public interface OAuthService {
    public String getKakaoAccessToken(String code);
    public JSONObject getKakaoUser(String token) throws Exception;
    public boolean checkUser(JSONObject jsonObject) throws JSONException;
    public User createUser(JSONObject jsonObject) throws JSONException;
}
