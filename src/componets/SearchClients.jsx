import React, {useContext, useRef, useState} from 'react';
import MyInput from "./UI/input/MyInput";
import {useFetching} from "./hooks/useFetching";
import ToDoService from "../API/ToDoService";
import {ClientsContext, PostDataContext} from "./context";
import MyList from "./UI/datalist/MyList";
import SaveButton from "./UI/button/SaveButton";
import MyButton from "./UI/button/MyButton";

const SearchClients = ({postError}) => {
    const urlClients = 'http://localhost:8080/api/clients?'

    const [clientsData, setClientsData] = useContext(ClientsContext)
    const [postData, setPostData] = useContext(PostDataContext)
    const [isSearch, setIsSearch] = useState(() => {
        return (postData.client.name.length <= 2)
    })

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

    const clearDataInput = () => {
        setPostData({
            ...postData,
            description: '',
            client: {
                ...postData.client,
                name: '',
                elAddress: {
                    ...postData.client.elAddress,
                    email: '',
                    phoneNumber: ''
                }
            }
        })
        setIsSearch(true)
    }


    const handleOnChange = (e) => {
        e.target.value.length > 2 ? setIsSearch(false) : setIsSearch(true)
        let clientId = getAttrDataList(e.target.value)
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
        let name = value.slice(0, value.indexOf('/'));
        let email = value.slice(value.indexOf('/') + 1);
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

        <div>
                <span>
                {(fetchError || postError) &&
                    <h6>Network Error: Data Server Error</h6>
                }
</span>
            <div className='input-group mb-3'>
                <div className='form-floating flex-sm-grow-1'>
                    <MyInput
                        list="clients-list"
                        id="searchName"
                        name="inputClient"
                        className="form-control"
                        value={postData.client.name}
                        onChange={handleOnChange}
                        type='text'
                        autoFocus
                        placeholder='Search'
                        onKeyDown={handleKeyDown}
                    />

                    <MyList
                        ref={selectList}
                        clientsData={clientsData}
                        id="clients-list"
                    />
                    <label htmlFor='searchName'>Search or Input Client Name</label>
                </div>

                <MyButton
                    className="btn btn-outline-secondary"
                    onClick={clearDataInput}>
                    <i className="bi bi-x-lg"/>
                </MyButton>


                <SaveButton
                        isDisabled={(isSearch || isFetching)}
                        onClickFunc={getClients}
                        isDoing={isFetching}
                        title={<i className="bi bi-search"/>}
                        doingTitle='Searching...'
                    />

                </div>

            </div>



    )
        ;
};

export default SearchClients;
