package com.ollenge.common.util;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;

public class LocalDateTimeUtils {

    public static boolean isValidStartDate(LocalDate startDate) {
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));
        return startDate.compareTo(today) > 0;
    }

    public static boolean isValidEndDate(LocalDate startDate, LocalDate endDate) {
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));
        return endDate.compareTo(startDate) >= 0;
    }

    public static boolean isValidTime(LocalTime startTime, LocalTime endTime) {
        return endTime.compareTo(startTime) >= 0;
    }
}
