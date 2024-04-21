package com.signlink.DictionaryMapping;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DictionaryMappingRepository extends JpaRepository<DictionaryMapping, String> {
    List<DictionaryMapping> findByCleanTextContaining(String query);
}
