import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
const Welcome = () => {
    const navigate = useNavigate();

    

  return (
      <div className='flex flex-col  bg-gray-100 justify-center h-screen'>
          <div className='flex flex-col justify-center items-center px-10 py-8 rounded-md '>
              <div className=' bg-white w-346 justify-center items-center px-10 py-8 flex flex-col shadow-lg'>
                  
              <img src='https://images7.alphacoders.com/667/667296.jpg' className='h-60 w-60 rounded-full items-center ' />
              
              <h1 className='p-5 bg-slate-400 rounded-full m-4 '>CoinSender</h1>
 
              
              <div className='flex '>
                  <Button label={"Sign in"} onClick={(e) => navigate('/signin')} />
                  <Button label={"Sign up"} onClick={(e) => navigate('/signup')} />
              </div>

                  
              </div>
            
             
             
              
          </div>

     </div>
  )
}

export default Welcome