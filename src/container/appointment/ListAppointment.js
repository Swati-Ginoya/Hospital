import { validateYupSchema } from "formik";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import {Card ,CardBody ,CardTitle ,CardSubtitle ,CardText ,Button} from 'reactstrap';

function ListAppointment(props) {
    const history = useHistory();
    let [data, setData] = useState([]);

    const getData = () =>  {
        let localData = JSON.parse(localStorage.getItem("BookAppointment"));
        setData(localData);
    }


        useEffect(() =>{
            getData();
        } ,[]);

        const handleDelete = (id) => {
            let localData = JSON.parse(localStorage.getItem("BookAppointment"));
            let fData = localData.filter((d) => d.id !== id);
            localStorage.setItem("BookAppointment", JSON.stringify(fData));
            console.log(fData);
    
            getData();
        }

    return (
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    <h2>Manage an Appointment</h2>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <NavLink to='/BookAppointment'>BookAppointment</NavLink>
                    </div>
                    <div className='col-6'>
                        <NavLink to='/ListAppointment'>ListAppointment</NavLink>
                    </div>
                </div>
                {
                   data.map ((d ,i) =>{
                    return(
                        
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">
                              {d.name}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {d.email}
                            </CardSubtitle>
                            <CardText>
                                {d.department}
                                <br/>
                                {d.date}
                            </CardText>
                            <Button>
                                Update
                            </Button>
                            <Button className="ms-3" onClick={() => handleDelete(d.id)}>
                                Delete
                            </Button>
                        </CardBody>
                    </Card>
        
                    )
                   })
                }
               
            </div>
        </section>
    )
}
export default ListAppointment;