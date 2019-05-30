import React, {Component} from 'react';
import './App.css';
import InputComp from  './InputComp';
import ScoreCard from './ScoreCard'

var request = require('request');
const url = "https://nvxhqhbiwh.execute-api.us-east-1.amazonaws.com/test/blockstack-sentio-api-handler-python?inputText=";



class App extends Component{

state = {
output:"Default Text",
text:"",
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

getFile = (event) => {
	const input = event.target
  if ('files' in input && input.files.length > 0) {
	  this.placeFileContent(
      document.getElementById('content-target'),
      input.files[0])
  }
}

placeFileContent = (target, file) =>{
	this.readFileContent(file).then(content => {
    console.log(content);
    this.setState({
      // output:this.state.output,
       text:content
     });
    
  }).catch(error => console.log(error))
}

readFileContent = (file) => {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}



dropHandler(ev) {
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log('... file[' + i + '].name = ' + file.name);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  }
}
 dragOverHandler(ev) {
  console.log('File(s) in drop zone'); 

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

render() {
  return (
    <div className="App"> 
       
      <div className="w3-col" >
          <h2>Analyse Sentiments of Text</h2>       
          <div className="w3-row">
            <div className="w3-col w3-center " >
              <InputComp input={this.state.input} change={this.onInputChange} id='content-target' text={this.state.text}/>
            </div>
          </div>
          <div className="w3-row">
            <div className="w3-col w3-center "  style={{padding: '20px'}}>
              <h3>Upload Text File</h3>
                <input type="file" id="input-file" onChange={this.getFile}/>  
            </div>      
          </div>   
       
          <div className="w3-row" style={{padding: '20px', paddingLeft:"10%", paddingRight:"10%", margin:"10px"}}>
              <div className="w3-col w3-center " >
                <button  className="w3-btn w3-block w3-teal" style={{  background:'grey', align:'center'}} onClick={this.swithStateHandler}>Submit</button>
            </div>
          </div>    
          
          
         <div className="w3-row" style={{ paddingLeft:"10%", paddingRight:"10%"}}>
              <div className="w3-col w3-center "  >
                <ScoreCard section= "Text Sentiments" section_score = {this.state.sentiment} />
              </div>
          </div>     
         <div className="w3-row w3-center" style={{  padding:"10%"}}>
            <div className="w3-col w3-center"  style={{  width:"25%"}}>
            <ScoreCard section= "Positive" section_score = {this.state.positive} />
            </div>
            <div className="w3-col w3-center"  style={{  width:"25%"}}> 
              <ScoreCard section= "Negative" section_score = {this.state.negative}/>
            </div>       
  
      
            <div className="w3-col w3-center"  style={{  width:"25%"}}>
            <ScoreCard section= "Mixed" section_score = {this.state.mixed}/>
            </div>
            <div className="w3-col w3-center"  style={{  width:"25%"}}>
              <ScoreCard section= "Neutral" section_score = {this.state.neutral}/>
            </div>
     
            </div>
         
         </div>
   
     
    </div>
  );
}
}




export default App;
