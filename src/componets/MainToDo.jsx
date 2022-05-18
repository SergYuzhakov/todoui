import React, {useState} from 'react';
import ModalPostData from "./Modal/ModalPostData";
import ModalUpdateToDoData from "./Modal/ModalUpdateToDoData";
import ModalErrorViewData from "./Modal/ModalErrorViewData";
import ModalUpdateClientsData from "./Modal/ModalUpdateClientsData";
import {ErrorContext} from "./context";

const MainToDo = () => {
    const [errorShow, setErrorShow] = useState(false)
    const [success, setSuccess] = useState(false)

    const [updateToDo, setUpdateToDo] = useState({
        id: null,
        name: '',
        description: '',
        completed: false
    })


    const [errorMessage, setErrorMessage] = useState({
        status: null,
        message: null,
        errors: [{}]
    });

    const [updateShow, setUpdateShow] = useState(false)


    const onRowSelect = (rowName, rowItem) => {
        if (rowName === 'description') {
            setUpdateToDo({
                id: rowItem.id,
                name: rowItem.clientName,
                description: rowItem.description,
                completed: rowItem.completed
            })
            setUpdateShow(true)
        }
        if (rowName === 'clientName')
            console.log(`Client Id: ${rowItem.clientId}`)
    }

    const handleErrorClose = () => {
        setErrorShow(false);
    }

    return (
        <div>
            <ErrorContext.Provider value={setErrorMessage}>
                <ModalPostData
                    errorShow={errorShow}
                    setErrorShow={setErrorShow}
                    onRowSelect={onRowSelect}
                    success={success}
                    setSuccess={setSuccess}

                />

                <ModalUpdateToDoData
                    updateToDo={updateToDo}
                    setUpdateToDo={setUpdateToDo}
                    updateShow={updateShow}
                    setUpdateShow={setUpdateShow}
                    setErrorShow={setErrorShow}
                />
            </ErrorContext.Provider>

            <ModalUpdateClientsData

            />

            <ModalErrorViewData
                errorShow={errorShow}
                errormessage={errorMessage}
                handleErrorClose={handleErrorClose}

            />

        </div>
    );
};


export default MainToDo;