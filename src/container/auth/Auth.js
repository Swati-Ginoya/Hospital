import React, { useState } from 'react';

function Auth(props) {
    const [user , setUser] = useState('login')
    const [reset ,setReset] = useState(false)
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
                <div className="php-email-form">
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
                            <input type="email" className="form-control" name="email" id="email" placeholder="email" data-rule="email" data-msg="Please enter a email" />
                            <div className="validate" />
                        </div>
                    </div>
                    {
                        reset ?
                        null
                        :
                        <div className='row'>  
                        <div className="col-md-4 form-group mt-3 mt-md-0 mb-3">
                            <input type="password" className="form-control" name="password" id="password" placeholder="Password" data-rule="password" data-msg="Please enter a password" />
                            <div className="validate" />
                        </div>
                    </div>
                    }
        

                  <div className='text-start'>
                    {
                        reset ?
                        <>
                       <button onClick={() => {setReset(false) ; setUser('login')}}>login</button>
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
                </div>
            </div>
        </section>

    );
}

export default Auth;