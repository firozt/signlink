package com.signlink.WordCoursePackage;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WordCourseController {
    private final WordCourseService wordCourseService;

    public WordCourseController(WordCourseService wordCourseService) {
        this.wordCourseService = wordCourseService;
    }


    @GetMapping("/words")
    public String rootWords() {
        return "Working";
    }

    @GetMapping("/course")
    public String rootCourse() {
        return "Working";
    }


    // gets all courses (name, path to icon)
    @GetMapping("/course/getall")
    public List<Course> getAllCourses() {
        return wordCourseService.getAllCourse();
    }


    // gets all words specific to a course (path to icon of sign and textual word)
    @GetMapping("/words/getall/{course}")
    public List<Word> getAllWords(@PathVariable String course) {
        return wordCourseService.getAllWordsWithCourse(course);
    }

    @GetMapping("/words/getall")
    public List<Word> getAllWords() {
        return wordCourseService.getAllWords();
    }

    // inits with data
    public void init() {
        wordCourseService.initialiseDatabaseWithData();
    }
}
