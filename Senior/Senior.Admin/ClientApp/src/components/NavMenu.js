import React from 'react';
import '../style/navbar.css'


import { useState,useEffect } from "react";
import Logo from'../Assets/Images/Senior_Logo.png';
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from 'react-router-dom';
const NavMenu = () => {
    const [sidenav, setSidenav] = useState("collapse");
    const [checklogin, setChecklogin] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        
       if(user===null){
        setChecklogin(false)
       }
       else{
        setChecklogin(true)
       }
      }, [user]);
    
    const login = (event) => {
        
       if(!checklogin){
        navigate('/login');
       }
       else{
if(user.role==='Admin'){
    navigate('/admindashboard');
 
}
else if(user.role==='Customer'){
    navigate('/profile'); 
   
}
       }

      }

      const SidebarHandler = () => {
        if (sidenav == "accordion") {
          setSidenav("collapse");
        } else {
          setSidenav("accordion");
        }
      };
  return (
    <>

  
    <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container  justify-content-between align-items-center">

         
            <img src={Logo}  alt="Logo" className='logoimg' onClick={()=>navigate('/')}/>
            

            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                <div className="flex-fill">
                    <ul className="nav navbar-nav d-flex  mx-lg-auto ml-5">
                        <li className="nav-item " >
                            <a className="nav-link" onClick={()=>navigate('/')}>Home</a>
                        </li>
                      
                        <li className="nav-item " >
                            <a className="nav-link" onClick={()=>navigate('/Labour')}>Resourses</a>
                        </li>
                       
                        {checklogin&&(  <li className="nav-item">
                            <a className="nav-link" onClick={()=>navigate('/Request')}>Request</a>
                        </li>)}

                        
                        
                  </ul>
                </div>
                <div className="navbar align-self-center d-flex">
                    {user!=null&&(
                        <a className="nav-icon position-relative text-decoration-none" onClick={()=>navigate('/profile')}>
                        <p className="text-dark  mt-3">Welcome! <strong>{user.firstName} {user.lastName}</strong></p>
                    </a>
                    )}
                
                
                    <a className="nav-icon position-relative text-decoration-none" onClick={()=>login()}>
                        <i className="fa fa-fw fa-user text-dark mr-3"></i>
                    </a>
                </div>
            </div>

        </div>
    </nav>
    </>
  );
}

export default NavMenu;

