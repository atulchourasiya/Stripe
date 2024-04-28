import React from 'react'
import { useNavigate } from 'react-router-dom';

const Thanks = () => {
   const navigate = useNavigate();
  return (
    <div className='d-flex justify-content-center flex-column align-items-center'>
      <img src="/Thanks.webp" alt="" />
      <button className='btn btn-warning' onClick={()=>navigate('/')}>Go to Product Page</button>
    </div>
  )
}

export default Thanks
