package com.dimitriosalmpanis.crudbackend.mapper;

import com.dimitriosalmpanis.crudbackend.dto.UserDTO;
import com.dimitriosalmpanis.crudbackend.entity.User;

// Used to map User Entity to UserDTO and UserDTO to User Entity
public class UserMapper {
    public static UserDTO mapToUserDTO(User user) {
        System.out.println("UserMapper - mapToUserDTO");
        return new UserDTO(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getGender(),
                user.getBirthdate(),
                user.getHomeaddress(),
                user.getWorkaddress()
        );
    }

    public static User mapToUser(UserDTO userDTO) {
        System.out.println("UserMapper - mapToUser");
        return new User(
                userDTO.getId(),
                userDTO.getFirstname(),
                userDTO.getLastname(),
                userDTO.getGender(),
                userDTO.getBirthdate(),
                userDTO.getHomeaddress(),
                userDTO.getWorkaddress()
        );
    }
}
