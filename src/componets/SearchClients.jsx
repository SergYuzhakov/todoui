import React, {useContext, useRef} from 'react';
import MyInput from "./UI/input/MyInput";
import {useFetching} from "./hooks/useFetching";
import ToDoService from "../API/ToDoService";
import {ClientsContext, PostDataContext} from "./context";
import Loader from "./UI/loader/Loader";
import MyButton from "./UI/button/MyButton";
import MyList from "./UI/datalist/MyList";

const SearchClients = () => {
        const urlClients = 'http://localhost:8080/api/clients?'

        const [clientsData, setClientsData] = useContext(ClientsContext)
        const [postData, setPostData] = useContext(PostDataContext)
        const clientSearchParams = {
            filter: ''
        }
        const queryData = new URLSearchParams(clientSearchParams)

        const [fetchClients, isFetching, fetchError] = useFetching(async (params) => {
            const response = await ToDoService.getAll(urlClients, params)

            setClientsData(() => response.data)

        })

        const getClients = () => {
            queryData.set('filter', postData.client.name)
            fetchClients(queryData)
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && e.target.value.length > 2) {
                getClients()
            }
        }

        const handleOnChange = (e) => {
            var clientId = getAttrDataList(e.target.value)
            clientId === null ?
                setPostData({
                    ...postData,
                    description: '',
                    client: {
                        ...postData.client,
                        id: null,
                        name: e.target.value,
                        elAddress: {
                            ...postData.client.elAddress,
                            email: '',
                            phoneNumber: ''
                        }
                    }
                })
                :
                fillClientData(e.target.value, clientId)
        }

        const fillClientData = (value, id) => {
            var name = value.slice(0, value.indexOf('/'))
            var email = value.slice(value.indexOf('/') + 1)
            clientsData.forEach((client) => {
                if (name === client.name &&
                    email === client.email) {
                    setPostData({
                        ...postData,
                        client: {
                            ...postData.client,
                            id: id,
                            name: client.name,
                            elAddress: {
                                ...postData.client.elAddress,
                                phoneNumber: client.phoneNumber,
                                email: client.email

                            }
                        }
                    });
                }
            })
        }

        const selectList = useRef()

        const getAttrDataList = (value) => {
            let attr = selectList.current.options.namedItem(value);
            return (attr === null ? null : attr.getAttribute("data-id"))
        }

        return (
            <div className='input-group rounded mb-3'>
                {fetchError &&
                    <h6>Network Error: Data Server Error</h6>
                }
                <span className="input-group-text">
                          CLient Name
                    </span>

                {isFetching ? <Loader/> :


                    <MyInput
                        list="clients-list"
                        id="searchName"
                        className="form-control"
                        value={postData.client.name}
                        onChange={handleOnChange}
                        type='text'
                        autoFocus
                        placeholder='Search or Input Client Name'
                        onKeyDown={handleKeyDown}

                    />}
                <MyList
                    ref={selectList}
                    clientsData={clientsData}
                    id="clients-list"
                />
                <MyButton onClick={getClients} className="btn btn-outline-secondary">
                    <i className="bi bi-search"></i>
                </MyButton>
            </div>
        );
    }
;

export default SearchClients;
