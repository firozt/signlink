package com.signlink.WordCoursePackage;

import com.signlink.DictionaryMapping.DictionaryMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, String> {
//    List<Word> findByCourseUsedIn(String courseUsedIn);
    List<Word> findByCourseUsedInEquals(String courseUsedIn);
}
