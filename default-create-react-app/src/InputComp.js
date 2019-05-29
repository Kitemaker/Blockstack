import React from 'react';

let inputBox =(props) => {
    
    return (<div>
            <p align = "center"><h2>Enter Text</h2></p>
           <textarea id="inputbox" rows="6" cols="60" onChange={props.change}/>
        </div>)
};

export default inputBox;