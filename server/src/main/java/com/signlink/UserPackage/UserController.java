package com.signlink.UserPackage;

import org.springframework.beans.factory.annotation.Autowired;
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
    public void saveUser(@RequestBody Users u) {
//        Check if user is already saved
//        If true, do nothing
//        If false, add to database
        if (userService.UserExists(u.getGoogleID())) return;
        userService.saveNewUser(u);
    }

}
