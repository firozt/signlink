package com.signlink.UserPackage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepository extends JpaRepository<Users,String> {
    Users findByEmail(String email);
    Users findByEmailAndPassword(String email, String password);
}
