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

    public String UserExists(String email) {
        Users query = userRepository.findByEmail(email);
        if (query == null) {
            return "";
        }
        return query.getID();
    }

    public Users getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public void saveNewUser(Users u) {
        u.initialiseDateNow();
        System.out.println(u.getID());
        userRepository.save(u);
    }

    public String registerUser(Users u) {
        // check if email is valid
        if (!validEmail(u.getEmail())) {
            return "";
        }

        // check if users email exists already if so, invalid
        Users res = userRepository.findByEmail(u.getEmail());
        if (res != null) {
            return ""; // cannot add user
        }

        // valid credentials
        // register user
        u.initialiseDateNow();
        saveNewUser(u);
        return userRepository.findByEmail(u.getEmail()).getID();

    }

    public boolean validEmail(String email) {
        // null checks
        if (email == null || email == "") {
            return false;
        }

        int atIndex = email.indexOf('@');
        int dotIndex = email.lastIndexOf('.');

        if (atIndex <= 0 || dotIndex <= atIndex || dotIndex == email.length() - 1) {
            return false;
        }

        // checks that  before '@' only contains valid characters
        String localPart = email.substring(0, atIndex);
        for (char c : localPart.toCharArray()) {
            if (!Character.isLetterOrDigit(c) && c != '.' && c != '_' && c != '-') {
                return false;
            }
        }

        // do the same after the '@'
        String domainPart = email.substring(atIndex + 1);
        for (char c : domainPart.toCharArray()) {
            if (!Character.isLetterOrDigit(c) && c != '.' && c != '-') {
                return false;
            }
        }

        return true;
    }

    public Optional<Users> getUser(String googleId) {
        return userRepository.findById(googleId);
    }

    // logs in user, returns id if everything went okay else false
    public String loginUser(Users u) {
        Users res = userRepository.findByEmailAndPassword(u.getEmail(), u.getPassword());
        if (res == null) return "";
        return res.getID();
    }
}
