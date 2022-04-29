import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from "./Pagination";
import Table from "./Table/Table";
import Search from "./Search";


const FetchPageableData = ({title}) => {

        const Url = 'http://localhost:8080/api/todoPageable?'
        const todayDate = new Date(new Date().getTime() + 10800000).toISOString()
        const startDate = new Date(new Date()
            .getFullYear(), new Date().getMonth(), 2).toISOString()

        const queryInitialState = {
            page: 0,
            size: 10,
            filter: '',
            fromDate: startDate,
            toDate: todayDate
        }
        const pageDateInitialState = {
            content: [],
            pageable: {
                page: 0,
                size: 0,
                sort: {
                    orders: []
                }
            },
            total: 0
        }

        const [queryObject, setQueryObject] = useState(queryInitialState)

        const queryPageableValue = new URLSearchParams(queryObject)

        const [pageData, setPagedata] = useState(pageDateInitialState);

        const [fetchUrl, setFetchUrl] = useState(Url.concat(queryPageableValue))

        const resetQuery = new URLSearchParams(queryInitialState)

        useEffect(() => {
            const fetch = () => {
                axios.get(fetchUrl)
                    .then(response => setPagedata(response.data))
                console.log(`useEffect: ${fetchUrl}`)
            };
            fetch()
        }, [fetchUrl])

        const fetchData = (() => {
            setFetchUrl(() => Url.concat(queryPageableValue))
        });

        const onRowSelectInf = (rowName, rowItem) => {
            if (rowName === 'description')
                console.log(`ToDo Id: ${rowItem.id}`)
            if (rowName === 'clientName')
                console.log(`Client Id: ${rowItem.clientId}`)
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                fetchData()
            }
        }

        const incPage = (totalPage) => {
            if (pageData.pageable.page < (totalPage - 1)) {
                queryPageableValue.set('page',
                    pageData.pageable.page + 1);
                console.log(`IncPage: page- ${queryObject.page}`)
            }
            fetchData()
        }

        const decPage = (totalPage) => {
            if (pageData.pageable.page <= (totalPage - 1) && pageData.pageable.page > 0) {
                queryPageableValue.set('page',
                    pageData.pageable.page - 1);
                console.log(`DecPage: page- ${queryObject.page}`)
            }
            fetchData()
        }

        const resetSearch = () => {
            setQueryObject(queryInitialState)
            setFetchUrl(() => Url.concat(resetQuery))
        }

        return (
            <div className="container">

                <h1 style={{textAlign: 'center'}}>{title}</h1>
                <hr/>
                <div>
                    <Search
                        filter={queryObject}
                        setFilter={setQueryObject}
                        handleKey={handleKeyDown}
                        fetchData={fetchData}
                        reset={resetSearch}/>
                    <hr/>
                    <Table
                        pageData={pageData}
                        onRowSelectInf={onRowSelectInf}
                    />
                    <hr/>
                    <Pagination
                        incrementPage={incPage}
                        decrementPage={decPage}
                        pageData={pageData}
                    />
                </div>
                <hr/>

            </div>
        )
            ;
    }
;


export default FetchPageableData;