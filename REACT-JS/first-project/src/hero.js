import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle"
import { useState } from "react";

function Hero() {


  const [usrerr, setUsererr] = useState(false)
  const [iderr, setIderr] = useState(false)
  const [count, setCount] = useState(0)
  function loginhandler(e) {
    e.preventDefault()
    alert("sumbited")
   }

  function userhandeler(e) {
    let item = e.target.value
    let reg = new RegExp('[^a-zA-Z]')
    let ltter = item.match(reg)
    if (item.length < 3 || ltter) {
      setUsererr(true)
    } else {
      setUsererr(false)
    }
  }
function tidhandeler(e) {
    let item = e.target.value
    if (item.length < 5 || item.length > 10) {
      setIderr(true)
    } else {
      setIderr(false)
    }
  }

  function counthandler(e) {
    

    if (count === 4) {
      alert("only 1 time remaing for click on this button")
      setCount(count + 1)
    } else if (count > 5) {
      alert("only 5 time clicked")
    }
    else {
      setCount(count + 1)
      
      
      
    }
  }

  return (

    <>

      
<>
  {/* Section: Design Block */}
  <section className="">
    {/* Jumbotron */}
    <div
      className="px-4 py-5 px-md-5 text-center text-lg-start himg"
      
    >
      <div className="container">
        <div className="row gx-lg-5 align-items-center">
          <div className="col-lg-6 col-sm-12 mb-5 mb-lg-0">
            <h6 className="my-3 display-4 fw-bold ls-tight text-light">
              Enjoy Hasless Free Delivery Service
              </h6>
            <p className="text-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
             
            </p>
          
                  <button
                    type="submit "
                    className=" btncolor mt-3 btn-block mb-4 px-3 py-2"
                  >
                    Get Accept
                  </button>
          </div>

          <div className=" col-lg-4 box col-sm-12 mb-5 mb-lg-0">
            <div className="card">
              <div className="card-body py-3 px-md-3">
                <h2 className="pb-2 text-start fw-bold">Track Your Goods</h2>
                <form onSubmit={loginhandler}>
                  
                  <div className="row">
                    <div className="col-md-12  mb-2">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example1"
                          className="form-control"
                          placeholder="Name"onChange={userhandeler} required
                        />{usrerr ? <span>Not valid</span> : ""}
                        
                      </div><br></br>
                    </div>
                    <div className="col-md-12 mb-2">
                      <div className="form-outline">
                        <input
                          type="email"
                          id="form3Example1"
                          className="form-control"
                          placeholder="Email" required
                        />
                        
                      </div><br></br>
                    </div>
                    <div className="col-md-12 mb-2">
                      <div className="form-outline">
                      <select id="form3Example1" name="country " className="form-control"  required>
                    <option value="">Select fright</option>
                      <option value="700">700</option>
                      <option value="800">800</option>
                      <option value="2000">2000</option>
                    </select> 
                        
                      </div><br></br>
                    </div>
                    <div className="col-md-12 mb-4">
                      <div className="form-outline">
                        <input
                          type="number"
                          id="form3Example1"
                          className="form-control"
                          placeholder="Tracking id"onChange={tidhandeler} required
                        />{iderr ? <span>id not valid</span> : ""}
                        
                      </div>
                    </div>
                  </div>
                  
                  
                 
                  <button
                    type="submit"
                    className="btncolor  px-3 py-2 col-md-12  btn-block " onClick={counthandler}
                  >
                    Sign up
                  </button>
                  <h1 className="hid">{count}</h1>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </section>
  
</>



    </>
  )
}

export default Hero;