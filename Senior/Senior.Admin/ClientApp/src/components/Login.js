import React from 'react';
import '../style/Login.css';
import { useState } from 'react';
import Logo from'../Assets/Images/Senior_Logo.png';
import toast, { Toaster } from 'react-hot-toast';
import { Home } from './Home';
import {userLogin} from '../Api/SeniorApi'

import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault()
    userLogin(email, password).then((response) => {
   if(response.isSuccess && response.isActive){
    if(response.role==='Admin'){

    
    navigate('/admindashboard');
      toast.success(response.message)
    }
    else if((response.role=='Contractor')){
      navigate('/');
      toast.success(response.message)
    }
     
   }
   else if(!response.isSuccess){
    toast.error(response.message)

   }
   else if(!response.isActive){
    toast.error("User Not Active!")
   }

      console.log(response)
    })
    console.log("123456")
  }
  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
  


        <div className="form">
   
   <div className=" flex-r container">
     <div className="flex-r login-wrapper">
       <div className="login-text">
         <div className="logo">
          
           <img src={Logo}  alt="Logo" className='logoimg'/>
         </div>
         
         
 
         <form className="flex-c" onSubmit={handleSubmit}>
           <div className="input-box">
             <span className="label">E-mail</span>
             <div className=" flex-r input">
               <input 
               name="email"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)} 
               required
               placeholder="name@abc.com"/>
               <i className="fa fa-at"></i>
             </div>
           </div>
 
           <div className="input-box">
             <span className="label">Password</span>
             <div className="flex-r input">
               <input
                 name="password"
                type="password" 
                placeholder="8+ (a, A, 1, #)"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
                />
               <i className="fa fa-lock"></i>
             </div>
           </div>
 
           <div className="check">
             <input type="checkbox" name="" id="" required/>
             <span>I've read and agree with T&C</span>
           </div>
          
 
           <input className="btn" type="submit" value="Sign In"/>
           <p className='mt-2'>Do not have an account? <span className='btn-goto' onClick={()=>navigate('/signup')}>Sign up</span></p>
         </form>
 
       </div>
     </div>
   </div>
 
         </div>
        </>
  );
}

export default Login;
