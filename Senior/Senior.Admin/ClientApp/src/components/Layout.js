import React, { Component } from 'react';
import { Container } from 'reactstrap';
import  NavMenu  from '../components/NavMenu';





export default function Layout(props) {
  return (
    <div>
    <NavMenu/>
    <div className='w-100'>
      {props.children}
    </div>
</div>
  );
}








