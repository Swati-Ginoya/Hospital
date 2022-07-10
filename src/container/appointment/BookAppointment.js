import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik, Form, Formik } from "formik";
import { NavLink, useHistory } from 'react-router-dom';

function BookAppointment(props) {
    const history = useHistory();
    const [update ,setUpDate] = useState(false);

    let schema = yup.object().shape({
        name: yup.string().required("Enter your name"),
        email: yup.string().email("Enter valid email").required("Enter your email"),
        phone: yup.string().required("Enter your number"),
        date: yup.string().required("Enter your appointment date"),
        department: yup.string().required("Select your department"),
        message: yup.string().required("Enter your message"),
    });

    const insertData = (values) => {
        let localData = JSON.parse(localStorage.getItem('BookAppointment'));

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }

        console.log(data);

        if (localData === null) {
            localStorage.setItem("BookAppointment", JSON.stringify([data]));
        } else {
            localData.push(data);
            localStorage.setItem("BookAppointment", JSON.stringify(localData));
        }

        history.push("/ListAppointment");
        setUpDate(true)
    }

    const formikObj = useFormik({
        initialValues: {
            email: '',
            name: '',
            phone: '',
            date: '',
            department: '',
            message: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            insertData(values);
        },
    });

    useEffect(() => {
        setUpDate(true)
    }
    ,[])
  
    const { handleChange, errors, handleSubmit, handleBlur, touched ,values} = formikObj
    return (
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    <h2>Manage an Appointment</h2>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <NavLink to='/BookAppointment' className='border border-danger rounded-2 p-2'>BookAppointment</NavLink>
                    </div>
                    <div className='col-6'>
                        <NavLink to='/ListAppointment' className='border border-danger rounded-2 p-2'>ListAppointment</NavLink>
                    </div>
                </div>
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit} action method="post" role="form" className="php-email-form mt-5">
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <input 
                                value={values.name}
                                type="text" 
                                name="name" 
                                className="form-control" 
                                id="name" 
                                placeholder="Your Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className='text-danger'>{errors.name && touched.name ? errors.name : ''}</p>
                                <div className="validate" />
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input
                                value={values.email} 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                id="email" 
                                placeholder="Your Email" 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className='text-danger'>{errors.email && touched.email ? errors.email : ''}</p>
                                <div className="validate" />
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input 
                                value={values.phone}
                                type="tel" 
                                className="form-control" 
                                name="phone" 
                                id="phone" 
                                placeholder="Your Phone" 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p className='text-danger'>{errors.phone && touched.phone ? errors.phone : ''}</p>
                                <div className="validate" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group mt-3">
                                <input 
                                value={values.date}
                                type="date" 
                                name="date" 
                                className="form-control datepicker" 
                                id="date" 
                                placeholder="Appointment Date" 
                                 onChange={handleChange} onBlur={handleBlur} />
                                <p className='text-danger'>{errors.date && touched.date ? errors.date : ''}</p>
                                <div className="validate" />
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <select 
                                value={values.department}
                                name="department" 
                                id="department" 
                                className="form-select" 
                                onChange={handleChange} onBlur={handleBlur}>
                                    <option value>Select Department</option>
                                    <option value="Department 1">Department 1</option>
                                    <option value="Department 2">Department 2</option>
                                    <option value="Department 3">Department 3</option>
                                </select>
                                <p className='text-danger'>{errors.department && touched.department ? errors.department : ''}</p>
                                <div className="validate" />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <textarea 
                            value={values.message}
                            className="form-control" 
                            name="message" 
                            rows={5} 
                            placeholder="Message" 
                             onChange={handleChange} onBlur={handleBlur} />
                            <p className='text-danger'>{errors.message && touched.message ? errors.message : ''}</p>
                            <div className="validate" />
                        </div>
                        <div className="mb-3">
                            <div className="loading">Loading</div>
                            <div className="error-message" />
                            <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                        </div>
                        <div className="text-center">
                            {
                                update ?
                                <button type="submit">Update an Appointment</button>
                                :
                                <button type="submit">Make an Appointment</button>
                            }
                            </div>
                    </Form>
                </Formik>
            </div>
        </section>

    );
}

export default BookAppointment;