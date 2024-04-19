package com.signlink.UserPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean UserExists(String googleID) {
        Optional<Users> query = userRepository.findById(googleID);
        return query.isPresent();
    }

    public void saveNewUser(Users u) {
        u.initialiseDateNow();
        System.out.println(u.getEmail());
        userRepository.save(u);
    }

    public Optional<Users> getUser(String googleId) {
        return userRepository.findById(googleId);
    }
}
