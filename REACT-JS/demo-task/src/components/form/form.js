import { useState } from "react"

function Form() {
    function loginhandler(e) {
        e.preventDefault()
        alert("sumbited")
    }
    const [firstname, setFirstname] = useState(false);
    const [lastname, setLastname] = useState(false)

    function firstnamehandeler(e) {
        let item = e.target.value
        let reg = new RegExp('[^a-zA-Z]')
        let ltter = item.match(reg)
        if (item.length < 2 || ltter) {
            setFirstname(true)
        } else {
            setFirstname(false)
        }
    }

    function lastnamehandeler(e) {
        let item = e.target.value
        let reg = new RegExp('[^a-zA-Z]')
        let ltter = item.match(reg)
        if (item.length < 2 || ltter) {
            setLastname(true)
        } else {
            setLastname(false)
        }
    }

    return (
        <div className="container bg-light mt-3 mb-3">
            <h6 className="display-6 fw-bold text-center my-5">
                FILL FREE <span className="text-primary">TO CONTACT </span>
                <hr className="w-25 m-auto" />
            </h6>

            <form onSubmit={loginhandler}>
                <div className="row mb-4 card-text">
                    <div className="col">
                        <div data-mdb-input-init="" className="form-outline">
                            <input type="text" id="form6Example1" className="form-control" onChange={firstnamehandeler} required />{firstname ? <span className="text-danger">Not valid</span> : ""}&nbsp;
                            <label className="form-label" htmlFor="form6Example1">
                                First name
                            </label>
                        </div>
                    </div>
                    <div className="col">
                        <div data-mdb-input-init="" className="form-outline">
                            <input type="text" id="form6Example2" className="form-control" onChange={lastnamehandeler} required />{lastname ? <span className="text-danger">Not valid</span> : ""}&nbsp;
                            <label className="form-label" htmlFor="form6Example2">
                                Last name
                            </label>
                        </div>
                    </div>
                </div>
                <div data-mdb-input-init="" className="form-outline mb-4 card-text">
                    <input type="text" id="form6Example3" className="form-control" required />
                    <label className="form-label" htmlFor="form6Example3">
                        Course name
                    </label>
                </div>
                <div data-mdb-input-init="" className="form-outline mb-4 card-text">
                    <input type="text" id="form6Example4" className="form-control" />
                    <label className="form-label" htmlFor="form6Example4">
                        Address
                    </label>
                </div>
                <div data-mdb-input-init="" className="form-outline mb-4 card-text">
                    <input type="email" id="form6Example5" className="form-control" placeholder="exaample@gmail.com" />
                    <label className="form-label" htmlFor="form6Example5">
                        Email
                    </label>
                </div>
                <div data-mdb-input-init="" className="form-outline mb-4 card-text">
                    <input type="number" id="form6Example6" className="form-control" required />
                    <label className="form-label" htmlFor="form6Example6">
                        Phone
                    </label>
                </div>
                <div data-mdb-input-init="" className="form-outline mb-4 card-text">
                    <textarea
                        className="form-control"
                        id="form6Example7"
                        rows={4} placeholder="type something about you" />
                    <label className="form-label" htmlFor="form6Example7">
                        Additional information
                    </label>
                </div>
                <button
                    data-mdb-ripple-init=""
                    type="sumbit"
                    className="btn btn-primary btn-block mb-4"> send </button>
            </form>
        </div>

    )

}

export default Form