package com.ollenge.scheduler;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
@AllArgsConstructor
public class CalculateScoreScheduler {

    //매일 새벽 4ㅣ
    @Scheduled(cron = "0 0 4 * * *", zone = "Asia/Seoul")
    public void calculateScore() {
        LocalDate target = LocalDate.now(ZoneId.of("Asia/Seoul"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formatedTarget = target.format(formatter);
        log.info("execute pipeline - {}", formatedTarget);
    }
}
