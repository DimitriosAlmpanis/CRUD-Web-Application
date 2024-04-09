package com.dimitriosalmpanis.crudbackend.service.impl;

import com.dimitriosalmpanis.crudbackend.entity.User;
import com.dimitriosalmpanis.crudbackend.exception.ResourceNotFoundException;
import com.dimitriosalmpanis.crudbackend.mapper.UserMapper;
import com.dimitriosalmpanis.crudbackend.dto.UserDTO;
import com.dimitriosalmpanis.crudbackend.repository.UserRepository;
import com.dimitriosalmpanis.crudbackend.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/*
@Service
The @Service annotation is used to create Spring Beans at the Service layer.
 */
@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        System.out.println("UserServiceImpl - createUser");
        // Convert User DTO to User JPA Entity, in order to save the User Entity inside the database.
        User user = UserMapper.mapToUser(userDTO);

        /*
        Save User Entity inside the database.
        userRepository.save(user) returns the saved entity.
        */

        User createdUser = userRepository.save(user);

        // We need to return savedUser back to the client, so we convert it to User DTO.
        return UserMapper.mapToUserDTO(createdUser);
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("User does not exist with the id: " + userId));
        return UserMapper.mapToUserDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user)-> UserMapper.mapToUserDTO(user))
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(Long userId, UserDTO updatedUserDTO) {
        User user = userRepository.findById(userId).orElseThrow(
                ()-> new ResourceNotFoundException("User does not exist with the id: " + userId));

        user.setFirstname(updatedUserDTO.getFirstname());
        user.setLastname(updatedUserDTO.getLastname());
        user.setGender(updatedUserDTO.getGender());
        user.setBirthdate(updatedUserDTO.getBirthdate());
        user.setHomeaddress(updatedUserDTO.getHomeaddress());
        user.setWorkaddress(updatedUserDTO.getWorkaddress());

        User updatedUser = userRepository.save(user);

        return UserMapper.mapToUserDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                ()-> new ResourceNotFoundException("User does not exist with the id: " + userId)
        );
        userRepository.deleteById(userId);
    }
}
