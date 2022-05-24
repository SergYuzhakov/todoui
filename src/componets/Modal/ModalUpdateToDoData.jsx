import React, {useContext} from 'react';
import {Modal} from "react-bootstrap";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import {ErrorContext, ResponseDataContext, ShowContext} from "../context";
import {useFetching} from "../hooks/useFetching";
import ToDoService from "../../API/ToDoService";
import Loader from "../UI/loader/Loader";
import ModalAlert from "./ModalAlert";

const ModalUpdateToDoData = ({
                                 updateToDo, setUpdateToDo

                             }) => {
    const [errorMessage, setErrorMessage] = useContext(ErrorContext)
    const [responseUpdateData, setResponseUpdateData] = useContext(ResponseDataContext)
    const [show, setShow] = useContext(ShowContext)

    const updateUrl = 'http://localhost:8080/api/todo/'
    const patchToDoParams = {
        description: '',
        completed: false
    }
    const patchQueryData = new URLSearchParams(patchToDoParams)

    const [patchToDo, isPatching, patchError] = useFetching(async (params) => {
        const response = await ToDoService.patchToDo(updateUrl + updateToDo.id + '?', params)
        console.log(response)
        if (response.status === 422) {
            setErrorMessage(response)
            setShow({...show, errorShow: true})
        }
        if (response.status === 201) {
            setShow({
                ...show, successShow: true,
                updateShow: false,
                successTitle: "update is"
            })
            setTimeout(() => {
                setShow({
                    ...show, successShow: false,
                    updateShow: false
                })
            }, 3000)

            setResponseUpdateData({
                ...responseUpdateData,
                clientName: response.data.client.name,
                description: response.data.description,
                created: response.data.created,
                modified: response.data.modified
            })
        }
    })

    const [delToDo, isDeleting, delError] = useFetching(async (id) => {
        const response = await ToDoService.deleteToDo(updateUrl + id)

        console.log(response)
        if (response.status === 404) {
            setErrorMessage({...errorMessage, message: response.message})
            setShow({...show, errorShow: true})
        }
        if (response.status === 204) {
            setShow({
                ...show, successShow: true,
                alertShow: false,
                updateShow: false,
                successTitle: 'delete is'
            })
            setTimeout(() => {
                setShow({
                    ...show, successShow: false,
                    alertShow: false,
                    updateShow: false
                })
            }, 3000)
            setResponseUpdateData({
                ...responseUpdateData,
                clientName: '',
                description: updateToDo.description
            })
        }
    })


    const patch = () => {
        patchQueryData.set('description', updateToDo.description)
        patchQueryData.set('completed', updateToDo.completed)
        patchToDo(patchQueryData)
    }


    const completedTrue = () => {
        setUpdateToDo({...updateToDo, completed: true})
    }
    const completedFalse = () => {
        setUpdateToDo({...updateToDo, completed: false})
    }

    const handleUpdateClose = () => {
        setShow({...show, updateShow: false})
    }

    const deleteToDo = () => {
        console.log(`Delete ToDo with id: ${updateToDo.id}`)
        delToDo(updateToDo.id)

    }
    const handleAlertClose = () => {
        setShow({...show, alertShow: false})
    }


    return (
        isPatching ? <Loader/> :
            <div>
                <Modal show={show.updateShow} onHide={handleUpdateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update ToDo</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {
                            patchError &&
                            <h6>Network Error: Data Server Error</h6>
                        }

                        <form>
                            <label className="form-label" htmlFor="clientName">
                                Client Name
                            </label>
                            <MyInput
                                id="clientName"
                                readOnly
                                className="form-control rounded mb-3"
                                defaultValue={updateToDo.name}
                                type='text'
                            />
                            <label className="form-label" htmlFor="description">
                                Description
                            </label>
                            <MyInput
                                id="description"
                                className="form-control rounded mb-3"
                                value={updateToDo.description}
                                onChange={e => {
                                    setUpdateToDo({...updateToDo, description: e.target.value})
                                }}
                                type='text'
                            />
                            <div className="form-check">
                                <MyInput
                                    className="form-check-input"
                                    type="radio"
                                    name="completed"
                                    id="flexRadioDefault1"
                                    value={updateToDo.completed}
                                    checked={true === updateToDo.completed}
                                    onChange={completedTrue}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault1">
                                    Completed ToDo
                                </label>
                            </div>
                            <div className="form-check">
                                <MyInput
                                    className="form-check-input"
                                    type="radio"
                                    name="completed"
                                    id="flexRadioDefault2"
                                    value={updateToDo.completed}
                                    checked={false === updateToDo.completed}
                                    onChange={completedFalse}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexRadioDefault2">
                                    Uncompleted ToDo
                                </label>
                            </div>

                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <MyButton className="btn btn-secondary" onClick={handleUpdateClose}>
                            Close
                        </MyButton>
                        <MyButton className="btn btn-primary" onClick={patch}>
                            Save Changes
                        </MyButton>
                        <MyButton className="btn btn-danger" onClick={() =>
                            setShow({...show, alertShow: true})}>
                            Delete ToDo
                        </MyButton>

                    </Modal.Footer>
                </Modal>

                {
                    delError &&
                    <h6>Network Error: Data Server Error</h6>
                }
                {isDeleting ? <Loader/> :
                    <ModalAlert
                        title="Delete ToDo"
                        alertShow={show.alertShow}
                        alertClose={handleAlertClose}
                        alertFunction={deleteToDo}
                    />}

            </div>
    );
};

export default ModalUpdateToDoData;