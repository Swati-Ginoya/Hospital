import React, { useState } from 'react';
import * as yup from 'yup';
import {useFormik, Form, Formik} from "formik"

function Auth(props) {
    const [user , setUser] = useState('login')
    const [reset ,setReset] = useState(false)

    let schema = yup.object().shape({
        email: yup.string().email("Enter your email").required("Enter valid email address"),
        password: yup.string().required("Enter your password")
      });

      const formikObj = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema : schema,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

      const {handleChange ,errors, handleSubmit} = formikObj
    return ( 
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    {
                        reset ?
                        <h2>Forget password</h2>
                        :
                        user === 'login' ?
                        <h2>Login</h2>
                        :
                        <h2>Signup</h2>
                    }
                </div>
                <Formik values={formikObj}>
                <Form onSubmit={handleSubmit} className="php-email-form">
                    <div className='row'>
                        <div className="col-md-4 form-group">
                            {
                                reset ?
                                null:
                                user === 'login'?
                                null
                                :
                                <>
                                <input type="text" name="name" className="form-control mb-3" id="name" placeholder="Username" data-rule="minlen:4" data-msg="Please enter your name" />
                                <div className="validate" />
                                </>
                            }
                        </div>
                    </div> 
                    <div className='row'>  
                        <div className="col-md-4 form-group mt-3 mt-md-0 mb-3">
                            <input type="email" className="form-control" name="email" id="email" placeholder="email" data-rule="email" data-msg="Please enter a email"
                            onChange={handleChange}
                             />
                             <p>{errors.email}</p>
                            <div className="validate" />
                        </div>
                    </div>
                    {
                        reset ?
                        null
                        :
                        <div className='row'>  
                        <div className="col-md-4 form-group mt-3 mt-md-0 mb-3">
                            <input type="password" className="form-control" name="password" id="password" placeholder="Password" data-rule="password" data-msg="Please enter a password"
                            onChange={handleChange}

                            />
                            <p>{errors.password}</p>
                            <div className="validate" />
                        </div>
                    </div>
                    }
        

                  <div className='text-start'>
                    {
                        reset ?
                        <>
                       <button type='submit'>login</button>
                        </>
                        :
                        user === 'login' ?
                        <>
                        <p className='d-inline-block pe-4'>Create new account..</p><button onClick={() => setUser('signup')}>Signup</button>
                        <a href='#' className='d-block' onClick={() => setReset(true)}>Forget Password !'</a>
                        </>
                        :
                        <>
                        <p className='d-inline-block pe-4'>Already have an account ?</p><button onClick={() => setUser('login')}>Login</button> 
                        </>
                    }
                  </div>
                    <div className="text-center">
                        {
                            reset ?
                            <button type="submit">Submit</button>
                            :
                            user === 'login' ?
                            <button type="submit">Login</button>
                            :
                            <button type="submit">Signup</button>                  
                        }
                       </div> 
                </Form>
                </Formik>
            </div>
        </section>

    );
}

export default Auth;