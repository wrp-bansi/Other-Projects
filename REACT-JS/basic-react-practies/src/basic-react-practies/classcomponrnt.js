import React from "react"

class Car extends React.Component{
    constructor(){
super();
this.state={
    color:"red",
    brand :"Ford",
    year : "2023"
}
    }
    changeColor=()=>{
        this.setState({color:"blue"})
    }
    render(){

        return (
        <>
        <h2>hello{this.state.color}</h2>
        <p>{this.state.brand}<br></br>
        {this.state.year}
        </p>
        <button type="button" onClick={this.changeColor} >change</button>
        </>
        )
    }
}

// class Day extends React.Component{
//     render(){
//         return(
//             <>
//             <h1>bansi</h1>
//             <Car />
//             </>

//         )

//     }
// }
export default Car
