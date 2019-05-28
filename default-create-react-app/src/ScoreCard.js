import React from 'react';
import './ScoreCard.css';
let outBox =(props) => {

    return (
        <div class="card">
             <div class="container">
            <p><b></b>{props.section}</p>
            <p>{props.section_score}</p>            
            </div>
        </div>
    )
          

};

export default outBox;