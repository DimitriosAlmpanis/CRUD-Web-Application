import React, { useEffect } from 'react'
import { useState } from 'react'
import { deleteUser, listUsers } from '../services/UserService'
import { useNavigate } from 'react-router-dom'

import Modal from './Modal'

import bin from '../assets/bin.svg'
import edit from '../assets/edit.svg'

function UserList() {
    
    /*
    const [state, setState] = useState(initialState)
    state: Variable name (const users)
    setState: The function that will change the state.
    initialState: The initial value of the variable.

    In our case, we initialize an empty list named 'users' and whenever a change occurs (a user being added or removed) we render again.
    Inside this list, we store response.data that are aquired via the axios get function.
    */
    const [users, setUsers] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [updateId, setUpdateId] =  useState(null)

    /*
    The navigator is used to change to different pages.
    */
    const navigator = useNavigate();

    function addNewUser() {
        navigator('/create-user')
    }

    function updateUser(id) {
        navigator(`/edit-user/${id}`)
    }

    /*
    This function adds all the users we fetch from the axios get function inside the empty list.
    */
    function getAllUsers() {
        listUsers().then((response) => {
            setUsers(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    /*
    The useEffect Hook runs a function every time we render.
    The useEffect Hook allows you to perform side effects in your components.
    Some examples of side effects are: fetching data, directly updating the DOM, and timers.

    useEffect(setup, dependencies?) 

    1st Parameter: Callback function
    In our case:
        listUsers(): axios.get()
    2nd Parameter: Dependency list (optional)

    No dependencies, so we pass an empty array.

    In our case, every time a render occurs(once initially and when a useState variable changes), we run the function getAllUsers.
    */
    useEffect(() => {
        getAllUsers();
    },[])

    function removeUser(id) {
        console.log("Removing use with ID: " + id);
        deleteUser(id).then(() => {
            getAllUsers();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <section className='container'>
            <h2 className='title'>Users</h2>
            <button
            className='create-btn'
            id='createBtnNP'
            onClick={addNewUser}
            >Create User (New Page)
            </button>
            
            <button
            className='create-btn'
            id='createBtnModal'
            onClick={() =>{
                setOpenModal(true)
                setUpdateId(null)
            }}>Create User (Modal)</button>
            {openModal && <Modal id={updateId} closeModal={setOpenModal}/>}

            <table className='table table-bordered'>
                <thead>
                    <tr id='table-headers'>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Birthdate</th>
                        <th>Home Address</th>
                        <th>Work Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.gender}</td>
                                <td>{user.birthdate}</td>
                                <td>{user.homeaddress}</td>
                                <td>{user.workaddress}</td>
                                <td id='actions-field'>
                                    <div id='actions'>
                                        <img id='edit-hidden' src={edit} alt="Update" onClick={() => updateUser(user.id)} />
                                        <img id='edit'
                                        src={edit}
                                        alt="Update"
                                        onClick={() => {
                                            setOpenModal(true)
                                            setUpdateId(user.id)
                                        }}/>
                                        
                                        <img id='bin' src={bin} alt="Delete" onClick={() => removeUser(user.id)} />
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </section>
    )
}

export default UserList