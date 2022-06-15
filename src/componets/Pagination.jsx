import React, {useContext, useEffect, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import {QueryDataContext} from "./context";

const Pagination = ({
                        queryPageableValue,
                        fetchData,
                        pageData,

                    }) => {

    const [totalPage, setTotalpage] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [queryObject, setQueryObject] = useContext(QueryDataContext)


    useEffect(() => {
        const updateTotalPage = () => {
            setTotalpage(() => Math.ceil(pageData.total / pageData.pageable.size));
            setPageNumber(() => pageData.pageable.page + 1)
        };
        updateTotalPage()
    }, [pageData])

    const incPage = () => {
        if (pageData.pageable.page < (totalPage - 1)) {
            setQueryObject({...queryObject, page: pageData.pageable.page + 1})
            queryPageableValue.set('page', pageData.pageable.page + 1)
        }
        fetchData()
    }

    const decPage = () => {
        if (pageData.pageable.page <= (totalPage - 1) && pageData.pageable.page > 0) {
            setQueryObject({...queryObject, page: pageData.pageable.page - 1})
            queryPageableValue.set('page', pageData.pageable.page - 1)
        }
        fetchData()
    }

    const goSelectPage = (number) => {
        setQueryObject({...queryObject, page: number})
        queryPageableValue.set('page', number)
        fetchData()
    }


    const pageArray = Array.from({length: totalPage})

    return (
        <div className="container">
            <div className='row row-cols-auto'>
                <div className='col'>
                    <MyButton
                        disabled={pageNumber === 1}
                        className="btn btn-primary"
                        onClick={() => decPage()}>
                        <i className="bi bi-arrow-left-square"/>
                    </MyButton>
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        {
                            pageArray.map((value, index) =>
                                <li key={index}
                                    onClick={() => goSelectPage(index)}
                                    className={index === (pageNumber - 1) ?
                                        "page-item active" : "page-item"}
                                >
                                    <span className="page-link">
                                         {index + 1}
                                    </span>
                                </li>
                            )
                        }
                    </ul>

                </nav>
                <div className='col'>
                    <MyButton
                        disabled={pageNumber === totalPage || pageNumber > totalPage}
                        className="btn btn-primary"
                        onClick={() => incPage()}>
                        <i className="bi bi-arrow-right-square"></i>
                    </MyButton>
                </div>
            </div>
        </div>
    );
};

export default Pagination;