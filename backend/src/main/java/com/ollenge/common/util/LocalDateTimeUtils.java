package com.ollenge.common.util;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;

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

    public static LocalDate getFirstDayOfTargetMonth(LocalDate target) {
        return target.with(TemporalAdjusters.firstDayOfMonth());
    }

    public static LocalDate getLastDayOfTargetMonth(LocalDate target) {
        return target.with(TemporalAdjusters.lastDayOfMonth());
    }

    public static LocalDate getFirstDayOfTargetNextMonth(LocalDate target) {
        return target.with(TemporalAdjusters.firstDayOfNextMonth());
    }

    public static LocalDate getLastDayOfTargetNextMonth(LocalDate target) {
        return target.with(TemporalAdjusters.firstDayOfNextMonth()).with(TemporalAdjusters.lastDayOfMonth());
    }
}
