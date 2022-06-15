import React, {useEffect, useState} from 'react';
import Pagination from "./Pagination";
import Table from "./Table";
import Search from "./Search";
import {useFetching} from "./hooks/useFetching";
import Loader from "./UI/loader/Loader";
import ToDoService from "../API/ToDoService";
import {PageDataContext, QueryDataContext} from "./context";


const FetchPageableData = ({onRowSelect, title, response}) => {

        const url = 'http://localhost:8080/api/todoPageable?'
        const todayDate = new Date(new Date()
            .setHours(23, 59, 59, 999) + 10800000)
            .toISOString()
        const startDate = new Date(new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        ).setHours(0, 0, 0, 0) + 10800000)
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

        /*
       Структура pageData.content:
       {
       clientId: 1145
       clientName: "Иван Иванович"
       completed: false
       createdTodo: "2022-06-09 22:41"
       description: "Поиграть с Горынычем в карты"
       id: 1198
       modifiedTodo: "2022-06-09 22:41"
       }
        */

        const [pageData, setPageData] = useState(pageDateInitialState);

        const queryPageableValue = new URLSearchParams(queryObject)

        const resetQuery = new URLSearchParams(queryInitialState)

        const [fetch, isLoading, fetchDateError] = useFetching(async (params) => {
            const data = await ToDoService.getAll(url, params)
            setPageData(data.data)
        })

        useEffect(() => {
            fetchData()
        }, [response.modified])// eslint-disable-line react-hooks/exhaustive-deps

        const fetchData = (() => {
            fetch(queryPageableValue)
        });

        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                fetchData()
            }
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
                    <QueryDataContext.Provider value={[queryObject, setQueryObject]}>
                        <Search
                            handleKey={handleKeyDown}
                            fetchData={fetchData}
                            reset={resetSearch}/>
                        <hr/>
                        <Pagination
                            queryPageableValue={queryPageableValue}
                            fetchData={fetchData}
                            pageData={pageData}
                        />
                    </QueryDataContext.Provider>
                    <hr/>

                    {
                        fetchDateError &&
                        <h6>Network Error: Data Server Error</h6>
                    }

                    {
                        isLoading ? <Loader/> :
                            <PageDataContext.Provider value={[pageData, setPageData]}>
                                <Table
                                    onRowSelectInf={onRowSelect}
                                />
                            </PageDataContext.Provider>
                    }
                    <hr/>

                </div>
            </div>
        )
            ;
    }
;

export default FetchPageableData;