import React from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup"
import "bootstrap/dist/css/bootstrap.css";



const LoginSchema = Yup.object().shape({
    name: Yup.string().min(2, "your name not right").required("name required"),
    email: Yup.string().email("invalid").required("email required")

})


class Formdata extends React.Component {
    render() {
        const defaultvalue = {
            name: "",
            email: ""
        }
        const handlesumbit = (values) => {
            console.log("values", values)
        }
        return (
            <>
                <div className="container">
                    <Formik initialValues={defaultvalue} validationSchema={LoginSchema} onSubmit={handlesumbit}>
                        <Form >
                            <label>name</label>
                            <Field type="text" name="name" placeholder="enter name"></Field>
                            <p><ErrorMessage name="name" /></p>
                            <label>email</label>
                            <Field type="email" name="email" placeholder="enter email"></Field>
                            <p><ErrorMessage name="email" /></p>
                            <button className="btn btn-primary" type="sumbit">submit</button>
                        </Form>
                    </Formik>
                </div>
            </>

        )
    }
}

export default Formdata
