import React, {useState} from 'react';
import ModalPostData from "./Modal/ModalPostData";
import ModalUpdateToDoData from "./Modal/ModalUpdateToDoData";
import ModalErrorViewData from "./Modal/ModalErrorViewData";
import ModalUpdateClientsData from "./Modal/ModalUpdateClientsData";
import {ErrorContext, PostDataContext, ResponseDataContext, ShowContext} from "./context";
import FetchPageableData from "./FetchPageableData";
import ModalSuccess from "./Modal/ModalSuccess";

const MainToDo = () => {

    const initialStateToDo = {
        id: null,
        description: '',
        completed: false,
        created: null,
        modified: null,
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

    const modalShow = {
        postShow: false,
        updateShow: false,
        errorShow: false,
        successShow: false,
        deleteShow: false,
        alertShow: false,
        successTitle: ""
    }

    const [show, setShow] = useState({...modalShow})
    const [postData, setPostData] = useState({...initialStateToDo});
    const [postResponse, setPostResponse] = useState({
        clientName: '',
        description: '',
        created: null,
        modified: null
    })

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


    const onRowSelect = (rowName, rowItem) => {
        if (rowName === 'description') {
            setUpdateToDo({
                id: rowItem.id,
                name: rowItem.clientName,
                description: rowItem.description,
                completed: rowItem.completed
            })
            setShow({...show, updateShow: true})
        }
        if (rowName === 'clientName')
            console.log(`Client Id: ${rowItem.clientId}`)
    }

    return (
        <div>
            <PostDataContext.Provider value={[postData, setPostData]}>
                <ResponseDataContext.Provider value={[postResponse, setPostResponse]}>
                    <ErrorContext.Provider value={[errorMessage, setErrorMessage]}>
                        <ShowContext.Provider value={[show, setShow]}>

                            <FetchPageableData
                                onRowSelect={onRowSelect}
                                title={"Список ToDo"}
                                response={postResponse}
                            />

                            <ModalPostData
                                setErorMessage={setErrorMessage}
                                initialStateToDo={initialStateToDo}
                            />

                            <ModalUpdateToDoData
                                updateToDo={updateToDo}
                                setUpdateToDo={setUpdateToDo}
                            />

                            <ModalSuccess
                                response={postResponse}
                                show={show}
                            />

                            <ModalUpdateClientsData

                            />
                            <ModalErrorViewData
                                errorMessage={errorMessage}
                            />
                        </ShowContext.Provider>
                    </ErrorContext.Provider>
                </ResponseDataContext.Provider>
            </PostDataContext.Provider>

        </div>
    );
};


export default MainToDo;