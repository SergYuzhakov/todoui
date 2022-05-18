import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import MyButton from "../UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import ToDoService from "../../API/ToDoService";
import Loader from "../UI/loader/Loader";
import SearchClients from "../SearchClients";
import {ErrorContext, PostContext} from "../context";
import FetchPageableData from "../FetchPageableData";
import InputForm from "../InputForm";
import ModalSuccessPostData from "./ModalSuccessPostData";


const ModalPostData = ({
        errorShow, setErrorShow,
        success, setSuccess,
        onRowSelect

}) => {
    const [postShow, setPostShow] = useState(false);
    const url = 'http://localhost:8080/api/todo'
    const urlClients = 'http://localhost:8080/api/clients?'
    const setErrorMessage = useContext(ErrorContext)

    const clientSearchParams = {
        filter: ''
    }
    const queryData = new URLSearchParams(clientSearchParams)

    const [clientsData, setClientsData] = useState([{
        id: null,
        name: '',
        email: '',
        phoneNumber: ''
    }])

    const initialStateToDo = {
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

    const [postData, setPostData] = useState({...initialStateToDo});
    const [postResponse, setPostResponse] = useState({...initialStateToDo})

    const [fetchClients, isLoading, fetchError] = useFetching(async (params) => {
        const response = await ToDoService.getAll(urlClients, params)
        setClientsData(() => response.data)

    })

    const [postToDo, isPosting, postError] = useFetching(async (params) => {
        const response = await ToDoService.createToDo(url, params)
        console.log(response)
        if (response.status === 422) {
            setErrorMessage(response)
            setErrorShow(true)
        }
        if (response.status === 201) {
            setPostShow(false)
            setSuccess(true)
            setPostData({...initialStateToDo});
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
            setPostResponse(() => response.data)
        }

    })

    const getClients = () => {
        queryData.set('filter', postData.client.name)
        fetchClients(queryData)
    }

    const handleClose = () => {
        if (!errorShow) {
            setPostShow(false);
            setPostData({...initialStateToDo})
        }
    };

    const handleShow = () => setPostShow(true);

    useEffect(() => {
        const fillData = () => {
            clientsData.forEach((client) => {
                if (postData.client.name === client.name) {
                    setPostData({
                        ...postData,
                        client: {
                            ...postData.client,
                            elAddress: {
                                ...postData.client.elAddress,
                                phoneNumber: client.phoneNumber,
                                email: client.email

                            }
                        }
                    });
                }
            })
        }
        fillData()
    }, [postData.client.name])// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div>
            <PostContext.Provider value={postResponse}>
                <FetchPageableData
                    onRowSelect={onRowSelect}
                    title={"Список ToDo"}/>
                <ModalSuccessPostData
                    success={success}/>
            </PostContext.Provider>

            <div className="d-grid  d-md-flex justify-content-md-end">
                <MyButton className="btn btn-primary" onClick={handleShow}>
                    Add ToDo
                </MyButton>
                <Modal show={postShow} onHide={handleClose}>
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
                                        postdata={postData}
                                        setPostdata={setPostData}
                                        clientsData={clientsData}
                                        getClients={getClients}
                                    />
                                    <InputForm
                                        postdata={postData}
                                        setPostdata={setPostData}
                                    />
                                </form>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <MyButton className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </MyButton>
                        <MyButton className="btn btn-primary" onClick={() => {
                            postToDo(postData)
                        }}>
                            Save Changes
                        </MyButton>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
};



export default ModalPostData;
