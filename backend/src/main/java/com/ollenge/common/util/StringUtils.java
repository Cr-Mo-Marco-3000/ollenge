package com.ollenge.common.util;

import java.util.regex.Pattern;

public class StringUtils {

    public static boolean isValidStringWithoutSpace(String keyword) {
        return Pattern.matches("^[가-힣a-zA-Z0-9]*$",keyword);
    }

    public static boolean isValidStringWithSpace(String keyword) {
        return Pattern.matches("^[가-힣a-zA-Z0-9 ]*$",keyword);
    }
}
