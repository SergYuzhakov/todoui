import React from 'react';
import {Modal} from "react-bootstrap";
import MyButton from "../UI/button/MyButton";
import SaveButton from "../UI/button/SaveButton";

const ModalAlert = ({
                        title,
                        alertShow,
                        alertClose,
                        alertFunction,
                        message, error,
                        isDeleting
                    }
) => {

    const alertMessage = (e) => {
        return ((e.length > 1) ? error : message)
    }

    return (
        <div>
            <Modal show={alertShow} onHide={alertClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="pStyle">{alertMessage(error)}</p>
                </Modal.Body>

                <Modal.Footer>
                    <MyButton className="btn btn-secondary" onClick={alertClose}>
                        Close
                    </MyButton>
                    <SaveButton
                        onClickFunc={alertFunction}
                        isDisabled={isDeleting}
                        isDoing={isDeleting}
                        title='OK'
                        doingTitle='Deleting...'/>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalAlert;