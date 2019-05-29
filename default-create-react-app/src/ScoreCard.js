import React from 'react';
import './ScoreCard.css';
let outBox =(props) => {

    return (
        <div class="w3-card-4" >
            <div class="w3-container w3-green" >
                <h3>{props.section}</h3>
            </div>            
            <p>{props.section_score}</p>            
           
        </div>
    )
          

};

export default outBox;