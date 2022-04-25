import React from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const Search = ({filter, setFilter, handleKey, fetchData, reset}) => {
    return (
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <MyInput
                className="form-control"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                type='text'
                placeholder='Search by'
                onKeyDown={handleKey}

            />
            <MyButton onClick={fetchData} className="btn btn-primary">
                <i className="bi bi-search" style={{fontSize: 15}}></i>
            </MyButton>

            <MyButton onClick={reset} className="btn btn-primary">
                <i className="bi bi-bootstrap-reboot"></i>
            </MyButton>

        </div>
    );
};

export default Search;