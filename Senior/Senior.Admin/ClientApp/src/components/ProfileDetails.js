import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ProfileDetails() {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    useEffect(() => {
        setfirstName(user.firstName);
        setlastName(user.lastName);
        setGender(user.gender);
        setEmail(user.email);
      },[]);
      const logout = () =>{
        localStorage.removeItem("user")
        navigate('/')
    };
  return (
    <div className="container">
        <h2>My Profile</h2>
    <div className="main-body">
        <div className="row">
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                         
                            <div className="mt-3">
                            <h2>Personal Details</h2>
                                <h4>{user.firstName}  {user.lastName}</h4>
                                <p className="text-secondary mb-1">{user.gender}</p>
                            
                                <p className="text-muted font-size-sm">{user.email}</p>
                                <button className="btn btn-primary" onClick={()=>  navigate('/') }>Home</button>
                            
                            </div>
                        </div>
                      
             
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="card">
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">First Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <p>{firstName}</p>
                             
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Last Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <p>{lastName}</p>
                             
                            </div>
                        
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3">
                                <h6 className="mb-0">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <p>{email}</p>
                             
                            </div>
                        </div>
                        <div className="row mb-3">
                        <div className="col-sm-3">
                                <h6 className="mb-0">Gender</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <p>{gender}</p>
                             
                            </div>
                        </div>
      
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-9 text-secondary">
                                <input type="button" className="btn btn-primary px-4" value="Logout" onClick={()=> logout() }/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
  );
}
