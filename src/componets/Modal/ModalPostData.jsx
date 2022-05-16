import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import MyButton from "../UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import ToDoService from "../../API/ToDoService";
import Loader from "../UI/loader/Loader";
import SearchClients from "../SearchClients";
import {PostContext} from "../context";
import FetchPageableData from "../FetchPageableData";
import InputForm from "../InputForm";
import ModalSuccessPostData from "./ModalSuccessPostData";
import ModalUpdateData from "./ModalUpdateData";
import ModalErrorInputData from "./ModalErrorInputData";


const ModalPostData = () => {

    const [show, setShow] = useState(false);
    const [updateShow, setUpdateShow] = useState(false)
    const [errorShow, setErrorShow] = useState(false)
    const [success, setSuccess] = useState(false)

    const url = 'http://localhost:8080/api/todo';
    const urlClients = 'http://localhost:8080/api/clients?'

    const clientSearchParams = {
        filter: ''
    }
    const patchToDoParams = {
        description: '',
        completed: false
    }

    const patchQueryData = new URLSearchParams(patchToDoParams)

    const queryData = new URLSearchParams(clientSearchParams)

    const [updateToDo, setUpdateToDo] = useState({
        id: null,
        name: '',
        description: '',
        completed: false
    })


    const [clientsData, setClientsData] = useState([{
        id: null,
        name: '',
        email: '',
        phoneNumber: ''
    }])

    const [fetchClients, isLoading, fetchError] = useFetching(async (params) => {
        const response = await ToDoService.getAll(urlClients, params)
        setClientsData(() => response.data)

    })


    const [postToDo, isPosting, postError] = useFetching(async (params) => {
        const response = await ToDoService.updateToDo(url, params)

        if (response.status === 422) {
            setErrormessage(response)
            setErrorShow(true)
        }
        if (response.status === 201) {
            setPostResponse(() => response.data)
            setShow(false)
            setSuccess(true)
            setPostdata({...initialState});
            setTimeout(() => {
                setSuccess(false)
            }, 3000)

        }

    })

    const [patchToDo, isPatching, patchError] = useFetching(async (params) => {
        const response = await ToDoService.patchToDo(url + '/' + updateToDo.id + '?', params)
        console.log(response)
        if (response.status === 422) {
            setErrormessage(response)
            setErrorShow(true)
        }
        if (response.status === 201) {
            setUpdateShow(false)

        }
    })

    const patch = () => {
        patchQueryData.set('description', updateToDo.description)
        patchQueryData.set('completed', updateToDo.completed)
        console.log(patchQueryData)
        patchToDo(patchQueryData)
    }



    const getClients = () => {
        queryData.set('filter', postdata.client.name)
        fetchClients(queryData)
    }


    const handleClose = () => {
        if (!errorShow) {
            setShow(false);
            setUpdateShow(false)
            setPostdata({...initialState})
        }
    }

    const handleErrorClose = () => {
        setErrorShow(false);
        if(show){
        setShow(true)}
    }


    const handleShow = () => setShow(true);

    const initialState = {
        id: null,
        description: '',
        completed: false,
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
    const [postResponse, setPostResponse] = useState({...initialState})
    const [errormessage, setErrormessage] = useState({
        status: null,
        message: null,
        errors: []
    });

    useEffect(() => {
        const fillData = () => {
            clientsData.forEach((client) => {
                if (postdata.client.name === client.name) {
                    setPostdata({
                        ...postdata,
                        client: {
                            ...postdata.client,
                            elAddress: {
                                ...postdata.client.elAddress,
                                phoneNumber: client.phoneNumber,
                                email: client.email

                            }
                        }
                    });
                }
            })
        }
        fillData()

    }, [postdata.client.name]);// eslint-disable-line react-hooks/exhaustive-deps

    const onRowSelectInf = (rowName, rowItem) => {
        if (rowName === 'description')
            setUpdateToDo({
                id: rowItem.id,
                name: rowItem.clientName,
                description: rowItem.description,
                completed: rowItem.completed
            })
        setUpdateShow(true)

        if (rowName === 'clientName')
            console.log(`Client Id: ${rowItem.clientId}`)
    }

    return (

        <div>
            <PostContext.Provider value={postResponse}>
                <FetchPageableData
                    onRowSelectInf={onRowSelectInf}
                    title={"Список ToDo"}/>
                <ModalSuccessPostData
                    success={success}/>
            </PostContext.Provider>

            {
                patchError &&
                <h6>Network Error: Data Server Error</h6>
            }
            {
                isPatching ? <Loader/> :
                    <ModalUpdateData
                        updateShow={updateShow}
                        handleClose={handleClose}
                        updateToDo={updateToDo}
                        setUpdateToDo={setUpdateToDo}
                        patchToDo={patch}
                    />
            }


            <div className="d-grid d-md-flex justify-content-md-end">
                <MyButton className="btn btn-primary" onClick={handleShow}>
                    Add ToDo
                </MyButton>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add ToDo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            (postError || fetchError) &&
                            <h6>Network Error: Data Server Error</h6>
                        }

                        {
                            (isPosting || isLoading) ? <Loader/> :
                                <form>
                                    <SearchClients
                                        postdata={postdata}
                                        setPostdata={setPostdata}
                                        clientsData={clientsData}
                                        getClients={getClients}
                                    />
                                    <InputForm
                                        postdata={postdata}
                                        setPostdata={setPostdata}
                                    />
                                </form>

                        }

                    </Modal.Body>
                    <Modal.Footer>
                        <MyButton className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </MyButton>
                        <MyButton className="btn btn-primary" onClick={() => {
                            postToDo(postdata)
                        }}>
                            Save Changes
                        </MyButton>
                    </Modal.Footer>
                </Modal>

                <ModalErrorInputData
                    errorShow={errorShow}
                    errormessage={errormessage}
                    handleErrorClose={handleErrorClose}

                />

            </div>
        </div>
    );
};

export default ModalPostData;
