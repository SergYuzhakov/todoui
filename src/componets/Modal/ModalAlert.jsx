import React from 'react';
import {Modal} from "react-bootstrap";
import MyButton from "../UI/button/MyButton";

const ModalAlert = ({
                        title,
                        alertShow,
                        alertClose,
                        alertFunction,
    message, error
                    }
) => {

    const mess = () => {
        if(error){return "Network Error: Data Server Error"}
        return message
    }

    return (
        <div>

            <Modal show={alertShow} onHide={alertClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="pStyle">{mess}</p>
                </Modal.Body>

                <Modal.Footer>
                    <MyButton className="btn btn-secondary" onClick={alertClose}>
                        Close
                    </MyButton>
                    <MyButton className="btn btn-primary" onClick={alertFunction}>
                        OK
                    </MyButton>
                </Modal.Footer>

            </Modal>


        </div>
    );
};

export default ModalAlert;