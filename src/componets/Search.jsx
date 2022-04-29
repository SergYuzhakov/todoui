import React from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import MySelect from "./UI/select/mySelect";

const Search = ({
                    filter, setFilter,
                    handleKey, fetchData, reset
                }) => {

    const selectShowRows = (select) => {
        setFilter({...filter, size:select});
    }


    return (
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <MyInput
                id="startDate"
                className="form-control"
                type="date"
                value={filter.fromDate.slice(0, 10)}
                onChange={(e) => setFilter({
                    ...filter, fromDate:
                        (e.target.value).concat('T', new Date().toTimeString().slice(0, 8))
                })}
            >
            </MyInput>

            <MyInput
                id="startDate"
                className="form-control"
                type="date"
                value={filter.toDate.slice(0, 10)}
                onChange={(e) => setFilter({
                    ...filter, toDate:
                        (e.target.value).concat('T', new Date().toTimeString().slice(0, 8))
                })}
            >
            </MyInput>

            <MyInput
                className="form-control"
                value={filter.filter}
                onChange={(e) => setFilter({...filter, filter: e.target.value})}
                type='text'
                placeholder='Search by Descriptino or Name'
                onKeyDown={handleKey}

            />
            <MySelect
                className='form-select'
                defaultValueName='Show 10 lines'
                defaultValue={10}
                value={filter.size}
                onChange={selectShowRows}
                options={[
                    {value: 20, name: 'Show 20 lines'},
                    {value: 30, name: 'Show 30 lines'},
                    {value: 50, name: 'Show 50 lines'}
                ]}
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