import React, {useEffect, useState} from 'react';
import axios from "axios";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";


const PostData = () => {
    const url = 'http://localhost:8080/api/todo'

    const initialState = {
        id: null,
        description: '',
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
    }

    const [postdata, setPostdata] = useState({...initialState});

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const [errormessage, setErrormessage] = useState({
        status: null,
        message: null,
        errors: []
    })
    /*
    По возвращению ошибки валидации данных при axios post запросе пригодился следующий топик:
    https://stackoverflow.com/questions/45017822/catching-error-body-using-axios-post
     */
    const addNewData = () => {
        console.log(postdata)

        axios.post(url, postdata, config)
            .catch(error => {
                setErrormessage(error.response.data);
            })
    }

    /*
    лог ошибки валидации, возвращаемый сервером, при обычном выводе в console.log срабатывал только при повторном нажатии кнопки формы.
    При использование  useEffect лог ошибок в консоли получается с первым нажатием
     */
    useEffect(() => {
        console.log(errormessage)
    }, [errormessage])


    const resetData = () => {
        setPostdata({...initialState})
    }

    /*
    Решение по изменению состояния вложенных объектов через useState подсмотрено здесь:
    https://stackoverflow.com/questions/56802815/react-hooks-how-do-i-update-state-on-a-nested-object-with-usestate
     */
    return (

        <form>
            <MyInput
                value={postdata.client.elAddress.phoneNumber}
                onChange={e => {
                    setPostdata({
                        ...postdata,
                        client: {
                            ...postdata.client,
                            elAddress: {
                                ...postdata.client.elAddress,
                                phoneNumber: e.target.value
                            }
                        }
                    })
                }}
                type='text'
                placeholder='Client Phone'/>

            <MyInput
                value={postdata.client.elAddress.email}
                onChange={e => {
                    setPostdata({
                        ...postdata,
                        client: {
                            ...postdata.client,
                            elAddress: {
                                ...postdata.client.elAddress,
                                email: e.target.value
                            }
                        }
                    })
                }}
                type='email'
                placeholder='Client Email'/>

            <MyInput
                value={postdata.client.name}
                onChange={e => {
                    setPostdata({
                        ...postdata,
                        client: {...postdata.client, name: e.target.value}
                    })
                }}
                type='text'
                placeholder='Client Name'/>

            <MyInput
                value={postdata.description}
                onChange={e => {
                    setPostdata({...postdata, description: e.target.value})
                }}
                type='text'
                placeholder='Description'/>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <MyButton onClick={addNewData}>Add ToDo</MyButton>
                <MyButton onClick={resetData}>Reset</MyButton>
            </div>
        </form>

    )
};


export default PostData;