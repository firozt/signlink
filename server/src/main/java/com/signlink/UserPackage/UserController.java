package com.signlink.UserPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="/users")
//@RequestMapping()
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getall")
    public List<Users> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/get_info/{googleId}")
    public Optional<Users> getUserInfo(@PathVariable String googleId) {
        return userService.getUser(googleId);
    }

    @PostMapping("/save")
    public String saveUser(@RequestBody Users u) {
        // this can only be done by google logins, only email check
        String id = userService.UserExists(u.getEmail());
        if (id != "") return id; // user already exists
        userService.saveNewUser(u); // save new user
        return userService.getUserByEmail(u.getEmail()).getID(); // cant fail

    }


    // returns true of all went well, else false
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Users u) {
        if (u == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad input");
        }
        String userid = userService.registerUser(u);
        System.out.println(userid);
        if (userid != "") {
            return ResponseEntity.ok(userid);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists or invalid input");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Users u) {
        if (u.getEmail().isEmpty() || u.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad input");
        }
        String userID = userService.loginUser(u);
        if (userID!=""){
            return ResponseEntity.ok(userID); // return id back
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid credentials");
        }
    }

}
