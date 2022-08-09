import React from "react";
export default function Die(props){
    const styles={
            backgroundColor : props.isHeld ? "#59e391" : "white"  
        }
    return(
        
        <div className="face" style={styles}
        onClick={props.holddice}>
            <h2 className="num">{props.value}</h2>
        </div>
    )
}