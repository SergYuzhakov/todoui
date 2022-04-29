import React, {useEffect, useState} from 'react';
import MyButton from "./UI/button/MyButton";

const Pagination = ({
                        incrementPage,
                        decrementPage,
                        pageData,

                    }) => {

    const [totalPage, setTotalpage] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        const updateTotalPage = () => {
            setTotalpage(() => Math.ceil(pageData.total / pageData.pageable.size));
            setPageNumber(() => pageData.pageable.page + 1)
        };
        updateTotalPage()
    }, [pageData])

    return (
        <div className="container">
            <div className='row row-cols-auto'>
                <div className='col'>
                    <MyButton
                        disabled={pageNumber === 1}
                        className="btn btn-primary"
                        onClick={() => decrementPage(totalPage)}>
                        <i className="bi bi-arrow-left-square"></i>
                    </MyButton>
                </div>
                <div className='col'>
                    <h6> Page {pageNumber} of {totalPage} </h6>
                </div>
                <div className='col'>
                    <MyButton
                        disabled={pageNumber === totalPage || pageNumber > totalPage}
                        className="btn btn-primary"
                        onClick={() => incrementPage(totalPage)}>
                        <i className="bi bi-arrow-right-square"></i>
                    </MyButton>
                </div>
            </div>
        </div>
    );
};

export default Pagination;