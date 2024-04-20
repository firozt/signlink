package com.signlink.DictionaryMapping;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class DictionaryMappingService {
    private final DictionaryMappingRepository dictionaryMappingRepository;

    @Autowired
    public DictionaryMappingService(DictionaryMappingRepository dictionaryMappingRepository) {
        this.dictionaryMappingRepository = dictionaryMappingRepository;
    }

    public void initialiseWithCSVData(String path) {
        List<String[]> csvData = getCSVData(path);
        System.out.println(csvData.size());
        for (String[] row : csvData) {
            // ignore row[0] as it's the ID
            dictionaryMappingRepository.save(new DictionaryMapping(
                    row[1],
                    row[2],
                    Float.valueOf(row[3]),
                    Float.valueOf(row[4]),
                    row[5]
            ));
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

        System.out.println("Got All CSV Data Correctly");
        return csvData;
    }

}
