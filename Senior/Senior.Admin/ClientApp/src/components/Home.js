import React, { Component } from "react";
import { useState, useEffect } from "react";
import { GetProducts } from "../Api/SeniorApi";
import "../style/Home.css";
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const [products, setproducts] = useState([]);


  const navigate = useNavigate();
  useEffect(() => {
    GetProducts().then((response) => {
      console.log(response);
      if (response) {
        setproducts(response);
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
                <strong><h2>Make Pakistan Proud</h2></strong>

                </p>
              </div>
            </div>


      </div>

      <div className="paralexbody">
      <div className="row text-center py-3">
              <div className="col-lg-6 m-auto  mt-5">
                <h1 className="h1"></h1>
                <p className="Feature-text">
                Ittehad Group has developed an innovative project management system designed to optimize the management of construction projects by effectively tracking and coordinating equipment and labor. Through an array of advanced sensors and management tools, our system provides real-time data on equipment usage and labor productivity. This enables the classification of project status into three categories: on schedule, at risk, and delayed.
                </p>
              </div>
      </div>
        
        <div className="row">
          {products.map(function (data, key) {
            let image = "data:image/jpeg;base64," + data.image;
            return (
              <>
                <div className="prod-card col-12 col-md-4  mt-3 ">
                  <a href="#">
                    <img
                      src={image}
                      className=" prod-img rounded-circle  border  justifycenter"
                    />
                  </a>
                  <h5 className="text-center mt-3 mb-3">{data.productName}</h5>
                  <p className="text-center">
                    <a className="btn btn-success" onClick={()=> navigate('/EquipmentDetails',{state:data})} >Shop Now</a>
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
                At Ittehad Group, we believe in the power of unity and forward-thinking. Our mission is to bring together diverse talents, innovative ideas, and cutting-edge technology to create solutions that drive progress and success in the construction industry. With a commitment to excellence and a passion for innovation, we strive to make a positive impact on every project we undertake.


                </p>
              </div>
            </div>
            <div className="row">
              {products.map(function (data, key) {
                let image = "data:image/jpeg;base64," + data.image;
                return (
                  <>
                    <div className="col-12 col-md-4 mb-4">
                      <div className="card h-100">
                        <a >
                          <img
                            src={image}
                            className="feature-image border h-80 w-80 justifycenter"
                          />
                        </a>
                        <div className="card-body">
                          <ul className="list-unstyled d-flex justify-content-between">
                            <li className="text-muted text-right">${data.price}</li>
                          </ul>
                          <a
                         
                            className="Feature-Name text-decoration-none text-dark"
                          >
                             {data.productName}
                          </a>
                          <p className="card-text">
                          {data.description}
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
      </div>
    </>
  );
}
