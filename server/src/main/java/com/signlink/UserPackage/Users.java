package com.signlink.UserPackage;


import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table
public class Users {
    @Id
    private String googleID; // id given by google login
    private String email;
    private String name;
    private LocalDate createDate;
    /* --------------- Constructors --------------- */

    public Users() {}

    public Users(String googleID, String name, String email){
        this.googleID = googleID;
        this.name = name;
        this.createDate = LocalDate.now();
        this.email = email;
    }

    public Users(String googleID, String name, LocalDate createDate, String email) {
        this.googleID = googleID;
        this.name = name;
        this.createDate = createDate;
        this.email = email;
    }

    /* --------------- Utility Methods --------------- */

    public void initialiseDateNow() {
        this.createDate = LocalDate.now();
    }


    /* --------------- Getter and Setters + Defaults Overrides --------------- */

    public String getGoogleID() {
        return googleID;
    }

    public void setGoogleID(String googleID) {
        this.googleID = googleID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Users{" +
                "googleID='" + googleID + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", createDate=" + createDate +
                '}';
    }
}
