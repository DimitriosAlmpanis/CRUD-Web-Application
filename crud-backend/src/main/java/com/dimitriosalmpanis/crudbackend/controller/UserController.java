package com.dimitriosalmpanis.crudbackend.controller;

import com.dimitriosalmpanis.crudbackend.dto.UserDTO;
import com.dimitriosalmpanis.crudbackend.service.UserService;
import jakarta.servlet.http.PushBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
@CrossOrigin: Enables CORS Configuration (Cross-Origin Resource Sharing).
Essentially we specify which websites are allowed to make requests to out backend application.

In our case, @CrossOrigin("*") means that all origins are allowed.
*/

/*
@RequestController: A convenience annotation that is itself annotated with @Controller and @ResponseBody.
RestController is used for making restful web services with the help of the @RestController annotation.
This annotation is used at the class level and allows the class to handle the requests made by the client.
The RestController allows to handle all REST APIs such as GET, POST, Delete, PUT requests.

Controllers annotated with @RestController do not return views like @Controller;
instead, they return the data directly, which is then serialized into the chosen format and sent as the HTTP response body.

*/

/*
@RequestMapping("api/users/")
At its core, the @RequestMapping annotation is employed to map web requests onto specific handler methods and classes in a controller.
In other words, it’s a guide for Spring to know which method to invoke when a specific URL is accessed.

In our case, the base URI will be "api/users".
 */

/*
ResponseEntity represents the whole HTTP response: status code, headers, and body. As a result, we can use it to fully configure the HTTP response.
*/

/*
@RequestBody
The @RequestBody annotation maps the HttpRequest body to a transfer or domain object,
enabling automatic deserialization of the inbound HttpRequest body onto a Java object.

Spring automatically deserializes the JSON into a Java type, assuming an appropriate one is specified.
By default, the type we annotate with the @RequestBody annotation must correspond to the JSON sent from our client-side controller.

In our case, we receive an HTTP request and convert its body to the java object UserDTO userDTO.
With this we populate the UserDTO's variables with the contents of the HTTP request.
*/

@CrossOrigin("*")
@RestController
@RequestMapping("api/users/")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /*
    Create User REST API
    @PostMapping: Annotation for mapping HTTP POST requests onto specific handler methods.
    We run this method when an HTTP POST request comes to the 'http://localhost:8080/api/users/' URL.
     */
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        System.out.println("~~~~~~~~~~ CREATE USER ~~~~~~~~~~");
        System.out.println("UserController - createUser");
        UserDTO createdUser = userService.createUser(userDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    /*
    Get User REST API
    @GetMapping("{id}"): Annotation for mapping HTTP GET requests onto specific handler methods.
    We run this method when an HTTP GET request comes to the 'http://localhost:8080/api/users/{id}' URL.
     */
    @GetMapping("{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") Long userId) {
        System.out.println("~~~~~~~~~~ GET USER BY ID ~~~~~~~~~~");
        System.out.println("UserController - getUserById");
        UserDTO userDTO = userService.getUserById(userId);
        return ResponseEntity.ok(userDTO);
    }

    /*
    Get All Users REST API
    @GetMapping(): Annotation for mapping HTTP GET requests onto specific handler methods.
    We run this method when an HTTP GET request comes to the 'http://localhost:8080/api/users/' URL.
     */
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        System.out.println("~~~~~~~~~~ GET ALL USERS ~~~~~~~~~~");
        System.out.println("UserController - getAllUsers");
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /*
    Update User REST API
    @PutMapping("{id}"): Annotation for mapping HTTP PUT requests onto specific handler methods.
    We run this method when an HTTP PUT request comes to the 'http://localhost:8080/api/users/{id}' URL.
     */
    @PutMapping("{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable("id") Long userId,@RequestBody UserDTO updatedUserDTO) {
        System.out.println("~~~~~~~~~~ UPDATE USER ~~~~~~~~~~");
        System.out.println("UserController - updateUser");
        UserDTO userDTO = userService.updateUser(userId, updatedUserDTO);
        return ResponseEntity.ok(userDTO);
    }

    /*
    Delete User REST API
    @DeleteMapping("{id}"): Annotation for mapping HTTP DELETE requests onto specific handler methods.
    We run this method when an HTTP DELETE request comes to the 'http://localhost:8080/api/users/{id}' URL.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId) {
        System.out.println("~~~~~~~~~~ DELETE USER ~~~~~~~~~~");
        System.out.println("UserController - deleteUser");
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }
}
