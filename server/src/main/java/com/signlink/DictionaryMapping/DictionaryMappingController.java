package com.signlink.DictionaryMapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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


    public String init() {
        dictionaryMappingService.initialiseWithCSVData("F:/work-related/signlink/extracted_data.csv");
        return "Done";
    }

    @GetMapping("/getall/{limit}")
    public List<DictionaryMapping> getAllMappingsLimit(@PathVariable Integer limit) {
        // do error checking with limit
        return dictionaryMappingService.getNMappings(limit);
    }

    @GetMapping("/getlike/{query}")
    public List<DictionaryMapping> getAllMappingsQuery(@PathVariable String query) {
        int LIMIT = 15;
        List<DictionaryMapping> res = dictionaryMappingService.getQueriedMappings(query);
        if (res.size() > LIMIT)
            res = res.subList(0,LIMIT);
        return res;
    }
}
