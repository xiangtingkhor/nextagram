import React, {useState} from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import axios from 'axios';
import {toast} from 'react-toastify';


function ModalForm() {
    //isModalOpen is set to false at the start so that the modal will only open when the "open" button is pressed
    const [isModalOpen, changeModalState] = useState(false)
    //isLogin is set to true so that when you open modal it always return the login page first. Then if it is false it will change run other line of code
    const [isLogin, changeLogin] = useState(true)
    //To make modal open up
    const modalClick = () => {
        changeModalState(!isModalOpen)
    } 
    //To allow a button to change forms
    const formClick = () => {
        changeLogin(!isLogin)
    }

    //for the password and username
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [delay, setDelay] = useState(null);
    const [usernameValid, setUsernameValid] = useState(false);

    const usernameLogin = (e) => {
        setUsername (e.target.value)
    }

    const passwordChange = (e) => {
        setPassword (e.target.value)
    }

    const emailChange = (e) => {
        setEmail (e.target.value)
    }

    
    const checkUsername = newUsername => {
        axios.get(
            `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
        )
        .then(response => {
            if(response.data.valid) {
                setUsernameValid(true);
            } else {
                setUsernameValid(false);
            }
        })
    }
    
    const usernameChange = (e) => {
        clearTimeout(delay);
        const newUsername = e.target.value;
        setUsername(newUsername);

    const newDelay = setTimeout(() => {
        checkUsername(newUsername);
      }, 500);
  
      setDelay(newDelay);
    };




        //trim is to remove any empty spaces
        //push is a method to add new items to the end of an array, and returns the new length.
    const handleSubmit = (e) => {
        e.preventDefault()
        
        let errors = []
        if (username.trim() === "") {
            errors.push("Username can't be empty")
        }
        if (username.length < 6) {
            errors.push("Username too short")
        }
        if (password.trim() === "") {
            errors.push("Password can't be empty")
        }
        if (errors.length) {
            toast.warn(errors.join(","), {
                position: "top-center"
            })
        }
        else {
            axios({
                headers:{'Content-Type': 'application/json'},
                url:"https://insta.nextacademy.com/api/v1/login",
                method:"POST",
                data: {
                    "username": username, //key of data is exactly the same as the documentitation then can just put username
                    "password": password,
                }
            })
                .then ((response) => {
                    console.log(response)
                    localStorage.setItem("token", response.data.auth_token)

                    changeModalState(false)
                    toast("Welcome back!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
            }).catch(err => console.log(err.response))
            //checks in more detail on the error you receive
            
            }     
        }

        const handleSignUp = () => {
            let errors = []
            if (username.trim() === "") {
                errors.push("Username can't be empty")
            }
            if (username.length < 6) {
                errors.push("Username too short")
            }
            if (password.trim() === "") {
                errors.push("Password can't be empty")
            }
            if (email.trim() === "") {
                errors.push("Email can't be empty")
            }
            if (errors.length) {
                toast.warn(errors.join(","), {
                    position: "top-center"
                })
            }
            else {
                axios({
                    headers:{'Content-Type': 'application/json'},
                    url:"https://insta.nextacademy.com/api/v1/users/",
                    method:"POST",
                    data: {
                        "username": username,
                        "email": email,
                        "password": password,                 
                    }
                })
                    .then ((response) => {
                        changeModalState(false)
                        toast("Welcome to Nextagram!", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                }).catch(err => console.log(err.response))
                
                }  
    
            }
    

    return (
        <div>

            <button onClick={modalClick}>Get started!</button>
            <Modal isOpen={isModalOpen} >
                {
                    isLogin ? //isLogin is true so the true code will run first
                        (

                            <>
                               <ModalHeader>Sign In</ModalHeader>
                                <ModalBody>
                                    <Form>
                                        <FormGroup>
                                            <Label>Username</Label>
                                            <Input value={username} onChange={usernameLogin} type="text" placeholder="username"/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Password</Label>
                                            <Input onChange={passwordChange} value={password} type="password" placeholder="password123" />
                                        </FormGroup>
                         
                                        {
                                        localStorage.getItem("token")

                                        ? 
                                        //to set login and log out
                                        <button onClick={() => {
                                        localStorage.removeItem("token");
                                            toast("Have a good day!", {
                                                position: "top-right",
                                                autoClose: 3000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                            })
                                         }}>Sign Out</button>
                                         
                                         :
                                        <Button onClick={handleSubmit} color="success">Login</Button>
                                        }
                                       
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={formClick}>Sign Up</Button>{' '}
                                    <Button color="secondary" onClick={() => {modalClick(); formClick()}}>Cancel</Button>
                                </ModalFooter> 
                                
                            </>
                        )
                        : //when isLogin is false then the false code will run
                        (
                            <>
                            <ModalHeader>New User</ModalHeader>
                                <ModalBody>
                                    <Form>

                                        <FormGroup>
                                            <Label>Username</Label>
                                            <Input valid={usernameValid} invalid={!usernameValid} onChange={usernameChange} value={username} type="text" placeholder="username" />
                                            {
                                                usernameValid
                                                    ? <FormFeedback valid>This is perfect!</FormFeedback>
                                                    : <FormFeedback invalid>This username is taken!</FormFeedback>
                                            }
                                        </FormGroup>

                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Input onChange={emailChange} value={email} type="email" placeholder="john@yahoo.com" />
                                        </FormGroup>
                                
                                        <FormGroup>
                                            <Label>Create a Password</Label>
                                            <Input onChange={passwordChange} value={password} type="password" placeholder="password123" />
                                        </FormGroup>

                                        <Button color="success"onClick={handleSignUp}>Create Your Account</Button>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={formClick}>Sign In</Button>{' '}
                                    <Button color="secondary" onClick={modalClick}>Cancel</Button>
                                </ModalFooter>
                                
                            </>
                        )
                }
            </Modal>
        </div>
    )
    }

export default ModalForm;