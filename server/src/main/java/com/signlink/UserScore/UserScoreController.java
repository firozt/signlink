package com.signlink.UserScore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/users")

public class UserScoreController {
    private final UserScoreService userScoreService;

    @Autowired
    public UserScoreController(UserScoreService userScoreService) {
        this.userScoreService = userScoreService;
    }

    @GetMapping("/userscore/getall")
    public List<UserScore> getAllUserScore() {
        return userScoreService.getAllUserScoreService();
    }

    @GetMapping("/get/{googleID}/{courseID}")
    public UserScore getUserScore(@PathVariable String googleID, @PathVariable String courseID) {
        return userScoreService.getUserScore(googleID,courseID);
    }

    @GetMapping("/userscore/{googleID}")
    public List<UserScore> getAllUserScore(@PathVariable String googleID) {
        return userScoreService.getAllUsersScores(googleID);
    }

    @PostMapping("/setscore/{googleID}/{courseID}/{score}")
    public void setUserScore(@PathVariable String googleID, @PathVariable String courseID,@PathVariable Float score) {
        userScoreService.setUserScore(googleID,courseID,score);
        return;
    }

    @GetMapping("/userscore/getall/{googleID}/{courseID}")
    public List<UserScore> getAllCourseDataFromUser(@PathVariable String googleID,@PathVariable String courseID) {
        return userScoreService.getAllUserCourseData(googleID, courseID);
    }

}
//[UserScore{id=1, usersGoogleID='1', courseID='2', score=5.0, time=2024-04-26T17:17:36.960740},
// UserScore{id=2, usersGoogleID='1', courseID='2', score=10.0, time=2024-04-26T17:17:40.206549},
// UserScore{id=3, usersGoogleID='1', courseID='3', score=4.0, time=2024-04-26T17:17:44.465456}]
