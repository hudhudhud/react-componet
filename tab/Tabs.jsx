import React, { Component } from 'react';
import  Tab from './Tab.jsx';
import './style.css';

export default class Tabs extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: 0,
    }
  }
  getContent(i){
    this.setState({
      currentTab:i
    })
  }
  render() {
    return (
      <div className="tabs">
         <ul >
            {this.props.children.map((item,i)=>{
                return (
                  <li key={i} className={this.state.currentTab==i?"tab current-tab":"tab"} onClick={()=>this.getContent(i)}>{item.props.name}</li>
                )
            })}
         </ul>
         <div>{this.props.children[this.state.currentTab]}</div>
      </div>
    );
  }
}