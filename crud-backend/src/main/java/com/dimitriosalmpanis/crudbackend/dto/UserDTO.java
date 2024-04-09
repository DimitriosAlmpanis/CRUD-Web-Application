package com.dimitriosalmpanis.crudbackend.dto;

import java.time.LocalDate;

// Used to transport data between client and server.
public class UserDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private String gender;
    private LocalDate birthdate;
    private String homeaddress;
    private String workaddress;

    public UserDTO() {
    }

    public UserDTO(Long id, String firstname, String lastname, String gender, LocalDate birthdate, String homeaddress, String workaddress) {
        System.out.println("UserDTO - Constructor w/ Arguments");
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.birthdate = birthdate;
        this.homeaddress = homeaddress;
        this.workaddress = workaddress;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getHomeaddress() {
        return homeaddress;
    }

    public void setHomeaddress(String homeaddress) {
        this.homeaddress = homeaddress;
    }

    public String getWorkaddress() {
        return workaddress;
    }

    public void setWorkaddress(String workaddress) {
        this.workaddress = workaddress;
    }
}
