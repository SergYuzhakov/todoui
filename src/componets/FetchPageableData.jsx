import React, {useEffect, useState} from 'react';
import Pagination from "./Pagination";
import Table from "./Table";
import Search from "./Search";
import {useFetching} from "./hooks/useFetching";
import Loader from "./UI/loader/Loader";
import ToDoService from "../API/ToDoService";


const FetchPageableData = ({onRowSelect, title, response}) => {

        const url = 'http://localhost:8080/api/todoPageable?'
        const todayDate = new Date(new Date()
            .setHours(23, 59, 59, 999) + 10800000)
            .toISOString()
        const startDate = new Date(new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
            ).setHours(0,0,0,0)+ 10800000)
            .toISOString()

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

        const [pageData, setPagedata] = useState(pageDateInitialState);

        const queryPageableValue = new URLSearchParams(queryObject)


        const resetQuery = new URLSearchParams(queryInitialState)

        const [fetch, isLoading, fetchDateError] = useFetching(async (params) => {
            const data = await ToDoService.getAll(url, params)
            setPagedata(data.data)
        })

        useEffect(() => {
            fetchData()
        }, [response])// eslint-disable-line react-hooks/exhaustive-deps

        const fetchData = (() => {
            fetch(queryPageableValue)
        });

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
            fetch(resetQuery)

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
                    {
                        fetchDateError &&
                        <h6>Network Error: Data Server Error</h6>
                    }

                    {
                        isLoading ? <Loader/> :
                            <Table
                                pageData={pageData}
                                onRowSelectInf={onRowSelect}
                            />
                    }
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