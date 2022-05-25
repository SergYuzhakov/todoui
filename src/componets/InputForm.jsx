import React, {useContext} from 'react';
import MyInput from "./UI/input/MyInput";
import {PostDataContext} from "./context";

const InputForm = () => {
    const [postData, setPostData] = useContext(PostDataContext)

    return (
        <div>
            <MyInput
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

            <MyInput
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

            <MyInput
                className="form-control rounded mb-3"
                value={postData.description}
                onChange={e => {
                    setPostData({...postData, description: e.target.value})
                }}
                type='text'
                placeholder='Description'/>

        </div>
    );
};

export default InputForm;