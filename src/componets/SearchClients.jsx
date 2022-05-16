import React from 'react';
import MyInput from "./UI/input/MyInput";
import MyDataList from "./UI/datalist/MyDataList";

const SearchClients = ({
                           postdata, setPostdata,
                           clientsData,
                           getClients
                       }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getClients()
        }
    }

    const handleOnChange = (e) => {
        setPostdata({
            ...postdata,
            client: {...postdata.client, name: e.target.value}
        })
    }

    return (
        <div className='d-grid d-md-flex justify-content-md-end'>
            <MyInput
                list="clients-list"
                id="searchName"
                className="form-control rounded mb-3"
                value={postdata.client.name}
                onChange={handleOnChange}
                type='text'
                autoFocus
                placeholder='Search or Input Client Name'
                onKeyDown={handleKeyDown}

            />
            <MyDataList
                clientsData={clientsData}
                id="clients-list"
            />
            <i className="bi bi-search ms-3 h-100" style={{fontSize: 20}}></i>
        </div>
    );
};

export default SearchClients;
