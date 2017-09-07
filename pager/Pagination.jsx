import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      current:this.props.defalutPage,
      total:this.props.total,
      pageSize:this.props.pageSize,
    };
    this.page=Math.ceil(this.state.total/this.state.pageSize)
  }
  shouldComponentUpdate(nextProps,nextState){ //只在需要的时候才render组件，提高性能
    if(typeof this.props.onChange==="function"){
      this.props.onChange(nextState.current,this.page)
    }
    if(nextState.current!=this.state.current){
      return true
    }
    return false
  }
  click(i){
     this.setState({
       current:i
     })
  }
  prev(){
    if(this.state.current>1){
      this.setState({
        current:this.state.current-1
      })
    }
  }
  next(){
    if(this.state.current<this.page){
      this.setState({
        current:this.state.current+1
      })
    }
  }
  getPageHtml(i){
    return  <li className={this.state.current===i?"page currentPage":"page"} onClick={(e)=>this.click(i)}>{i}</li>
  }
  getPrevHtml(){
    return <li  className="nextFive" onClick={()=>this.prev()}>...</li>
  }
  getNextHtml(){
    return <li  className="nextFive" onClick={()=>this.next()}>...</li>
  }
  left(i){
    if(i<=5||i==this.page){
        return this.getPageHtml(i)
    }
    else if(i==this.page-1){
        return this.getNextHtml(i)
    }
  }
  left1(i){
    if(i<=6||i==this.page){
        return this.getPageHtml(i)
    }
    else if(i==this.page-1){
        return this.getNextHtml(i)
    }
  }
  middle(i){
    if(i==1||i==this.page||(i>=this.state.current-2&&i<=this.state.current+2)){
      return this.getPageHtml(i)
    }
    else if(i==2){
      return this.getNextHtml(i)
    }
    else if(i==this.page-1){
      return this.getPrevHtml(i)
    }
    else return ""
  }
  right(i){
    if(i==1||i>=this.page-4){
      return this.getPageHtml(i)
    }
    else if(i==2){
      return this.getPrevHtml(i)
    }
    else return ""
  }
  right1(i){
    if(i==1||i>=this.page-5){
      return this.getPageHtml(i)
    }
    else if(i==2){
      return this.getPrevHtml(i)
    }
    else return ""
  }
  getHtml(i){
    var current=this.state.current
    if(current<4){
      return this.left(i)
    }
    else if(current==4){
      return this.left1(i)
    }
    else if(current<this.page-3){
      return this.middle(i)
    }
    else if(this.state.current==this.page-3){
      return this.right1(i)
    }
    else {
      return this.right(i)
    }
  }
  render() {
    return (
      <div className="pager">
         <ul>
          <li className={this.state.current!=1?"prev":"disable"} onClick={()=>this.prev()}>&lt;</li>
           {
             (new Array(this.page)).fill(0).map((item,i)=>{return (
                this.getHtml(i+1)
             )})
           }
           <li className={this.state.current!=this.page?"next":"disable"} onClick={()=>this.next()}>&gt;</li>
         </ul>
      </div>
    );
  }
}
