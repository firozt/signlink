package com.signlink.WordCoursePackage;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class WordCourseService {
    private final WordRepository wordRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public WordCourseService(WordRepository wordRepository, CourseRepository courseRepository) {
        this.wordRepository = wordRepository;
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourse() {
        return courseRepository.findAll();
    }

    public List<Word> getAllWordsWithCourse(String course) {
        return wordRepository.findByCourseUsedInEquals(course);
    }

    // gets a course given its ID
    public Course getCourse(String courseID) {
        return courseRepository.findById(courseID).orElseThrow();
    }

    public void initialiseDatabaseWithData() {
        initialiseDatabaseWithWordIcons();
        initialiseDatabaseWithCourseIcons();
    }

    private void initialiseDatabaseWithWordIcons() {
        List<String[]> csvData = getCSVData("F:/work-related/signlink/word_icon_paths.csv");
        for (String[] row : csvData) {
            // csv data is in the form
            // word, path, course
            wordRepository.save(
                    new Word(
                            row[0],
                            row[1],
                            row[2]
                    )
            );
        }
    }

    private void initialiseDatabaseWithCourseIcons() {
        String path = "F:/work-related/signlink/course_icon_paths.csv";
        List<String[]> csvData = getCSVData(path);
        // csv data is in the form
        // word, path, course
        for (String[] row : csvData) {
            courseRepository.save(
                    new Course(
                            row[0],
                            row[1],
                            row[2]
                    )
            );
        }
    }

    private List<String[]> getCSVData(String path) {
        String csvFile = path;
        List<String[]> csvData = new ArrayList<>();

        try (CSVReader reader = new CSVReader(new FileReader(csvFile))) {
            String[] nextLine;
            boolean skipFirstLine = true;
            while ((nextLine = reader.readNext()) != null) {
                if (skipFirstLine) {
                    skipFirstLine = false;
                    continue; // Skip the first line which contains column headers
                }
                csvData.add(nextLine);
            }
        } catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }
        return csvData;
    }

    public List<Word> getAllWords() {
        return wordRepository.findAll();
    }
}
