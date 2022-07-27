import React, {useContext} from 'react';
import MyInput from "./UI/input/MyInput";
import {PostDataContext} from "./context";

const InputForm = () => {
    const [postData, setPostData] = useContext(PostDataContext)

    return (

        <div>

            <div className='form-floating flex-sm-grow-1'>
                <MyInput
                    id="phoneNumber"
                    className="form-control rounded mb-3"
                    value={postData.client.elAddress.phoneNumber}
                    onChange={e => {
                        setPostData({
                            ...postData,
                            client: {
                                ...postData.client,
                                elAddress: {
                                    ...postData.client.elAddress,
                                    phoneNumber: e.target.value
                                }
                            }
                        })
                    }}
                    type='text'
                    placeholder='Client Phone'/>
                <label htmlFor='phoneNumber'>Phone</label>
            </div>

            <div className='form-floating flex-sm-grow-1'>
                <MyInput
                    id="email"
                    className="form-control rounded mb-3"
                    value={postData.client.elAddress.email}
                    onChange={e => {
                        setPostData({
                            ...postData,
                            client: {
                                ...postData.client,
                                elAddress: {
                                    ...postData.client.elAddress,
                                    email: e.target.value
                                }
                            }
                        })
                    }}
                    type='email'
                    placeholder='Client Email'/>
                <label htmlFor='email'>Email</label>
            </div>

            <div className='form-floating flex-grow-1 mb-3'>
                <MyInput
                    className="form-control rounded mb-3"
                    id='description'
                    value={postData.description}
                    onChange={e => {
                        setPostData({...postData, description: e.target.value})
                    }}
                    type='text'
                    placeholder='Description'/>
                <label htmlFor='description'>Description</label>
            </div>

        </div>


    );
};

export default InputForm;