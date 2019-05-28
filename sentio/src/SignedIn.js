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

inputChangeHandler = (event) =>{
const inText = event.target.value;
console.log("message forminputChangeHandler", inText);
//document.getElementById("outText").innerText = event.target.value;
var input =  encodeURIComponent('How are you?');

Request.get("https://nvxhqhbiwh.execute-api.us-east-1.amazonaws.com/test/blockstack-sentio-api-handler-node?inputText=" + 
              input, { mode: 'no-cors'},(error, response, body) => {
                    if(error) {
        return console.log(error);
    }
    console.log(JSON.parse(body));
});
document.getElementById("outText").innerText = JSON.parse(response);
}

  render() {
    const username = this.userSession.loadUserData().username
    const me = this.state.me
    const redirectToMe = this.state.redirectToMe 

    return (
      <div className="SignedIn">
        <NavBar username={username} signOut={this.signOut}/> 
        <input id="inText" onChange={this.inputChangeHandler} />
        <p id="outText">Hello</p>
      </div>
    );
  }
}

export default SignedIn
