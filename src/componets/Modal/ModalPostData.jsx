import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import MyButton from "../UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import ToDoService from "../../API/ToDoService";
import Loader from "../UI/loader/Loader";
import SearchClients from "../SearchClients";
import {ErrorContext, PostDataContext, ResponseDataContext, ShowContext} from "../context";
import InputForm from "../InputForm";


const ModalPostData = ({
                           initialStateToDo


                       }) => {

    const url = 'http://localhost:8080/api/todo'
    const urlClients = 'http://localhost:8080/api/clients?'

    const [show, setShow] = useContext(ShowContext)
    const [postData, setPostData] = useContext(PostDataContext)
    const [postResponse, setPostResponse] = useContext(ResponseDataContext)
    const [errorMessage, setErrorMessage] = useContext(ErrorContext)
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


    const [fetchClients, isLoading, fetchError] = useFetching(async (params) => {
        const response = await ToDoService.getAll(urlClients, params)
        setClientsData(() => response.data)

    })

    const [postToDo, isPosting, postError] = useFetching(async (params) => {
        const response = await ToDoService.createToDo(url, params)
        console.log(response)
        if (response.status === 422) {
            setErrorMessage(response)
            setShow({
                ...show, errorShow: true,
                postShow: false
            })
        }
        if (response.status === 201) {
            setShow({
                ...show, successShow: true,
                postShow: false,
                successTitle: "created is"
            })
            setPostData({...initialStateToDo});
            setTimeout(() => {
                setShow({
                    ...show, successShow: false,
                    postShow: false
                })
            }, 3000)

            setPostResponse({
                ...postResponse,
                clientName: response.data.client.name,
                description: response.data.description,
                created: response.data.created,
                modified: response.data.modified
            })

        }

    })

    const getClients = () => {
        queryData.set('filter', postData.client.name)
        fetchClients(queryData)
    }

    const handleClose = () => {
        if (!show.errorShow) {
            setShow({...show, postShow: false});
            setPostData({...initialStateToDo})
        }
    }

    const handleShow = () => setShow({...show, postShow: true})

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

            <div className="d-grid  d-md-flex justify-content-md-end">
                <MyButton className="btn btn-primary" onClick={handleShow}>
                    Add ToDo
                </MyButton>
                <Modal show={show.postShow} onHide={handleClose}>
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
