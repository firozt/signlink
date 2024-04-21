package com.signlink.WordCoursePackage;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table
@Entity
public class Word {
    @Id
    String wordText;
    String path;
    String courseUsedIn;

    public Word() {}

    public Word(String wordText, String path, String courseUsedIn) {
        this.wordText = wordText;
        this.path = path;
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

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "Word{" +
                "wordText='" + wordText + '\'' +
                ", path='" + path + '\'' +
                ", courseUsedIn='" + courseUsedIn + '\'' +
                '}';
    }
}
