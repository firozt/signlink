package com.signlink.UserPackage;


import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;

@Entity
@Table
public class Users {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String ID; // id given by google login or generated here
    private String email;
    private String name;
    private String password;
    private LocalDate createDate;

    /* --------------- Constructors --------------- */

    public Users() {}

    public Users(String ID, String name, String email){
        this.ID = ID;
        this.name = name;
        this.createDate = LocalDate.now();
        this.email = email;
    }

    public Users(String ID, String name, LocalDate createDate, String email) {
        this.ID = ID;
        this.name = name;
        this.createDate = createDate;
        this.email = email;
    }
    public Users(String name, LocalDate createDate, String email) {
        this.name = name;
        this.createDate = createDate;
        this.email = email;
    }

    /* --------------- Utility Methods --------------- */

    public void initialiseDateNow() {
        this.createDate = LocalDate.now();
    }


    /* --------------- Getter and Setters + Defaults Overrides --------------- */

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getID() {
        return ID;
    }

    public void setID(String googleID) {
        this.ID = googleID;
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
                "id='" + ID + '\'' +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", createDate=" + createDate +
                '}';
    }
}
