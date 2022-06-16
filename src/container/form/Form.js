import React, { useRef } from 'react';


function Form(props) {
    const nameref = useRef()
    const emailref = useRef();
    const numref = useRef();

    const name = () => {
        console.log(nameref.current.value, emailref.current.value, numref.current.value);
        nameref.current.style.backgroundColor = 'red';
        emailref.current.focus();
    }

    return (
        <div>
            <input className='mt-4' ref={nameref} type="text" name='name' placeholder='Enter your name'/><br/>
            <input className='mt-4' ref={emailref} type="email" name="email" placeholder='Enter your email'/><br/>
            <input className='mt-4' ref={numref} type="number" name='number' placeholder='Enter your contact number'/><br/>

            <button className=' mt-4' onClick={() => name()}>Submit</button>
        </div>
    );
}

export default Form;