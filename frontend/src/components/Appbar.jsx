import React from 'react'

const Appbar = ({firstName}) => {
  return (
      <div className='shadow h-14 flex justify-between'>
          <div className='flex flex-col justify-center h-full ml-4'>
              CoinSender App
          </div>
          <div className='flex'>
              <div className='flex flex-col justify-center h-full mr-4'>
                  Hello {firstName}
              </div>
              <div className='rounded-full bg-slate-200 h-12 w-12 flex justify-center mt-1 mr-2'>
                  <div className='flex flex-col justify-center h-full text-xl'>
                   {firstName[0]}
                  </div>
                  
              </div>
              
          </div>
          
    </div>
  )
}

export default Appbar