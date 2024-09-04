import React from "react";
import "../style/signup.css";
import { useState } from "react";
import Logo from "../Assets/Images/Senior_Logo.png";
import toast, { Toaster } from "react-hot-toast";
import { Home } from "./Home";
import { RegisterUser } from "../Api/SeniorApi";
import { useNavigate } from "react-router-dom";
import { User } from "oidc-client";
export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
 
  const handleSubmit = (event) => {
    event.preventDefault();
    if(password!=confirmPassword){
        toast.error("Passwords do not match")
    }
    else{
   
          RegisterUser(firstName,lastName,email,password,gender).then((response) => {
            if(response.isRequestSuccessful){
            
         
             
             navigate('/login');
               toast.success("Sign up Successful!")
           
              
            }
            else if(!response.isRequestSuccessful){
             toast.error(response.successResponse)
         
            }
           
         
               console.log(response)
             })

    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="form">
        <div className=" flex-r container">
          <div className="flex-r login-wrapper">
            <div className="login-text">
              <div className="logo">
                <img src={Logo} alt="Logo" className="logoimg" />
              </div>

              <form className="flex-c" onSubmit={handleSubmit}>
                <div className="input-box">
                  <span className="label">First-Name</span>
                  <div className=" flex-r input">
                    <input
                      name="firstName"
                      type="text"
                      maxlength="100"
                      value={firstName}
                      onChange={(e) => setfirstName(e.target.value)}
                      required
                      placeholder="e.g John"
                    />
                   
                  </div>
                </div>
                <div className="input-box">
                  <span className="label">Last-Name</span>
                  <div className=" flex-r input">
                    <input
                      name="lastName"
                      type="text"
                      maxlength="100"
                      value={lastName}
                      onChange={(e) => setlastName(e.target.value)}
                      required
                      placeholder="e.g Doe"
                    />
                   
                  </div>
                </div>
                <div className="input-box">
                  <span className="label">E-mail</span>
                  <div className=" flex-r input">
                    <input
                      name="email"
                      type="email"
                      maxlength="256"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@abc.com"
                    />
                  
                  </div>
                </div>

                <div className="input-box">
                  <span className="label">Password</span>
                  <div className="flex-r input">
                    <input
                      name="password"
                      type="password"
                      minlength="8"
                      placeholder="8+ (a, A, 1, #)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                   
                  </div>
                </div>
                <div className="input-box">
                  <span className="label">Confirm Password</span>
                  <div className="flex-r input">
                    <input
                      name="confirmPassword"
                      type="password"
                      minlength="8"
                      placeholder="8+ (a, A, 1, #)"
                      value={confirmPassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      required
                    />
              
                  </div>
                </div>

                <div className="input-box">
                  <span className="label">Gender</span>

                  <div className=" flex-r input">
                    <select
                      className="form-select w-100"
                      aria-label="Default select example"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option selected>Click here to select.</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>

                   
                  </div>
                </div>
                <div className="check">
                  <input type="checkbox" name="" id="" required />
                  <span>I've read and agree with T&C</span>
                </div>

                <input className="btn" type="submit" value="Sign Up" />
                <p className='mt-2'>Already have an account? <span className='btn-goto' onClick={()=>navigate('/login')}>Sign In</span></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
