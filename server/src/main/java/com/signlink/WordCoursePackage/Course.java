package com.signlink.WordCoursePackage;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Course {
    @Id
    String name;
    String iconURI;
    String difficulty;

    public Course() {}

    public Course(String name, String iconURI, String difficulty) {
        this.name = name;
        this.iconURI = iconURI;
        this.difficulty = difficulty;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIconURI() {
        return iconURI;
    }

    public void setIconURI(String path) {
        this.iconURI = path;
    }

    public String getDifficulty() {
        return difficulty;
    }
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    @Override
    public String toString() {
        return "Course{" +
                "name='" + name + '\'' +
                ", pathToIcon='" + iconURI + '\'' +
                ", difficulty='" + difficulty + '\'' +
                '}';
    }
}
