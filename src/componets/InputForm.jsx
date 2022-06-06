import React, {useContext} from 'react';
import MyInput from "./UI/input/MyInput";
import {PostDataContext} from "./context";

const InputForm = () => {
    const [postData, setPostData] = useContext(PostDataContext)

    return (
        <div>

            <label className="form-label" htmlFor="phoneNumber">
                Phone
            </label>
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

            <label className="form-label" htmlFor="email">
                Email
            </label>
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

            <label className="form-label" htmlFor="description">
                Description
            </label>
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