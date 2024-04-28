package com.signlink.UserScore;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserScoreRepository extends JpaRepository<UserScore, String> {
    UserScore findByCourseIDAndUsersGoogleID(String courseID, String usersGoogleID);

    @Modifying
    @Transactional
    @Query("DELETE FROM UserScore us WHERE us.courseID = :courseID AND us.usersGoogleID = :usersGoogleID")
    void deleteAllByCourseIDAndUsersGoogleID(String courseID, String usersGoogleID);

    List<UserScore> findByUsersGoogleID(String usersGoogleID);


    List<UserScore> findAllByUsersGoogleIDAndCourseID(String courseID, String usersGoogleID);


}
