import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams,useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

const SendMoney = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const [amount, setAmount] = useState(0);
  const [success, setSuccess] = useState(false)
  const [error,setError] = useState(null)
  const handleSubmit = async () => {


    try {
      
      console.log("Request Payload:", { to: id, amount });
      const response = await axios.post(
      `${BACKEND_URL}/api/v1/accounts/transfer`,
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
          },
        }
      );

      setSuccess(response.data.success);

      
      setTimeout(() => {
        setSuccess(!response.data.success);
        navigate('/dashboard')
      }, 3000);
    } catch (error) {
      console.error("Error during transfer:", error.message);
      setError('Transacation failed');
      setTimeout(() => {
        setError(null);
        navigate('/dashboard')
      }, 3000);
      
     
    }
  };

  return (
    <div className='flex justify-center h-screen bg-gray-100'>
      <div className='h-full flex flex-col justify-center'>
        <div className='border h-min text-card-foreground max-w-md space-y-8 w-96 bg-white shadow-lg rounded-lg'>
          <div className='flex flex-col space-y-1.5 pt-6'>
            <h2 className={`text-3xl font-bold text-center ${success ||error ? 'hidden' : ''}`}>Send Money</h2>
            <h2 className={`text-3xl font-bold text-center ${success || !error ? 'hidden' : ''}`}>Transaction Status</h2>
          </div>
          <div  className= {`p-6 ${success || error ? 'hidden' : ''}`}>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 rounded-full bg-green-500 flex items-center justify-center'>
                <span className='text-2xl text-white'>{name[0].toUpperCase()}</span>
              </div>
              <h3 className='text-2xl font-semibold'>{name}</h3>
            </div>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  htmlFor='amount'
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  type='number'
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  id='amount'
                  placeholder='Enter amount'
                />
              </div>
              <button
                onClick={() => handleSubmit()}
                className='justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white'
              >
                Initiate Transfer
              </button>
            </div>
          </div>
          <div className= {`p-3 ${success==false ? 'hidden' : ''}`}>
            <div className='font-bold text-2xl flex justify-center '>
            <h1>Transaction Scccessfull</h1>
            </div> 
            <div className='flex justify-center flex-row w-full'>
            
            <img src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnmzaG2a1aPl-TX1CVNkQQe6fXdPo5qo0bKrfXdB40cRMRDwuu7xf2Fi1-M7Xo-7EI9lQ&usqp=CAU'  />
            </div>

          </div>
          <div className= {`p-3 ${ !error ? 'hidden' : ''}`}>
            <div className='font-bold text-2xl flex justify-center '>
              <h1>{error}</h1>
            </div> 
            <div className='flex justify-center flex-row w-full'>
            
            <img src ='https://printme.online/wp-content/uploads/2020/04/payment_fail_icon.png'  />
            </div>

          </div>
        </div>
       
      </div>
    </div>
  );
};

export default SendMoney;
