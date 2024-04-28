package com.signlink.WordCoursePackage;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table
@Entity
public class Word {
    @Id
    String wordText;
    String imageURI;
    String courseUsedIn;

    public Word() {}

    public Word(String wordText, String imageURI, String courseUsedIn) {
        this.wordText = wordText;
        this.imageURI = imageURI;
        this.courseUsedIn = courseUsedIn;
    }

    public String getWordText() {
        return wordText;
    }

    public void setWordText(String wordText) {
        this.wordText = wordText;
    }

    public String getCourseUsedIn() {
        return courseUsedIn;
    }

    public void setCourseUsedIn(String courseUsedIn) {
        this.courseUsedIn = courseUsedIn;
    }

    public String getImageURI() {
        return imageURI;
    }

    public void setImageURI(String path) {
        this.imageURI = path;
    }

    @Override
    public String toString() {
        return "Word{" +
                "wordText='" + wordText + '\'' +
                ", path='" + imageURI + '\'' +
                ", courseUsedIn='" + courseUsedIn + '\'' +
                '}';
    }
}
