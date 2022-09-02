import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { useFormik, Form, Formik } from "formik"
import { ThemeContext } from '../../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { googleSignInAction, signInAction, signUpAction } from '../../redux/action/AuthAction';

function Auth(props) {
    const value = useContext(ThemeContext)
    const [user, setUser] = useState('login')
    const [reset, setReset] = useState(false)

    const handleLogin = () =>{
       localStorage.setItem("user" , '123');
    
    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInAction())
    }

    let schemaObj, initialVal;
    if (user === 'login') {
        schemaObj = {
            email: yup.string().email("Enter your email").required("Enter valid email address"),
            password: yup.string().required("Enter your password")
        }
        initialVal = {
            email: '',
            password: ''
        }
    } else if (user === 'signup') {
        schemaObj = {
            name: yup.string().required("Enter your name"),
            email: yup.string().email("Enter valid  email address").required("Enter your email address"),
            password: yup.string().required("Enter your password")
        }
        initialVal = {
            name: '',
            email: '',
            password: ''
        }
    }
    let schema = yup.object().shape(schemaObj);


    const insertData = (values) => {
        let LocalData = JSON.parse(localStorage.getItem("user"));
        console.log(values);

        if (LocalData === null) {
            localStorage.setItem("user", JSON.stringify([values]));
        } else {
            LocalData.push(values);
            localStorage.setItem("user", JSON.stringify(LocalData));
        }
    }

    const dispatch = useDispatch()
    const formikObj = useFormik({
        initialValues: initialVal,
        validationSchema: schema,
        onSubmit: values => {
             if(user === 'login'){
                // handleLogin();
                dispatch(signUpAction(values))
            }else{
                // insertData(values);
                dispatch(signInAction(values))
            }
           
           
        },
        enableReinitialize: true
    });

    const { handleChange, errors, handleSubmit, handleBlur, touched } = formikObj
    return (
        <section id="appointment" className={`appointment ${value.theme}`}>
            <div className={`container ${value.theme}` }>
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
                                        null :
                                        user === 'login' ?
                                            null
                                            :
                                            <>
                                                <input type="text" name="name" className="form-control mb-3" id="name" placeholder="Username" data-rule="minlen:4" data-msg="Please enter your name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                <p className='text-danger'>{errors.name && touched.name ? errors.name : ''}</p>
                                                <div className="validate" />
                                            </>
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-4 form-group mt-3 mt-md-0 mb-3">
                                <input type="email" className="form-control" name="email" id="email" placeholder="email" data-rule="email" data-msg="Please enter a email"
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                <p className='text-danger'>{errors.email && touched.email ? errors.email : ''}</p>
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
                                            onBlur={handleBlur} />
                                        <p className='text-danger'>{errors.password && touched.password ? errors.password : ''}</p>
                                        <div className="validate" />
                                    </div>
                                </div>
                        }


                        <div className='text-start'>
                            {
                                reset ?
                                    <>
                                        <button type='submit' onClick={() => setReset(false)}>login</button>
                                    </>
                                    :
                                    user === 'login' ?
                                        <>
                                            <p className='d-inline-block pe-4'>Create new account..</p><a href='#' onClick={() => setUser('signup')}>Signup</a>
                                            <a href='#' className='d-block' onClick={() => setReset(true)}>Forget Password !</a>
                                        </>
                                        :
                                        <>
                                            <p className='d-inline-block pe-4'>Already have an account ?</p><a href='#' onClick={() => setUser('login')}>Login</a>
                                        </>
                            }
                        </div>
                        <div className="text-center">
                            {
                                reset ?
                                    <button type="submit">Submit</button>
                                    :
                                    user === 'login' ?
                                        <button type="submit">Submit</button>
                                        :
                                        <button type="submit">Submit</button>
                            }
                            <h5>or</h5>
                            <button type='submit' onClick={() => handleGoogleSignIn()}>Sign In with Google</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </section>

    );
}

export default Auth;