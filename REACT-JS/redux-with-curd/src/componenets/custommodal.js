import React from "react";
import "../componenets/custommodal.css"
import { useSelector } from "react-redux";


function Custommodal({id ,popup ,setPopup}){
    const allusers=useSelector((state)=>state.app.users)

    const SingleUser = allusers.find((e) => e.id === id);



    return(
        <>
        <div className="modalbackground">
            <div className="modelcontainer">
                <button onClick={()=>setPopup(false)}>close</button>
                <h5 className="card-title">{SingleUser.firstName}</h5>
      <h6 className="card-subtitle mb-2 text-body-secondary">{SingleUser.email}</h6>
      <p className="card-subtitle mb-2 text-body-secondary">{SingleUser.age}</p>
      <p className="card-subtitle mb-2 text-body-secondary">{SingleUser.gender}</p>
            </div>
        </div>

        </>
    )
}
export default Custommodal