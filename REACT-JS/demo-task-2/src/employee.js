import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup"
import { Modal, } from 'react-bootstrap';



const LoginSchema = Yup.object().shape({
  firstname: Yup.string().required("FirstName required"),
  lastname: Yup.string(),
  username: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required("UserName reqired"),
  email: Yup.string().email("invalid").required("Email required"),
  employeeid: Yup.number().required("EmployeeId required"),
  joingdate: Yup.date().required("JoingDate required"),
  phone: Yup.number(),
  Company: Yup.string().required("CompanyName required"),
  Department: Yup.string().required("DepartmentName required"),
  Desination: Yup.string().required("DesinationName requried")
})
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      formData: null,
      formHistory: [],

    };
  }

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleSubmit = (values, e) => {
    const { username, Department } = values;

    this.setState((prevState) => ({
      showModal: false,
      formHistory: [...prevState.formHistory, { username, Department }],
    }));

    e.preventDefault();
    this.handleClose();
  };

  copyToClipboard = (text) => {

    if (navigator.clipboard) {

      navigator.clipboard.writeText(text)
        .then(() => {
          alert("Copied to clipboard");
        })
        .catch((err) => {
          console.error('Unable to copy to clipboard', err);
        });
    } else {

      console.error('Clipboard API not supported');
    }
  }


  render() {
    const defaultvalue = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      employeeid: "",
      joingdate: "",
      phone: "",
      Company: "",
      Department: "",
      Desination: ""
    }
    const { showModal, formHistory } = this.state;

    return (
      <div>

        <div className="pb-3 ">
          <div className="row ">
            <div className="col-lg-6 col-sm-12 mx-auto">
              <h4 className="text-dark text-start header-text">Employee</h4>
            </div>
            <div className="col-lg-6 col-sm-12 mx-auto ">
              <div className="text-end">
                <i class="fa-solid fa-list ibox"></i>
                <i class="fa-solid fa-align-center ibox"></i>

                <button className='btne fw-bold' onClick={this.handleShow}> <i class="fa-solid fa-plus"></i> Add Employee</button>
                <Modal show={this.state.showModal} onHide={this.handleClose} className="modal-lg mod">

                  <Modal.Body >
                    <Formik initialValues={defaultvalue} validationSchema={LoginSchema} onSubmit={this.handleSubmit} >
                      <div className="d-flex justify-content-center ">
                        <Form className="row" >
                          <h3 className="text-center header-text">Add Employee</h3>
                          <div className="col-md-6 mt-5 ">
                            <label htmlFor="inputFirst4" className="ftext">
                              First Name
                            </label> <sup><i class="fa-solid fa-star-of-life star"></i></sup>
                            <Field type="text" className="form-control" name="firstname" id="inputFirst4" ></Field>
                            <p className="etext dd"><ErrorMessage name="firstname" /></p>
                          </div>
                          <div className="col-md-6 mt-5">
                            <label htmlFor="inputLastrd4" className="ftext">
                              Last Name
                            </label>
                            <Field type="text" className="form-control" name="lastname" id="inputLastrd4"></Field>
                            <p className="etext dd"><ErrorMessage name="lastname" /></p>
                          </div>
                          <div className="col-md-6 mt-2">
                            <label htmlFor="inputUser4" className="ftext">
                              UserName
                            </label> <sup><i class="fa-solid fa-star-of-life star"></i></sup>
                            <Field type="text" className="form-control" name="username" id="inputUser4" ></Field>
                            <p className="etext"><ErrorMessage name="username" /></p>
                          </div>
                          <div className="col-md-6 mt-2">
                            <label htmlFor="inputEmail4" className="ftext">
                              Email
                            </label> <sup><i class="fa-solid fa-star-of-life star"></i></sup>
                            <Field type="email" className="form-control" name="email" id="inputEmail4"></Field>
                            <p className="etext dd"><ErrorMessage name="email" /></p>
                          </div>
                          <div className="col-md-6 mt-2">
                            <label htmlFor="inputEmployee4" className="ftext">
                              Employee ID
                            </label> <sup><i class="fa-solid fa-star-of-life star"></i></sup>
                            <Field type="number" className="form-control" name="employeeid" id="inputEmployee4"></Field>
                            <p className="etext dd"><ErrorMessage name="employeeid" /></p>
                          </div>
                          <div className="col-md-6 mt-2">
                            <label htmlFor="inputdate4" className="ftext">
                              Joining Date
                            </label> <sup><i class="fa-solid fa-star-of-life star"></i></sup>
                            <Field type="date" name="joingdate" className="form-control" id="inputdate4" ></Field>
                            <p className="etext dd"><ErrorMessage name="joingdate" /></p>
                          </div>
                          <div className="col-md-6 mt-2">
                            <label htmlFor="inputPhone4" className="ftext">
                              Phone
                            </label>
                            <Field type="number" className="form-control" name="phone" id="inputPhone4"></Field>
                            <p className="etext dd"><ErrorMessage name="phone" /></p>
                          </div>
                          <div className="col-md-6 mt-2">
                            <label htmlFor="inputPhone4" className="ftext">
                              Company
                            </label> <sup><i class="fa-solid fa-star-of-life star"></i></sup>
                            <Field as="select" class="form-select" aria-label="Default select example" name="Company">
                              <option selected></option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option></Field>
                            <p className="etext dd"><ErrorMessage name="Company" /></p>
                          </div>
                          <div className="col-md-6 mt-2">
                            <label htmlFor="inputPhone4" className="ftext">
                              Department
                            </label> <sup><i class="fa-solid fa-star-of-life star"></i></sup>
                            <Field as="select" class="form-select" aria-label="Default select example" name="Department" >
                              <option selected></option>
                              <option value="web designer">web designer</option>
                              <option value="CEO">CEO</option>
                              <option value="web Developer">web Developer</option></Field>
                            <p className="etext dd"><ErrorMessage name="Department" /></p>
                          </div>
                          <div className="col-md-6 mt-2">
                            <label htmlFor="inputCompany4" className="ftext">
                              Desination
                            </label> <sup><i class="fa-solid fa-star-of-life star"></i></sup>
                            <Field as="select" class="form-select" aria-label="Default select example" name="Desination" >
                              <option selected></option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option></Field>
                            <p className="etext dd"><ErrorMessage name="Desination" /></p>
                          </div>
                          <div className="d-flex justify-content-center mt-4">
                            <button type="submit" className="btnf" >Sumbit</button>
                          </div>
                        </Form>
                      </div>
                    </Formik>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="row text-center">
            <div className="col-xl-3 col-sm-6 mb-4">
              <div className="bg-white rounded  team">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg"
                  alt=""
                  width={70}
                  className="img-fluid rounded-circle mb-2 shadow-sm"
                />
                <h6 className="mb-0 header-text">John doe</h6>
                <span className=" text">Web Developer</span>

              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-4">
              <div className="bg-white rounded  team">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg"
                  alt=""
                  width={70}
                  className="img-fluid rounded-circle mb-2 shadow-sm"
                />
                <h6 className="mb-0 header-text">John doe</h6>
                <span className=" text">Web Developer</span>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-4">
              <div className="bg-white rounded  team">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg"
                  alt=""
                  width={70}
                  className="img-fluid rounded-circle mb-2 shadow-sm"
                />
                <h6 className="mb-0 header-text">John doe</h6>
                <span className=" text">Web Developer</span>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-4">
              <div className="bg-white rounded  team">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg"
                  alt=""
                  width={70}
                  className="img-fluid rounded-circle mb-2 shadow-sm"
                />
                <h6 className="mb-0 header-text">John doe</h6>
                <span className=" text">Web Developer</span>
              </div>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-xl-3 col-sm-6 mb-4">
              <div className="bg-white rounded  team">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg"
                  alt=""
                  width={70}
                  className="img-fluid rounded-circle mb-2 shadow-sm"
                />
                <h6 className="mb-0 header-text">John doe</h6>
                <span className=" text">Web Developer</span>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-4">
              <div className="bg-white rounded  team">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg"
                  alt=""
                  width={70}
                  className="img-fluid rounded-circle mb-2 shadow-sm"
                />
                <h6 className="mb-0 header-text">John doe</h6>
                <span className=" text">Web Developer</span>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-4">
              <div className="bg-white rounded  team">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg"
                  alt=""
                  width={70}
                  className="img-fluid rounded-circle mb-2 shadow-sm"
                />
                <h6 className="mb-0 header-text">John doe</h6>
                <span className=" text">Web Developer</span>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-4">
              <div className="bg-white rounded  team">
                <img
                  src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg"
                  alt=""
                  width={70}
                  className="img-fluid rounded-circle mb-2 shadow-sm"
                />
                <h6 className="mb-0 header-text">John doe</h6>
                <span className=" text">Web Developer</span>
              </div>
            </div>
          </div>

          {formHistory.length > 0 && (
            <>
              {formHistory.map((formData, index) => (
                <div className="col-xl-3 col-sm-6 mb-4 ">
                  <div className="bg-white rounded  team ">
                    <i class="fa-solid fa-copy" onClick={() => this.copyToClipboard(formData.Department)}></i>
                    <img
                      src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg"
                      alt=""
                      width={70}
                      className="img-fluid rounded-circle mb-2 shadow-sm"
                    />
                    <h6 className="mb-0 header-text" >{formData.username}</h6>
                    <span className=" text">{formData.Department}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default MyComponent;


// import { Button, Modal, Form } from 'react-bootstrap';

// class MyComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showModal: false,
//       formData: {
//         // Your form fields
//       },
//     };
//   }

//   handleShow = () => {
//     this.setState({ showModal: true });
//   };

//   handleClose = () => {
//     this.setState({ showModal: false });
//   };

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({
//       formData: {
//         ...prevState.formData,
//         [name]: value,
//       },
//     }));
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();

//     // Handle form submission logic here
//     // ...

//     // Close the modal after submission
//     this.handleClose();
//   };

//   render() {
//     return (
//       <>
//         <Button variant="primary" onClick={this.handleShow}>
//           Add
//         </Button>

//         <Modal show={this.state.showModal} onHide={this.handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Add Form</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={this.handleSubmit}>
//               {/* Your form fields */}
//               <Form.Group controlId="exampleForm.ControlInput1">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="name@example.com"
//                   name="email" // Update with your field names
//                   value={this.state.formData.email || ''}
//                   onChange={this.handleChange}
//                 />
//               </Form.Group>
//               {/* Add more form fields as needed */}

//               <Button variant="primary" type="submit">
//                 Submit
//               </Button>
//             </Form>
//           </Modal.Body>
//           {/* Optional: Add a modal footer with additional buttons if needed */}
//         </Modal>
//       </>
//     );
//   }
// }

// export default MyComponent;

