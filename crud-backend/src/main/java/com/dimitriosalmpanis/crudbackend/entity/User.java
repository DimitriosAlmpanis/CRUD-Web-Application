package com.dimitriosalmpanis.crudbackend.entity;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import jakarta.persistence.*;

import java.time.LocalDate;

/*

@Entity
Entities in JPA are nothing but POJOs (Plain 0ld Java Objects) representing data that can be persisted in the database.
An entity represents a table stored in a database. Every instance of an entity represents a row in the table.

The @Entity annotation specifies that the class is an entity.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

@Table(name = "users")
This annotation specifies the table in the database with which this entity is mapped.

In our case, "users" is the table name in the database.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

@Id
This annotation specifies the primary key of the entity.
Each JPA entity must have a primary key that uniquely identifies it. The @Id annotation defines the primary key.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

@GeneratedValue
This annotation specifies the generation strategies for the values of primary keys:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

@Column
The @Column annotation is used to specify the mapping between a basic entity attribute and the database table column.

The @Column annotation has many elements such as name, length, nullable, and unique.
    name: Specifies the name of the column in the table.
    length: Specifies its length.
    nullable: Specifies whether the column is nullable or not.
    unique: Specifies whether the column is unique.

If we don't specify this annotation, the name of the field will be considered the name of the column in the table.

*/

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(nullable = false)
    private String firstname;

    @Column(nullable = false)
    private String lastname;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private LocalDate birthdate;
    private String homeaddress;
    private String workaddress;

    public User() {
    }

    public User(Long id, String firstname, String lastname, String gender, LocalDate birthdate, String homeaddress, String workaddress) {
        System.out.println("User - Constructor w/ Arguments");
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
