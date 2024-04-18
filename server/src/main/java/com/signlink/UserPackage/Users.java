package com.signlink.UserPackage;


import jakarta.persistence.*;

@Entity
@Table
public class Users {
    @Id
    private String googleID; // id given by google login
    private String name;

    public Users() {}

    Users(String googleID, String name){
        this.googleID = googleID;
        this.name = name;
    }
}
