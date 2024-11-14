import React, { Component } from "react";
import { useState, useEffect } from "react";
import { GetProducts } from "../Api/SeniorApi";
import "../style/Home.css";
import CEOImage from "../Assets/Images/CEO.jpeg"
import { useNavigate } from 'react-router-dom';


export default function Home() {
  

 
  return (
    <>


      <div className="parallax">

      <div className="main-header row text-center  ">
              <div className="col-lg-6 m-auto ">
                <h1 className="h1" id="paralex-text-heading"></h1>
                <p className="Feature-text">
                <strong><h1>Ittehad Group</h1></strong>
                <strong><h2>Make Pakistan Proud</h2></strong>

                </p>
              </div>
            </div>


      </div>
      <section className="bg-light">
      <div class="container ceo-section">
  <div class="row">
    
    <div class="col-md-6 ceo-photo">
      <img src={CEOImage} alt="CEO Photo"/>
      <div class="ceo-badge">CEO Abid Hussain</div>
    </div>
    
    <div class="col-md-6">
      <p class="ceo-heading">Our CEO Message About Company Profile</p>
      <h4 class="ceo-title">CEO Message</h4>
      <p class="ceo-message">As a leader in the construction industry, our mission is to build with precision, integrity, and a commitment to excellence. We take pride in transforming visions into tangible structures that stand the test of time, contributing to the growth and development of the communities we serve.</p>
      <p class="ceo-message">At Ittehad Group, we are more than just builders—we are partners in creating sustainable and innovative solutions that meet the evolving needs of our clients. From infrastructure projects to residential and commercial developments, our dedication to quality, safety, and efficiency drives every project we undertake.</p>
      <p class="ceo-message">Thank you for your interest in Ittehad Group. Together, let’s build a future that reflects strength, resilience, and progress.</p>
      <h4 class="ceo-tag">- Abid Hussain, CEO, Ittehad Group</h4>
    </div>
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
