import React, { Component } from 'react'
import { UserSession } from 'blockstack'
//import EditMe from './EditMe'
//import Kingdom from './Kingdom'
import NavBar from './NavBar'
//import OptionsList from './OptionsList'
//import OtherKingdoms from './OtherKingdoms'
import { appConfig, ME_FILENAME } from './constants'
import './SignedIn.css'
var Request = require('request');
import InputComp from  './InputComp';
import OutComp from './OutComp';
import ScoreCard from './ScoreCard'


class SignedIn extends Component {

  constructor(props) {
    super(props)
    this.userSession = new UserSession({ appConfig })
    this.state = {
      me: {},
      savingMe: false,
      savingKingdown: false,
      redirectToMe: false
    }

    this.loadMe = this.loadMe.bind(this)
    this.saveMe = this.saveMe.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  componentWillMount() {
    this.loadMe()
  }

  loadMe() {
    const options = { decrypt: false }
    this.userSession.getFile(ME_FILENAME, options)
    .then((content) => {
      if(content) {
        const me = JSON.parse(content)
        this.setState({me, redirectToMe: false})
      } else {
        const me = null

        this.setState({me, redirectToMe: true})
      }
    })
  }

  saveMe(me) {
    this.setState({me, savingMe: true})
    const options = { encrypt: false }
    this.userSession.putFile(ME_FILENAME, JSON.stringify(me), options)
    .finally(() => {
      this.setState({savingMe: false})
    })
  }

  signOut(e) {
    e.preventDefault()
    this.userSession.signUserOut()
    window.location = '/'
  }

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
    const username = this.userSession.loadUserData().username
    const me = this.state.me
    const redirectToMe = this.state.redirectToMe 

    return (
      <div className="SignedIn">
        <NavBar username={username} signOut={this.signOut}/> 
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

export default SignedIn
