import React,{useEffect, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import MySelect from "./UI/select/mySelect";

const Pagination = ({
                        showSelectedRows,
                        decrementPage,
                        incrementPage,
                        dataPage
                    }) => {

    const [totalPage, setTotalpage] = useState(0);
    const [page, setPage] = useState(0);
    const [showRows, setShowrows] = useState(10)

    useEffect(() => {
        const updateTotalPage = () => {
            setTotalpage(() => Math.ceil(dataPage.total / dataPage.pageable.size));
            setPage(() => dataPage.pageable.page + 1)
        };
        updateTotalPage()
    }, [dataPage])

    useEffect(() => {
        showSelectedRows(showRows)
        console.log(`Select:${showRows} lines`)
    }, [showRows])

    const selectShowRows = (select) => {
        setShowrows(() => select);
    }

    return (
        <div className="container">
            <div className='row row-cols-auto'>
                <div className='col'>
                    <MyButton
                        disabled={page === 1}
                        className="btn btn-primary"
                        onClick={() => decrementPage(totalPage)}>
                        <i className="bi bi-arrow-left-square"></i>
                    </MyButton>
                </div>
                <div className='col'>
                    <h6>Page {page} of {totalPage} </h6>
                </div>
                <div className='col'>
                    <MyButton
                        disabled={page === totalPage}
                        className="btn btn-primary"
                        onClick={() => incrementPage(totalPage)}>
                        <i className="bi bi-arrow-right-square"></i>
                    </MyButton>
                </div>
                <div className='col'>
                    <MySelect
                        className='form-select'
                        defaultValueName='Show 10 lines'
                        defaultValue={10}
                        value={showRows}
                        onChange={selectShowRows}
                        options={[
                            {value: 20, name: 'Show 20 lines'},
                            {value: 30, name: 'Show 30 lines'},
                            {value: 50, name: 'Show 50 lines'}
                        ]}
                    />
                </div>

            </div>


        </div>
    );
};

export default Pagination;