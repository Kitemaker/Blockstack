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
        <p align="left"><h2>Analyse Sentiments of Text</h2></p>
        <div class="w3-row">
          <div class="w3-col s6 w3-center " >
            <InputComp input={this.state.input} change={this.onInputChange}/>
          </div>
          <div class="w3-col s6 w3-center">
          
            <h3>Upload Text File</h3>
            <input class="w3-input" type="file" id="myFile" multiple false onchange={this.onUploadFIle}></input>
         
          </div>

        </div>
        <div class="w3-row" style={{ width: '80%', align:'center'}}>
           <button  class="w3-btn w3-block w3-teal" style={{  background:'grey', margin: '20px', align:'center'}} onClick={this.swithStateHandler}>Click Me</button>
        </div>
        <div id="sentiment" align="center"><p>Sentiment</p>
       <div class="w3-row" style={{ width: '80%'}}>
      <OutComp output={this.state.sentiment}/>  
       </div>
       <div class="w3-row" style={{ width: '80%'}}>
          <div class="w3-col s6 w3-center " >
          <ScoreCard section= "Positive" section_score = {this.state.positive} />
          </div>
          <div class="w3-col s6 w3-center " >
            <ScoreCard section= "Negative" section_score = {this.state.negative}/>
          </div>
       </div>

       <div class="w3-row" style={{ width: '80%'}}>
          <div class="w3-col s6 w3-center " >
          <ScoreCard section= "Mixed" section_score = {this.state.mixed}/>
          </div>
          <div class="w3-col s6 w3-center " >
            <ScoreCard section= "Neutral" section_score = {this.state.neutral}/>
          </div>
       </div>
        
        
       
       </div>
    </div>
  );
}
}

export default App;
