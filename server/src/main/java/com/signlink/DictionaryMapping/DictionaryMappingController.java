package com.signlink.DictionaryMapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping(path = "/dictionary")
public class DictionaryMappingController {
    private final DictionaryMappingService dictionaryMappingService;

    @Autowired
    public DictionaryMappingController(DictionaryMappingService dictionaryMappingService) {
        this.dictionaryMappingService = dictionaryMappingService;
    }

    @GetMapping("/")
    public String root() {
        return "dictionary working";
    }

    @GetMapping("/init")
    public String init() {
        dictionaryMappingService.initialiseWithCSVData("F:/work-related/signlink/extracted_data.csv");

        return "Done";
    }
}
