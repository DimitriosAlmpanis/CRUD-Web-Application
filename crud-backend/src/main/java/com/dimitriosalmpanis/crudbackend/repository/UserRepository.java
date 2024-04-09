package com.dimitriosalmpanis.crudbackend.repository;

import com.dimitriosalmpanis.crudbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/*
public interface JpaRepository<T, ID>
T: Domain type that repository manages (Generally the Entity/Model class name)
ID: Type of the id of the entity that repository manages (Generally the wrapper class of your @Id that is created inside the Entity/Model class)

JpaRepository is a JPA (Java Persistence API) specific extension of Repository.
It contains the full API of CrudRepository and PagingAndSortingRepository.
So it contains API for basic CRUD operations and also API for pagination and sorting.
*/

public interface UserRepository extends JpaRepository<User, Long> {
}
