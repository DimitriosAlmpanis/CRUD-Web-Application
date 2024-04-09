import React, { useEffect, useState } from 'react'
import { createUser, getUser, updateUser } from '../services/UserService'
import { useNavigate, useParams } from 'react-router-dom'

import "./UserAdd.css"

function UserAdd() {

    // Create Use State variables out of all the form fields.
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [homeaddress, setHomeaddress] = useState('')
    const [workaddress, setWorkaddress] = useState('')

    // Get the userID from the URL.
    const {id} = useParams();

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        birthdate: '',
        homeaddress: '',
        workaddress: ''
    })

    const navigator = useNavigate();

    /*
    We use useEffect to populate the form fields.
    Initially they are empty, then we change their values and when the function ends a render occurs to display the new values.
    */
    useEffect(() => {
        if(id) {
            getUser(id).then((response) => {
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setGender(response.data.gender);
                setBirthdate(response.data.birthdate);
                setHomeaddress(response.data.homeaddress);
                setWorkaddress(response.data.workaddress);
            }).catch(error => {
                console.error(error);
            })
        }
    },[id])

    function saveOrUpdateUser(e) {
        // Without this line, when we create/update a user, the page will be refreshed when we press 'Submit'. The user will still be created/updated.
        e.preventDefault();

        if (validateForm()) {

            const user = {firstname,lastname,gender,birthdate,homeaddress,workaddress}
            console.log(user)

            if (id) {
                updateUser(id, user).then((response) => {
                    console.log(response.data);
                    navigator('/');
                }).catch((error) => {
                    console.error(error);
                })
            } else {
                createUser(user).then((response) => {
                    console.log(response.data);
                    navigator('/');
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = {... errors};

        // trim: removes whitespaces from both ends of the string.
        if (firstname.trim()) {
            errorsCopy.firstname = '';
        } else {
            errorsCopy.firstname = 'First Name is required.';
            valid = false;
        }

        if (lastname.trim()) {
            errorsCopy.lastname = '';
        } else {
            errorsCopy.lastname = 'Last Name is required.';
            valid = false;
        }

        if (firstname.trim()) {
            errorsCopy.gender = '';
        } else {
            errorsCopy.gender = 'Gender is required.';
            valid = false;
        }

        if (firstname.trim()) {
            errorsCopy.birthdate = '';
        } else {
            errorsCopy.birthdate = 'Birthdate is required.';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle() {
        if(id) {
            return <h2 className='text-center'>Update User</h2>;
        } else {
            return <h2 className='text-center'>Create User</h2>;
        }
    }

    return (
        <section className='container add-user-container'>
            <div className='add-user-card'>
                <div className='add-user-div'>
                    {
                        pageTitle()
                    }
                    <div className='add-user-form card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                type="text"
                                placeholder='Enter User First Name'
                                name='firstname'
                                value={firstname}
                                className={`form-control ${errors.firstname ? 'is-invalid':''}`}
                                onChange={(e) => setFirstname(e.target.value)}
                                >
                                </input>
                                {errors.firstname && <div className='invalid-feedback'> {errors.firstname} </div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                type="text"
                                placeholder='Enter User Last Name'
                                name='lastname'
                                value={lastname}
                                className={`form-control ${errors.lastname ? 'is-invalid':''}`}
                                onChange={(e) => setLastname(e.target.value)}
                                >
                                </input>
                                {errors.lastname && <div className='invalid-feedback'> {errors.lastname} </div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Gender:</label>
                                <select
                                name='gender'
                                value={gender}
                                className={`form-control ${errors.gender ? 'is-invalid':''}`}
                                onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="" disabled hidden></option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                {errors.gender && <div className='invalid-feedback'> {errors.gender} </div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Birthdate:</label>
                                <input
                                type="date"
                                placeholder='Enter User Birthdate'
                                name='birthdate'
                                value={birthdate}
                                className={`form-control ${errors.birthdate ? 'is-invalid':''}`}
                                onChange={(e) => setBirthdate(e.target.value)}
                                >
                                </input>
                                {errors.birthdate && <div className='invalid-feedback'> {errors.birthdate} </div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Home Address:</label>
                                <input
                                type="text"
                                placeholder='Enter User Home Address'
                                name='homeaddress'
                                value={homeaddress}
                                className='form-control'
                                onChange={(e) => setHomeaddress(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Work Address:</label>
                                <input
                                type="text"
                                placeholder='Enter User Work Address'
                                name='workaddress'
                                value={workaddress}
                                className='form-control'
                                onChange={(e) => setWorkaddress(e.target.value)}
                                >
                                </input>
                            </div>
                            <div id='submit-container'>
                                <button
                                className='create-btn'
                                id='submitBtn'
                                onClick={saveOrUpdateUser}
                                >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserAdd