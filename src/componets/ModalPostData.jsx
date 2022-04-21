import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import MyInput from "./UI/input/MyInput";
import axios from "axios";
import MyButton from "./UI/button/MyButton";


const ModalPostData = () => {
    const [show, setShow] = useState(false);
    const url = 'http://localhost:8080/api/todo';
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const newData = ()=> {
        axios.post(url, postdata, config)
            .catch(error => {
                setErrormessage(error.response.data);
            }).then(handleClose)
    };

    const handleClose = () => {
        setShow(false);
        setPostdata({...initialState});
    };

    const handleShow = () => setShow(true);

    const initialState = {
        id: null,
        description: '',
        client: {
            id: null,
            name: '',
            elAddress: {
                email: '',
                phoneNumber: ''
            },
            homeAddress: {
                city: '',
                street: '',
                houseNumber: ''
            }
        }
    };

    const [postdata, setPostdata] = useState({...initialState});

    const [errormessage, setErrormessage] = useState({
        status: null,
        message: null,
        errors: []
    });

    useEffect(() => {
        console.log(errormessage)
    }, [errormessage]);

    return (
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <MyButton className="btn btn-primary" onClick={handleShow}>
                Add ToDo
            </MyButton>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add/Update ToDo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <MyInput
                            className="form-control rounded mb-3"
                            value={postdata.client.elAddress.phoneNumber}
                            onChange={e => {
                                setPostdata({
                                    ...postdata,
                                    client: {
                                        ...postdata.client,
                                        elAddress: {
                                            ...postdata.client.elAddress,
                                            phoneNumber: e.target.value
                                        }
                                    }
                                })
                            }}
                            type='text'
                            placeholder='Client Phone'/>

                        <MyInput
                            className="form-control rounded mb-3"
                            value={postdata.client.elAddress.email}
                            onChange={e => {
                                setPostdata({
                                    ...postdata,
                                    client: {
                                        ...postdata.client,
                                        elAddress: {
                                            ...postdata.client.elAddress,
                                            email: e.target.value
                                        }
                                    }
                                })
                            }}
                            type='email'
                            placeholder='Client Email'/>

                        <MyInput
                            className="form-control rounded mb-3"
                            value={postdata.client.name}
                            onChange={e => {
                                setPostdata({
                                    ...postdata,
                                    client: {...postdata.client, name: e.target.value}
                                })
                            }}
                            type='text'
                            placeholder='Client Name'/>

                        <MyInput
                            className="form-control rounded mb-3"
                            value={postdata.description}
                            onChange={e => {
                                setPostdata({...postdata, description: e.target.value})
                            }}
                            type='text'
                            placeholder='Description'/>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <MyButton className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </MyButton>
                    <MyButton className="btn btn-primary" onClick={newData}>
                        Save Changes
                    </MyButton>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default ModalPostData;
