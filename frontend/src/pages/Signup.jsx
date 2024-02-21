import React,{useState} from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Signup = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName,setLastName] =useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate();

  const submithandler = async () => {
  
   const response = await axios.post("https://paytm-tu3l.onrender.com/api/v1/users/signup", {
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
        </div>

      </div>

    </div>
  )
}

export default Signup