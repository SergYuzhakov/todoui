import React, {useContext} from 'react';
import MyInput from "./UI/input/MyInput";
import MyDataList from "./UI/datalist/MyDataList";
import {useFetching} from "./hooks/useFetching";
import ToDoService from "../API/ToDoService";
import {ClientsContext, PostDataContext} from "./context";
import Loader from "./UI/loader/Loader";
import MyButton from "./UI/button/MyButton";

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

    const inputListener = () => {
        var a = document.getElementsByName('inputClient')[0]
        a.addEventListener('change', function () {
            console.log(this.value)
        })
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
            }})
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

    const getAttrDataList = (value) => {
        var selectList = document.getElementById('clients-list')
        var attr = selectList.options.namedItem(value)
        return (attr === null ? null : attr.getAttribute("data-id"))
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
                    <MyButton  onClick={getClients} className="btn btn-primary ms-3 h-100" >
                        <i className="bi bi-search ms-3 h-100" style={{fontSize: 20}}></i>
                    </MyButton>

                </div>
            </div>
        );
    }
;

export default SearchClients;
