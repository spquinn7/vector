import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';



const { createElement } = React

export class App extends React.Component {

  state = {
    vector1: [0],
    vector2: [0],
    scalars: [0, 0],
    difference: [],
    distance: 0,
    length1: 0,
    length2: 0,
    dotProduct: 0,
    orth: "These two vectors are orthogonal",
    notOrth: "These two vectors are NOT orthogonal"
  };

//dimensions have to be the same for dotproducts, so these will work on both
//adding a row will add a row to both
//removing a row will remove a row from both
addRow(){
  this.setState({vector1: [...this.state.vector1, ""],
                vector2: [...this.state.vector2, ""]});
}

handleRemove(index){
  //removes the item at the given index
  this.state.vector1.splice(index, 1);
  this.state.vector2.splice(index, 1);
  //updates the state
  this.setState({vector1: this.state.vector1,
                vector2: this.state.vector2}
  )
}

//changes happen individually to each vector
//v is the number of vector it is changing
handleChange(e, index, v){
  if(v===1){
    this.state.vector1[index] = e.target.value;
    this.setState({vector1: this.state.vector1});
  }
  else if (v===2){
    this.state.vector2[index] = e.target.value;
    this.setState({vector2: this.state.vector2});
  }
}


getDotProduct(a, b){
  if (a.length!==b.length){
    return "Vectors need to have the same dimensions.";
  }
  var holder = 0;
  for (let i = 0; i<a.length; ++i){
    holder += a[i]*b[i];
  }
  return holder;
}

norm(a){
  return Math.sqrt(this.getDotProduct(a, a));
}

handleDotProduct(e){
  //send this to htpp request
  this.state.dotProduct = this.getDotProduct(this.state.vector1, this.state.vector2);
  //set the changed state
  this.setState({dotProduct: this.state.dotProduct});
}

handleLength(e, v){
  if (v===1){
    this.state.length1 = this.norm(this.state.vector1);
    this.setState({length1: this.state.length1});
  }
  else if (v==2){
    this.state.length2 = this.norm(this.state.vector2);
    this.setState({length2: this.state.length2});
  }

}

difference(a,b){
  if (a.length!==b.length){
    return "must be same length for vector addition/subtraction!"
  }
  var holder = [];
  for (let i = 0; i<a.length; ++i){
    holder.push(a[i]-b[i]);
  }
  return holder;
}

distance(){
  if(this.state.vector1.length!==this.state.vector2.length){
    return "vectors must be the same length";
  }
  let a = this.difference(this.state.vector1, this.state.vector2);
  let diff = this.norm(a);
  return diff;
}

handleDistance(e){
  this.state.distance = this.distance();
  this.setState({diff: this.state.diff});
}

handleScalar(e, v){
  if(v===1){
    this.state.scalars[0] = e.target.value;
  }
  else if(v===2){
    this.state.scalars[1] = e.target.value;
  }
  this.setState({scalars: this.state.scalars})
}

handleMult(e, v){
  if(v===1){
    this.state.vector1 = this.scalarMult(v);
    this.setState({vector1: this.state.vector1});
  }
  else if(v===2){
    this.state.vector2 = this.scalarMult(v);
    this.setState({vector2: this.state.vector2});
  }
}

scalarMult(v){
  var holder = this.state.vector1;
  if (v===2){
    holder = this.state.vector2;
  }
  for (var i = 0; i<holder.length; ++i){
    holder[i] = holder[i]*this.state.scalars[v-1];
  }
  return holder;
}




render(){
  return(
    <div className='App' background-color="lightblue">
      <h1>DOT PRODUCT</h1>
      <label>VECTOR 1</label>
        {
        this.state.vector1.map((v ,index)=>{
          return(
            <div key = {index}>
              <input onChange={(e)=>this.handleChange(e,index,1)}
              value = {v} />
        &nbsp;<button type = "button" class="btn btn-info btn-sm" onClick = {()=>this.handleRemove(index)}> Remove</button>
            </div>
          )
        })
      }
      <br />


      <label>VECTOR 2</label>
      {
        this.state.vector2.map((v ,index)=>{
          return(
            <div key = {index}>
              <input onChange={(e)=>this.handleChange(e,index,2)}
              value = {v} />
        &nbsp;<button type = "button" class="btn btn-info btn-sm" onClick = {()=>this.handleRemove(index)}> Remove</button>
            </div>
          )
        })
      }
      <hr />



      <label>




      <button type = "button" class="btn btn-info" onClick={(e)=>this.addRow(e)}>Add Row</button>
      <hr />
      <div class = "row">
      <div>
        <input onChange={(e)=>this.handleScalar(e,1)}
        />&nbsp;&nbsp;&nbsp;
        <button type = "button" class="btn btn-info btn-sm" onClick = {(e)=>this.handleMult(e, 1)}>V1 Scalar Multiplication</button>&nbsp;&nbsp;&nbsp;
        </div>
      <div>
        <input onChange={(e)=>this.handleScalar(e,2)}
        />&nbsp;&nbsp;&nbsp;
        <button type = "button" class="btn btn-info btn-sm" onClick = {(e)=>this.handleMult(e, 2)}>V2 Scalar Multiplication</button>&nbsp;&nbsp;&nbsp;
        </div>

      </div>
      <hr />

      <div class = "row">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button type = "button" class="btn btn-primary" onClick = {(e)=>this.handleDotProduct(e)}>Get Dot Product</button>&nbsp;&nbsp;&nbsp;
      <button type = "button" class="btn btn-primary" onClick = {(e)=>this.handleLength(e,1)}>Length of V1</button>&nbsp;&nbsp;&nbsp;
      <button type = "button" class="btn btn-primary" onClick = {(e)=>this.handleLength(e,2)}>Length of V2</button>&nbsp;&nbsp;&nbsp;
      <button type = "button" class="btn btn-primary" onClick = {(e)=>this.handleDistance(e)}>Distance between V1 and V2</button>
      </div>
      </label>
      <br />
      <hr />



      <label>DOT PRODUCT: {this.state.dotProduct}</label>
      <br />
      {this.state.dotProduct===0 &&
            <label>{this.state.orth}</label>}

      {this.state.dotProduct!==0 &&
            <label>{this.state.notOrth}</label>}
      <br />

      <label>LENGTH OF V1: {Math.round(this.state.length1*100)/100}</label>
      <br />

      <label>LENGTH OF V2: {Math.round(this.state.length2*100)/100}</label>
      <br />

      <label>DISTANCE BETWEEN V1 AND V2: {Math.round(this.state.distance*100)/100}</label>
      </div>
  )
}
}

export default App;
