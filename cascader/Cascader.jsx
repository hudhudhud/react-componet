import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

export default class Cascader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: props.placeholder,
      options:props.options,
      inputVal:"",
      show:false,
    };
    this.preOpt={}
   
  }
  componentDidMount(){
      document.onclick=this.hide.bind(this)
  }
  hide(){
    if(this.state.show)
       this.setState({show:false})
  }
  getChildrenHtml(item){
    if(item&&item.children){
      return (
          <ul className="child" className={item.show?"show":"hide"} >
            {
                item.children.map((it,i)=>{
                    return (
                      <li key={i} value={it.value} onClick={(e)=>this.show(e,it)} className={it.selected?"selected":""}>
                      <span>{it.label}</span>
                      {
                        it.children&&it.children.length>0?this.getChildrenHtml(it):""
                      }
                      </li>)
                  })
            }
          </ul>
        )
    }
    return ""
  }
  show(e,item){
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
      if(!item){
        this.setState({show:!this.state.show})//show跟目录
      }
      else{  //show子目录
          if(!this.isContain(this.preOpt,item)){//如果点击的不是当前的子元素，则需要重置所有show为false
            this.setHide(this.state.options)
            this.state.inputVal=""
          }
          item.show=true
          item.selected=true
          if(!this.isContain(this.preOpt,item)){
            this.preOpt=item
          }
          if(item.children&&item.children.length>0){
            this.state.inputVal+=item.label+"/"
          }
          else{
            this.state.inputVal+=item.label
            this.hide()
            if(typeof this.props.onChange ==="function"){
              this.props.onChange(this.state.inputVal.split('/'))
            }
          }
          this.forceUpdate()
      }
  }
  setHide(ary){
      for(let value of ary){
          value.show=false
          value.selected=false
          if(typeof value==="object" 
            &&value.children 
            && value.children.length>0){
            this.setHide(value.children)
          }
      }
  }
 isContain(obj1,obj){//如果点击的是当前的子元素，则继续显示，否则需要重置所有show为false
    if(obj1==obj)return true
    if(obj1.children&&obj1.children.length>0){
      for(let value of obj1.children){
            var res=this.isContain(value,obj)
            if(res)return true
          }
    }
    return false
  }
  setInput(){
    this.setHide(this.state.options)
    this.setState({inputVal:""})
  }
  render() {
    return (
      <section className="cascading-menu">
      <div className="userInput">
          <input type="text" placeholder={this.props.placeholder} value={this.state.inputVal}  onClick={(e)=>this.show(e)} ref={(el)=>{this.input=el}} onFocus={()=>this.input.blur()}/>
          <span onClick={()=>this.setInput()} className={this.state.inputVal?"show":"hide"}>X</span>
      </div>
        <div className="menu">
          <ul className={this.state.show?"main show":"main hide"}>
             {
                this.state.options.map((it,i)=>{
                    return (
                        <li key={i} value={it.value} onClick={(e)=>this.show(e,it)} className={it.selected?"selected":""}>
                        <span>{it.label}</span>
                        {
                          this.getChildrenHtml(it)
                        }
                        </li>
                    )

                })
             }
          </ul>
        </div>
      </section>
    );
  }
}
