package com.signlink.DictionaryMapping;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DictionaryMappingRepository extends JpaRepository<DictionaryMapping, String> {
}
