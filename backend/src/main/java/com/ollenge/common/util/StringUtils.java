package com.ollenge.common.util;

import java.util.regex.Pattern;

public class StringUtils {

    public static final String nicknameRegex = "^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]*$";
    public static final String titleRegex = "^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9?!,./\"':;@#$%^&*()\\[\\]{}\\-=_+~ ]*$";
    public static final String contentRegex = "^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9?!,./\"':;@#$%^&*()\\[\\]{}\\-=_+~ \\n\\r]*$";

    public static boolean isValidStringWithoutSpace(String keyword) {
        return Pattern.matches(nicknameRegex, keyword);
    }

    public static boolean isValidStringWithSpace(String keyword) {
        return Pattern.matches(titleRegex, keyword);
    }
}
