import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "./Pagination";
import Table from "./Table/Table";
import Search from "./Search";


const FetchPageableData = ({title}) => {

    const Url = 'http://localhost:8080/api/todoPageable?'
    const [sizePage, setSizepage] = useState(10)
    const queryPageableValue = new URLSearchParams({
        page: 0,
        size: sizePage,
        filter: ''
    })
    const initialUrl = Url.concat(queryPageableValue)
    const [pageData, setPagedata] = useState({
        content: [],
        pageable: {
            page: 0,
            size: 0,
            sort: {
                orders: []
            }
        },
        total: 0
    });

    const [fetchUrl, setFetchUrl] = useState(initialUrl)
    const [filter, setFilter] = useState('')


    useEffect(() => {
        const fetch = () => {
            axios.get(fetchUrl)
                .then(response => setPagedata(response.data))
            console.log(`useEffect: ${fetchUrl}`)
        };

        fetch()
    }, [fetchUrl])

    const fetchData = (() => {
        queryPageableValue.set('filter', filter);
        console.log(`FetchData: pagesize - ${queryPageableValue.get('size')}`)
        setFetchUrl(() => Url.concat(queryPageableValue))
    });

    const onRowSelect = (row) => (
        console.log("ToDo Id:" + row)
    )

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchData()
        }
    }

    const incPage = (page) => {
        if (pageData.pageable.page < (page - 1)) {
            queryPageableValue.set('page',
                pageData.pageable.page + 1);
            setFetchUrl(() => Url.concat(queryPageableValue))
        }
    }

    const decPage = (page) => {
        if (pageData.pageable.page <= (page - 1) && pageData.pageable.page > 0) {
            queryPageableValue.set('page',
                pageData.pageable.page - 1);
            setFetchUrl(() => Url.concat(queryPageableValue))
        }
    }

    const showSelectedRows = (selectedRows) => {
        setSizepage(() => selectedRows)
        queryPageableValue.set('size', selectedRows)
        console.log(`Size page:${queryPageableValue.get('size')} lines`)
        setFetchUrl(() => Url.concat(queryPageableValue))
    }

    const resetSearch = () => {
        setFilter(() => '')
        queryPageableValue.set('filter', '');
        setFetchUrl(() => initialUrl)
    }

    return (
        <div className="container">

            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <hr/>
            <div>
                <Search
                    filter={filter}
                    setFilter={setFilter}
                    handleKey={handleKeyDown}
                    fetchData={fetchData}
                    reset={resetSearch}/>
                <hr/>
                <Table
                    data={pageData}
                    onRowSelectInf={onRowSelect}
                />
                <hr/>
                <Pagination
                    showSelectedRows={showSelectedRows}
                    decrementPage={decPage}
                    incrementPage={incPage}
                    dataPage={pageData}
                    />

            </div>

            <hr/>

        </div>
    )
        ;
};


export default FetchPageableData;