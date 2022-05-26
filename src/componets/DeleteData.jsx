import React, {useContext} from 'react';
import ModalAlert from "./Modal/ModalAlert";
import Loader from "./UI/loader/Loader";
import {ErrorContext, ResponseDataContext, ShowContext} from "./context";
import {useFetching} from "./hooks/useFetching";
import ToDoService from "../API/ToDoService";

const DeleteData = ({updateToDo}) => {

    const [errorMessage, setErrorMessage] = useContext(ErrorContext)
    const [responseData, setResponseData] = useContext(ResponseDataContext)
    const [show, setShow] = useContext(ShowContext)

    const updateUrl = 'http://localhost:8080/api/todo/'

    const [delToDo, isDeleting, delError] = useFetching(async (id) => {
        const response = await ToDoService.deleteToDo(updateUrl + id)
        console.log(response)
        if (response.status === 404) {
            setErrorMessage({...errorMessage, message: response.message})
            setShow({...show, errorShow: true})
        }
        if (response.status === 204) {
            setShow({
                ...show, successShow: true,
                alertShow: false,
                updateShow: false,
                successTitle: 'delete is'
            })
            setTimeout(() => {
                setShow({
                    ...show, successShow: false,
                    updateShow: false,
                    alertShow: false
                })
            }, 3000)
            setResponseData({
                ...responseData,
                clientName: updateToDo.name,
                description: updateToDo.description
            })

        }

    })

    const deleteToDo = () => {
        console.log(`Delete ToDo with id: ${updateToDo.id}`)
        delToDo(updateToDo.id)

    }
    const handleAlertClose = () => {
        setShow({...show, alertShow: false})
    }

    return (
        <div>
            {isDeleting ? <Loader/> :
                <ModalAlert
                    title="Delete ToDo"
                    alertShow={show.alertShow}
                    alertClose={handleAlertClose}
                    alertFunction={deleteToDo}
                    message="Are you sure?"
                    error={delError}
                />}


        </div>
    );
};

export default DeleteData;