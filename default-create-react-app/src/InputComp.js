import React from 'react';

let inputBox =(props) => {
    
    return (<div>
            <p>Enter Your Input</p>
           <input id="inputbox" onChange={props.change}/>
        </div>)
};

export default inputBox;