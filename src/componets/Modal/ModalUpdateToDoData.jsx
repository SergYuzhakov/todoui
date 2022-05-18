import React, {useContext} from 'react';
import {Modal} from "react-bootstrap";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import {ErrorContext} from "../context";
import {useFetching} from "../hooks/useFetching";
import ToDoService from "../../API/ToDoService";
import Loader from "../UI/loader/Loader";

const ModalUpdateToDoData = ({
                                 updateToDo, setUpdateToDo,
                                 updateShow, setUpdateShow,
                                 setErrorShow
                             }) => {
    const setErrorMessage = useContext(ErrorContext)

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


    const completedTrue = (e) => {
        setUpdateToDo({...updateToDo, completed: true})
    }
    const completedFalse = (e) => {
        setUpdateToDo({...updateToDo, completed: false})
    }

    const handleUpdateClose = () => {
        setUpdateShow(false)
    }


    return (
        isPatching ? <Loader/> :
            <div>
                <Modal show={updateShow} onHide={handleUpdateClose}>
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
                    </Modal.Footer>

                </Modal>

            </div>
    );
};

export default ModalUpdateToDoData;