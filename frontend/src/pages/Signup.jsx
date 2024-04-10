import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from '../config';
const Signup = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName,setLastName] =useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate();


  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
};

  const submithandler = async () => {

    if (!firstName) {
      toast("Please enter your first name");
      return;
  }
  if (!lastName) {
      toast("Please enter your last name");
      return;
  }
  if (!validateEmail(username)) {
      toast("Please enter a valid email address");
      return;
  }
  if (!password || password.length <= 6) {
      toast("Please enter your password with minmum 6 characters");
      return;
  }
    
    console.log( username,
      firstName,
      lastName,
      password);
  
   const response = await axios.post(`${BACKEND_URL}/api/v1/users/signup`, {
      username,
      firstName,
      lastName,
      password
    })

    localStorage.setItem("token", response.data.token)
    navigate("/dashboard")

  }
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
          onChange={e=> setFirstName(e.target.value)}  label={"First Name"} placeholder={"Murali"} />
          <InputBox
           onChange={e=> setLastName(e.target.value)}   label={"Last Name"} placeholder={"Murugan"} />
          <InputBox
             onChange={e=> setUsername(e.target.value)} label={"Email"} placeholder={"murali@gmail.com"} />
          <InputBox
             onChange={e=> setPassword(e.target.value)} label={"Password"} placeholder={"1234567"} />
          <div className='pt-4'>
            <Button label={"Sign Up"} onClick={submithandler} /> 
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
          <ToastContainer />
        </div>

      </div>

    </div>
  )
}

export default Signup