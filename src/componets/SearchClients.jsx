import React, {useContext, useEffect} from 'react';
import MyInput from "./UI/input/MyInput";
import MyDataList from "./UI/datalist/MyDataList";
import {useFetching} from "./hooks/useFetching";
import ToDoService from "../API/ToDoService";
import {ClientsContext, PostDataContext} from "./context";
import Loader from "./UI/loader/Loader";

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

        useEffect(() => {
            const fillData = () => {
                clientsData.forEach((client) => {
                    if (postData.client.id === client.id) {
                        setPostData({
                            ...postData,
                            client: {
                                ...postData.client,
                                name: client.name,
                                elAddress: {
                                    ...postData.client.elAddress,
                                    phoneNumber: client.phoneNumber,
                                    email: client.email

                                }
                            }
                    })
                        ;
                    }
                })
            }
            fillData()
        }, [postData.client.id])// eslint-disable-line react-hooks/exhaustive-deps


        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                getClients()
            }
        }

        const handleOnChange = (e) => {

            console.log(e.target.value)

            setPostData({
                ...postData,
                client: {
                    ...postData.client, name: e.target.value,
                    id: e.target.value
                }
            })


        }


        return (
            <div>
                {fetchError &&
                    <h6>Network Error: Data Server Error</h6>
                }
                <label className="form-label" htmlFor="searchName">
                    CLient Name
                </label>
                <div className='d-grid d-md-flex justify-content-md-end'>
                    {isFetching ? <Loader/> :
                        <MyInput
                            list="clients-list"
                            id="searchName"
                            className="form-control rounded mb-3"
                            value={postData.client.name}
                            onChange={handleOnChange}
                            type='text'
                            autoFocus
                            placeholder='Search or Input Client Name'
                            onKeyDown={handleKeyDown}

                        />}
                    <MyDataList
                        clientsData={clientsData}
                        id="clients-list"
                    />
                    <i className="bi bi-search ms-3 h-100" style={{fontSize: 20}}></i>
                </div>
            </div>
        );
    }
;

export default SearchClients;
