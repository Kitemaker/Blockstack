import React, {Component} from 'react';
import './App.css';
import InputComp from  './InputComp';
import OutComp from './OutComp';
import ScoreCard from './ScoreCard'

var request = require('request');
const url = "https://nvxhqhbiwh.execute-api.us-east-1.amazonaws.com/test/blockstack-sentio-api-handler-python?inputText=";
class App extends Component{

state = {
output:"Default Text",
input:"Please Input Text",
sentiment: "",
positive : "",
negative: "",
mixed: "",
neutral:""
}


getapi =(message) =>{
//let send_to_api = "";


console.log("request = " , url + this.state.input);
request.get(url + this.state.input , (error, response, body) => {
  if(error) {
      return console.log("this error received = " , error);
    }
    console.log('another message');
    console.log("response= " , response , "body = ", body);
    let output = JSON.parse(body); 
    let scores = output.SentimentScore;    
    this.setState({     
      sentiment: output.Sentiment,
      positive : scores.Positive,
      negative: scores.Negative,
      mixed: scores.Mixed,
      neutral:scores.Neutral
    }
    );
});
}

onInputChange = (event) => {
  console.log("message from onInputChange ", event.target.value );
  // eslint-disable-next-line no-template-curly-in-string
  console.log('state.input = ' + this.state.input  + ' state.outpt =' + this.state.output);

  this.setState({
   // output:this.state.output,
    input:event.target.value
  });
  
}

swithStateHandler = ()=>{
console.log(document.getElementById('inputbox').nodeValue);
 const textFomUser = document.getElementById('inputbox').nodeValue;
 this.getapi(textFomUser);
   
}

render() {
  return (
    <div className="App"> 
      <button onClick={this.swithStateHandler}>Click Me</button>
       <InputComp input={this.state.input} change={this.onInputChange}/>  
       <div id="sentiment" align="center"><p>Sentiment</p>  
        <OutComp output={this.state.sentiment}/>  
        <ScoreCard section= "Positive" section_score = {this.state.positive}/>
        <ScoreCard section= "Negative" section_score = {this.state.negative}/>
        <ScoreCard section= "Mixed" section_score = {this.state.mixed}/>
        <ScoreCard section= "Neutral" section_score = {this.state.neutral}/>      
       </div>
    </div>
  );
}
}

export default App;
