import React from 'react';
import MyInput from "./UI/input/MyInput";

const InputForm = ({postdata, setPostdata}) => {
    return (
        <div>
            <MyInput
                className="form-control rounded mb-3"
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
                className="form-control rounded mb-3"
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
                className="form-control rounded mb-3"
                value={postdata.description}
                onChange={e => {
                    setPostdata({...postdata, description: e.target.value})
                }}
                type='text'
                placeholder='Description'/>

        </div>
    );
};

export default InputForm;