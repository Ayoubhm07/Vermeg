package com.bezkoder.springjwt.service;

import com.bezkoder.springjwt.DTO.UserDTO;
import com.bezkoder.springjwt.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user) ;
    User getUserByUserName(String username) ;
    void addRoleToUser(String userName  , String roleName) ;
    List<User> getUsers() ;



    Optional<User> findById(Long id);

    void deleteUser(String username);


    User updateUser(Long id, UserDTO userDTO);

    boolean changePassword(String currentPassword, String newPassword);
}
