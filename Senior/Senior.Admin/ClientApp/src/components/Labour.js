import React, { Component } from "react";
import { useState, useEffect } from "react";
import { GetLabour } from "../Api/SeniorApi";
import "../style/Equipment.css";
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const [Labours, setLabours] = useState([]);


  const navigate = useNavigate();
  useEffect(() => {
    GetLabour().then((response) => {
      console.log(response);
      if (response) {
        setLabours(response);
      }
    });
 
  }, []);

 
  return (
    <>


      <div className="parallax">

      <div className="main-header row text-center  ">
              <div className="col-lg-6 m-auto ">
                <h1 className="h1" id="paralex-text-heading"></h1>
                <p className="Feature-text">
                <strong><h1>Ittehad Group</h1></strong>

                </p>
              </div>
            </div>


      </div>

     
        
        <div className="row">
          {Labours.map(function (data, key) {
            
            return (
              <>
                <div className="prod-card col-12 col-md-4  mt-3 ">
                  
                  <h5 className="text-center mt-3 mb-3">{data.firstName}</h5>
                  <p className="text-center">
                    <a className="btn btn-success" onClick={()=> navigate('/productdetail',{state:data})} >Appoint Now</a>
                  </p>
                </div>
              </>
            );
          })}
        </div>
    
        <section className="bg-light">
          <div className="container ">
            <div className="product-header row text-center py-3">
              <div className="col-lg-6 m-auto">
                <h1 className="h1"></h1>
                <p className="Feature-text">
               Equipment
                </p>
              </div>
            </div>
            <div className="row">
              {Labours.map(function (data, key) {
                
                return (
                  <>
                    <div className="col-12 col-md-4 mb-4">
                      <div className="card h-100">
                        
                        
                        <div className="card-body">
                          <ul className="list-unstyled d-flex justify-content-between">
                            <li className="text-muted text-right">${data.firstName}</li>
                          </ul>
                          <a
                         
                            className="Feature-Name text-decoration-none text-dark"
                          >
                             {data.speciality}
                          </a>
                          <p className="card-text">
                          {data.phnumber}
                          </p>
                          <p className="text-muted">Reviews (24)</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="bg-dark" id="tempaltemo_footer">
<div className="container">
    <div className="row">

        <div className="col-md-6 pt-5">
            <h2 className="h2  border-bottom pb-3 border-light " id="logo-txt">Ittehad Group</h2>
            <ul className="list-unstyled text-light footer-link-list">
                <li>
                    <i className="fas fa-map-marker-alt fa-fw"></i>
                    
                </li>
                <li>
                    <i className="fa fa-phone fa-fw"></i>
                    <a className="text-decoration-none" href="tel:010-020-0340">+39 02 96416710</a>
                </li>
                  <li>
                    <i className="fa fa-phone fa-fw"></i>
                    <a className="text-decoration-none" href="tel:010-020-0340">+39 02 96416711</a>
                </li>
             
            </ul>
        </div>

        <div className="col-md-6 pt-5">
            <h2 className="h2 text-light border-bottom pb-3 border-light">Products</h2>
            <ul className="list-unstyled text-light footer-link-list">
                <li><a className="text-decoration-none" href="#">Crawler Excavator</a></li>
                <li><a className="text-decoration-none" href="#">CAT Bulldozer Dozer</a></li>
                <li><a className="text-decoration-none" href="#">Transportation Trucks</a></li>
            
            </ul>
        </div>



    </div>

    <div className="row text-light mb-4">
        <div className="col-12 mb-3">
            <div className="w-100 my-3 border-top border-light"></div>
        </div>
        <div className="col-auto me-auto">
            <ul className="list-inline text-left footer-icons">
                <li className="list-inline-item border border-light rounded-circle text-center">
                    <a className="text-light text-decoration-none" target="_blank" href="http://facebook.com/"><i className="fa fa-facebook-f fa-lg fa-fw"></i></a>
                </li>
                <li className="list-inline-item border border-light rounded-circle text-center">
                    <a className="text-light text-decoration-none" target="_blank" href="https://www.instagram.com/"><i className="fa fa-instagram fa-lg fa-fw"></i></a>
                </li>
                <li className="list-inline-item border border-light rounded-circle text-center">
                    <a className="text-light text-decoration-none" target="_blank" href="https://twitter.com/"><i className="fa fa-twitter fa-lg fa-fw"></i></a>
                </li>
                <li className="list-inline-item border border-light rounded-circle text-center">
                    <a className="text-light text-decoration-none" target="_blank" href="https://www.linkedin.com/"><i className="fa fa-linkedin fa-lg fa-fw"></i></a>
                </li>
            </ul>
        </div>
        <div className="col-auto">
            <label className="sr-only" for="subscribeEmail">Email address</label>
            <div className="input-group mb-2">
                <input type="text" className="form-control bg-dark border-light" id="subscribeEmail" placeholder="Email address"/>
                <div className="input-group-text btn-success text-light">Subscribe</div>
            </div>
        </div>
    </div>
</div>

<div className="w-100 bg-black py-3">
    <div className="container">
        <div className="row pt-2">
            <div className="col-12">
                <p className="footer-coprright-text text-left text-light">
                    Copyright &copy; 2022 FYP Project
                    | Designed by <a rel="sponsored" target="_blank">Zohaib Ali & Iqra Zainab</a>
                </p>
            </div>
        </div>
    </div>
</div>

</footer>
      
    </>
  );
}
