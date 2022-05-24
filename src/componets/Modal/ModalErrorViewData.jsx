import React, {useContext} from 'react';
import {Modal} from "react-bootstrap";
import MyButton from "../UI/button/MyButton";
import {ShowContext} from "../context";

const ModalErrorViewData = ({errorMessage}) => {

    const [errorShow, setErrorShow] = useContext(ShowContext)

    const handleErrorClose = () => {
        setErrorShow({...errorShow, errorShow: false});
    }

    return (
        <div>
            <Modal
                show={errorShow.errorShow}
            >
                <Modal.Header bsPrefix="error-modal-header">
                    <Modal.Title
                        bsPrefix="error-modal-title">
                        <p>Validation error.</p>
                        <p>Error Status: {errorMessage.status}</p>
                        <p>Check 'errors' field for details.</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    bsPrefix="error-modal-body"
                >
                    Error Filds:
                    <ul>
                        {errorMessage.message}
                    </ul>

                    <ul>
                        {errorMessage.errors.map((err, index) => (
                            <li key={index}> <h6>{err.field}</h6> : {err.message}</li>
                        ))}
                    </ul>

                </Modal.Body>
                <Modal.Footer>
                    <MyButton className="btn btn-danger" onClick={handleErrorClose}>
                        Close
                    </MyButton>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default ModalErrorViewData;
