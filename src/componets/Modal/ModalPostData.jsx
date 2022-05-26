import React, {useContext} from 'react';
import {Modal} from "react-bootstrap";
import MyButton from "../UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import ToDoService from "../../API/ToDoService";
import Loader from "../UI/loader/Loader";
import SearchClients from "../SearchClients";
import {PostDataContext, ResponseDataContext, ShowContext} from "../context";
import InputForm from "../InputForm";


const ModalPostData = ({
                           initialStateToDo, setErrorMessage

                       }) => {

    const url = 'http://localhost:8080/api/todo'

    const [show, setShow] = useContext(ShowContext)
    const [postData, setPostData] = useContext(PostDataContext)
    const [postResponse, setPostResponse] = useContext(ResponseDataContext)

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

    const handleClose = () => {
        if (!show.errorShow) {
            setShow({...show, postShow: false});
        }
    }

    const handleShow = () => setShow({...show, postShow: true})

    return (

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
                            postError &&
                            <h6>Network Error: {postError}</h6>
                        }
                        {
                            isPosting ? <Loader/> :
                                <form>
                                    <SearchClients/>
                                    <InputForm/>
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

    );
};


export default ModalPostData;
