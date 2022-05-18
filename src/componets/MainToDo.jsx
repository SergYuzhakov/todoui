import React, {useState} from 'react';
import ModalPostData from "./Modal/ModalPostData";
import ModalUpdateToDoData from "./Modal/ModalUpdateToDoData";
import ModalErrorViewData from "./Modal/ModalErrorViewData";
import ModalUpdateClientsData from "./Modal/ModalUpdateClientsData";
import {ErrorContext, PostDataContext, ResponseDataContext} from "./context";

const MainToDo = () => {
    const [errorShow, setErrorShow] = useState(false)
    const [success, setSuccess] = useState(false)

    const initialStateToDo = {
        id: null,
        description: '',
        completed: false,
        client: {
            id: null,
            name: '',
            elAddress: {
                email: '',
                phoneNumber: ''
            },
            homeAddress: {
                city: '',
                street: '',
                houseNumber: ''
            }
        }
    };

    const [postData, setPostData] = useState({...initialStateToDo});
    const [postResponse, setPostResponse] = useState({...initialStateToDo})

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
            <PostDataContext.Provider value={[postData, setPostData]}>
                <ResponseDataContext.Provider value={[postResponse, setPostResponse]}>
                    <ErrorContext.Provider value={setErrorMessage}>
                        <ModalPostData
                            errorShow={errorShow}
                            setErrorShow={setErrorShow}
                            onRowSelect={onRowSelect}
                            success={success}
                            setSuccess={setSuccess}
                            initialStateToDo={initialStateToDo}
                        />

                        <ModalUpdateToDoData
                            updateToDo={updateToDo}
                            setUpdateToDo={setUpdateToDo}
                            updateShow={updateShow}
                            setUpdateShow={setUpdateShow}
                            setErrorShow={setErrorShow}
                            setSuccess={setSuccess}
                        />


                        <ModalUpdateClientsData

                        />
                    </ErrorContext.Provider>
                </ResponseDataContext.Provider>
            </PostDataContext.Provider>

            <ModalErrorViewData
                errorShow={errorShow}
                errormessage={errorMessage}
                handleErrorClose={handleErrorClose}

            />

        </div>
    );
};


export default MainToDo;