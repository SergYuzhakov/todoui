import React from 'react';
import {Modal} from "react-bootstrap";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";

const ModalUpdateData = ({
                             updateShow, handleClose,
                             updateToDo, setUpdateToDo,
                             patchToDo
                         }
) => {
    const completedTrue = (e) => {
        console.log(`Radio ${e.target.value}`)
        setUpdateToDo({...updateToDo, completed: true})
    }
    const completedFalse = (e) => {
        console.log(`Radio ${e.target.value}`)
        setUpdateToDo({...updateToDo, completed: false})
    }

    return (
        <div>
            <Modal show={updateShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update ToDo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
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
                    <MyButton className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </MyButton>
                    <MyButton className="btn btn-primary" onClick={patchToDo}>
                        Save Changes
                    </MyButton>
                </Modal.Footer>

            </Modal>

        </div>
    );
};

export default ModalUpdateData;