package com.signlink.UserScore;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Table
@Entity
public class UserScore {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_score_sequence")
    @SequenceGenerator(name = "user_score_sequence", sequenceName = "user_score_sequence", allocationSize = 1)
    private Long id;
    private String usersGoogleID;
    private String courseID;
    private Float score;
    private LocalDateTime time;

    public UserScore() {}

    public UserScore(String usersGoogleID, String courseID, Float score) {
        this.usersGoogleID = usersGoogleID;
        this.courseID = courseID;
        this.score = score;
    }

    public UserScore(String usersGoogleID, String courseID, Float score, LocalDateTime time) {
        this.usersGoogleID = usersGoogleID;
        this.courseID = courseID;
        this.score = score;
        this.time = time;
    }

    public String getUsersID() {
        return usersGoogleID;
    }

    public void setUsersID(String usersGoogleID) {
        this.usersGoogleID = usersGoogleID;
    }

    public String getCourseID() {
        return courseID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "UserScore{" +
                "id=" + id +
                ", usersGoogleID='" + usersGoogleID + '\'' +
                ", courseID='" + courseID + '\'' +
                ", score=" + score +
                ", time=" + time +
                '}';
    }
}
