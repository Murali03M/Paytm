import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { BACKEND_URL } from "../config"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../components/Spinner"
export const Signin = ({ }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(username)) {
      toast("Please enter a valid email address");
      return;
    }
    if (!password || password.length <= 6) {
      toast("Please enter your password with minimum 6 characters");
      return;
    }

    setLoading(true); 

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/users/signin`, {
        username,
        password
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      toast('Please enter correct details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => setUsername(e.target.value)} placeholder="murali@gmail.com" label={"Email"} />
          <InputBox
            onChange={(e) => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
          <div className="pt-4">
            {loading ? ( 
              <Spinner />
            ) : (
              <Button label={"Sign in"} onClick={(e) => submitHandler(e)} />
            )}
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
