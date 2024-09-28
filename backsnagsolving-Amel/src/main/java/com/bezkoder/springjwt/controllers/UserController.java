package com.bezkoder.springjwt.controllers;
import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.payload.request.SignupRequest;
import com.bezkoder.springjwt.repository.DomaineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bezkoder.springjwt.DTO.UserDTO;
import com.bezkoder.springjwt.repository.RoleRepository;
import com.bezkoder.springjwt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    DomaineRepository domainerepos ;

    UserService userService;
    RoleRepository roleRepository;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }

    @GetMapping("/AllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = this.userService.getUsers();
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
    }

    @PostMapping("/create")
   //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createUser(@RequestBody UserDTO userDTO) {
        try {
            User user = new User(userDTO.getUsername(), userDTO.getEmail(), userDTO.getPassword());
            int index = userDTO.getEmail().indexOf("@");
            String motApresArobase = userDTO.getEmail().substring(index + 1);
            Domaine d = this.domainerepos.findByName(motApresArobase);
            if (d != null) {
                user.setDomaine(d);
            } else {
                Domaine newd = new Domaine();
                newd.setName(motApresArobase);
                this.domainerepos.save(newd);
                user.setDomaine(newd);
            }
            User savedUser = userService.saveUser(user);

            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/addRole")
    public ResponseEntity<User> addRoleToUser(@RequestParam String username, @RequestParam String roleName) {
        try {
            userService.addRoleToUser(username, roleName);

            User user = userService.getUserByUserName(username);
            if (user == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{username}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        try {
            userService.deleteUser(username);
            return new ResponseEntity<>("User deleted successfully.", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/update/{id}")
//@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        try {
            User updatedUser = userService.updateUser(id, userDTO);

            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<User> getUserProfile(Principal principal) {


        String username = principal.getName();
        System.out.println("Fetching profile for: " + username);
        User user = userService.getUserByUserName(username);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        boolean success = userService.changePassword(request.getCurrentPassword(), request.getNewPassword());

        if (success) {
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error changing password");
        }
    }

}
