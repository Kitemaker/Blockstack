import React from 'react';

let inputBox =(props) => {
    
    return (<div>
            <h2 align = "center" >Enter Text</h2>
           <textarea id="inputbox" rows="6" cols="60" onChange={props.change} value={props.text}/>
        </div>)
};

export default inputBox;