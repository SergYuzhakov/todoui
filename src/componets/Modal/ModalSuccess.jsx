import React from "react";
import {Modal} from "react-bootstrap";

const ModalSuccess = ({response, show}) => {

    return (
        <div>
            <Modal
                show={show.successShow}
            >
                <Modal.Header bsPrefix="success-modal-header">
                    <Modal.Title bsPrefix="success-modal-title">
                        Operation {show.successTitle} success!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> Client: </p>
                    <p className="pStyle"> {response.clientName}</p>
                    <p> Description:</p>
                    <p className="pStyle"> {response.description}</p>
                    <p> Created: {response.created} Modified:
                        {response.modified}</p>

                </Modal.Body>

            </Modal>

        </div>
    );
};

export default ModalSuccess;
