package com.signlink.DictionaryMapping;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class DictionaryMapping {
    @Id
    private String orgText;
    private String cleanText;
    private float startTime;
    private float endTime;
    private String url;

    /* --------------- Constructors --------------- */

    public DictionaryMapping() {}

    public DictionaryMapping(String orgText, String cleanText, float startTime, float endTime, String url) {
        this.orgText = orgText;
        this.cleanText = cleanText;
        this.startTime = startTime;
        this.endTime = endTime;
        this.url = url;
    }

    /* --------------- Utility Methods --------------- */



    /* --------------- Getter and Setters + Defaults Overrides --------------- */

    public String getOrgText() {
        return orgText;
    }

    public void setOrgText(String orgText) {
        this.orgText = orgText;
    }

    public String getCleanText() {
        return cleanText;
    }

    public void setCleanText(String cleanText) {
        this.cleanText = cleanText;
    }

    public float getStartTime() {
        return startTime;
    }

    public void setStartTime(float startTime) {
        this.startTime = startTime;
    }

    public float getEndTime() {
        return endTime;
    }

    public void setEndTime(float endTime) {
        this.endTime = endTime;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "DictionaryMapping{" +
                "orgText='" + orgText + '\'' +
                ", cleanText='" + cleanText + '\'' +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", url='" + url + '\'' +
                '}';
    }
}
