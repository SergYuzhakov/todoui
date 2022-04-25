import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import Loader from "./Loader/Loader";
import Table from "./Table/Table";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import MySelect from "./UI/select/mySelect";

const FetchData = ({title}) => {

    const initialUrl = 'http://localhost:8080/api/todo'
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [fetchURL, setFetchurl] = useState(initialUrl)
    const [filter, setFilter] = useState('')
    const [memoFilter, setMemofilter] = useState('')
    const [selectedSearch, setSelectedsearch] = useState('?filter=')


    useMemo(() => {
            const setUrl = () => {
                setFetchurl(initialUrl.concat(selectedSearch, filter))
                console.log("useMemo:" + fetchURL)
            };
            setUrl()
        },
        [memoFilter,selectedSearch])


    useEffect(() => {
        const fetchData = () => {
            axios.get(fetchURL)
                .then(response => setData(response.data))
                .then(setLoading(false))
            console.log('useEffect:' + fetchURL)
        };
        fetchData()
    },
        [fetchURL])

    const onRowSelect = (row) => (
        console.log("ToDo Id:" + row)

    )

    const onSearch = (search) => {
        setSelectedsearch(search)
    }

    const fetchDataFiltered = () => {
        setMemofilter(filter)
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            console.log('Enter Press')
            fetchDataFiltered()
        }
    }

    const resetSearch = () => {
        setSelectedsearch('?filter=')
        setFilter('')
        setMemofilter('')
        setFetchurl(initialUrl.concat(selectedSearch, filter))
    }

    return (
        <div className="container">

            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <hr/>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <MyInput
                    className="form-control"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    type='text'
                    placeholder='Search by'
                    onKeyDown={handleKeyDown}

                />
                <MySelect
                    className="form-select"
                    defaultValue="?filter="
                    defaultValueName='Description or Name'
                    value={selectedSearch}
                    onChange={onSearch}
                    options={[
                        {value: '/client?partName=', name: 'Name'}
                    ]}
                />
                <MyButton onClick={fetchDataFiltered} className="btn btn-primary">
                    <i className="bi bi-search" style={{fontSize: 15}}></i>
                </MyButton>

                <MyButton onClick={resetSearch} className="btn btn-primary">
                    <i className="bi bi-bootstrap-reboot"></i>
                </MyButton>
            </div>

            <hr/>

            {
                isLoading ? <Loader/> : <Table data={data}/>
            }


        </div>
    );

};

export default FetchData;