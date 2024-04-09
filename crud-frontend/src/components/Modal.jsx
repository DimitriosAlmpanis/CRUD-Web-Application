import React, { useEffect, useState } from 'react'
import { createUser, getUser, updateUser } from '../services/UserService'
import { useNavigate } from 'react-router-dom'

import "./Modal.css"

function Modal(props){
    
    // Create Use State variables out of all the form fields.
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [gender, setGender] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [homeaddress, setHomeaddress] = useState('')
    const [workaddress, setWorkaddress] = useState('')

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
        if(props.id) {
            getUser(props.id).then((response) => {
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
    },[props.id])

    function saveOrUpdateUser(e) {
        // Without this line, when we create/update a user, the page will be refreshed when we press 'Submit'. The user will still be created/updated.
        e.preventDefault();

        if (validateForm()) {

            const user = {firstname,lastname,gender,birthdate,homeaddress,workaddress}
            console.log("Validation - True")
            console.log(user)

            if (props.id) {
                updateUser(props.id, user).then((response) => {
                    console.log(response.data);
                    navigator('/')
                    window.location.reload();
                }).catch((error) => {
                    console.error(error);
                })
            } else {
                createUser(user).then((response) => {
                    console.log(response.data);
                    navigator('/')
                    window.location.reload();
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
        
        if (gender.trim()) {
            errorsCopy.gender = '';
        } else {
            errorsCopy.gender = 'Gender is required.';
            valid = false;
        }

        if (birthdate.trim()) {
            errorsCopy.birthdate = '';
        } else {
            errorsCopy.birthdate = 'Birthdate is required.';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle() {
        if(props.id) {
            return <h2 className='modal-title'>Update User</h2>;
        } else {
            return <h2 className='modal-title'>Create User</h2>;
        }
    }
    
    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <div className='close-button'>
                    <button id='x-btn' onClick={() => props.closeModal(false)}>╳</button>
                </div>
                <div className='modal-titl'>
                    {pageTitle()}
                </div>
                <div className='modal-body'>
                    <form>
                        <div className='name-fields-container'>
                            <input
                            type="text"
                            name='firstname'
                            placeholder='First Name'
                            value={firstname}
                            id = 'firstname-field'
                            className={`form-control ${errors.firstname ? 'is-invalid':''}`}
                            onChange={(e) => setFirstname(e.target.value)}    
                            />

                            <input
                            type="text"
                            name='lastname'
                            placeholder='Last Name'
                            value={lastname}
                            id = 'lastname-field'
                            className={`form-control ${errors.lastname ? 'is-invalid':''}`}
                            onChange={(e) => setLastname(e.target.value)}/>

                            <div className='name-errors-container'>
                                {errors.firstname ? <div className='name-error'>First Name is required.</div> : 
                                <div className='name-error'></div>}

                                {errors.lastname ? <div className='name-error'>Last Name is required.</div> : 
                                <div className='name-error'></div>}
                            </div>
                            
                        </div>
                        <div className='gender-birthdate-fields-container'>
                            <div className='gender-birthdate-labels-container'>
                                <div className='gender-div'>Gender:</div>
                                <div className='birthdate-div'>Birthdate:</div>
                            </div>
                            
                            <select
                            name='gender'
                            value={gender}
                            id = 'gender-field'
                            className={`form-control ${errors.gender ? 'is-invalid':''}`}
                            onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="" disabled hidden></option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>

                            <input
                            type="date"
                            name='birthdate'
                            value={birthdate}
                            id = 'birthdate-field'
                            className={`form-control ${errors.birthdate ? 'is-invalid':''}`}
                            onChange={(e) => setBirthdate(e.target.value)}
                            >
                            </input>

                            <div className='gender-birthdate-errors-container'>
                                {errors.gender ? <div className='gender-birthdate-field-error'>Gender is required.</div> : 
                                <div className='gender-birthdate-field-error'></div>}

                                {errors.birthdate ? <div className='gender-birthdate-field-error'>Birthdate is required.</div> : 
                                <div className='gender-birthdate-field-error'></div>}
                            </div>
                        </div>
                        <div className='address-field-container'>
                            <input
                            type="text"
                            name='homeaddress'
                            placeholder='Home Address'
                            value={homeaddress}
                            id='homeaddress-field'
                            className='form-control'
                            onChange={(e) => setHomeaddress(e.target.value)}
                            >
                            </input>

                            <input
                            type="text"
                            name='workaddress'
                            placeholder='Work Address'
                            value={workaddress}
                            id='workaddress-field'
                            className='form-control'
                            onChange={(e) => setWorkaddress(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className='footer-buttons'>
                            
                            <button className='modal-buttons' id='footerBtnContinue' onClick={saveOrUpdateUser}
                            >Submit</button>
                        </div>
                    </form> 
                </div>
            </div>
        </div>
    )
}

export default Modal