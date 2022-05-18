import React, {useContext} from "react";
import {Modal} from "react-bootstrap";
import {ModalPostDataContext} from "../context";

const ModalSuccessPostData = ({success}) => {

    const response = useContext(ModalPostDataContext)

    return (
        <div>
            <Modal
                show={success}
            >
                <Modal.Header bsPrefix="success-modal-header">
                    <Modal.Title bsPrefix="success-modal-title">
                        Operation success!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> Client: {response.client.name}</p>
                    <p> Description: {response.description}</p>
                    <p> Created: {response.created}</p>
                    <p> Modified: {response.modified}</p>
                </Modal.Body>

            </Modal>

        </div>
    );
};

export default ModalSuccessPostData;
