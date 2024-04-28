package com.signlink.UserScore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserScoreService {
    private final UserScoreRepository userScoreRepository;

    @Autowired
    public UserScoreService(UserScoreRepository userScoreRepository) {
        this.userScoreRepository = userScoreRepository;
    }

    public List<UserScore> getAllUserScoreService() {
        return userScoreRepository.findAll();
    }

    public UserScore getUserScore(String usersGoogleID, String courseID) {
        List<UserScore> scores = userScoreRepository.findAllByUsersGoogleIDAndCourseID(usersGoogleID, courseID);
        System.out.println(scores);

        scores.sort(Comparator.comparing(UserScore::getTime).reversed());
        System.out.println(scores);
        if (scores.isEmpty()){
            return  null;
        }
        return scores.get(0);
    }

    public void setUserScore(String usersID, String courseID, Float score) {
        UserScore newRow = new UserScore(
                usersID,
                courseID,
                score
        );
        newRow.setTime(LocalDateTime.now());
        userScoreRepository.save(newRow);

        return;
    }

    public List<UserScore> getAllUsersScores(String usersGoogleId) {
        List<UserScore> allScores = userScoreRepository.findByUsersGoogleID(usersGoogleId);

        return getLatestScoresByCourse(allScores);
    }

    public static List<UserScore> getLatestScoresByCourse(List<UserScore> userScores) {
        // group UserScore objects by courseID
        Map<String, UserScore> latestScoresByCourse = userScores.stream()
                .collect(Collectors.toMap(
                        UserScore::getCourseID,
                        // in case of duplicate courseID, choose the one with the most recent time
                        score -> score,
                        (score1, score2) -> score1.getTime().isAfter(score2.getTime()) ? score1 : score2
                ));

        // Convert the map values to a list
        return new ArrayList<>(latestScoresByCourse.values());
    }

    public List<UserScore> getAllUserCourseData(String googleID, String courseID) {
         return userScoreRepository.findAllByUsersGoogleIDAndCourseID(googleID,courseID);
    }
}
