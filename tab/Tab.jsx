import React, { Component } from 'react';
import './style.css';


export default class Tab extends Component{
  constructor(){
    super()
  }
  render(){
    return (
      <p className="content">
       {this.props.children}
      </p>
    )
  }
}

