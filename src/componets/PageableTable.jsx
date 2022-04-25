import React, {useEffect, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import MySelect from "./UI/select/mySelect";

const PageableTable = ({
                           showSelectedRows,
                           decrementPage,
                           incrementPage,
                           onRowSelectInf,
                           data
                       }
) => {
    const checkStatus = (item) => {
        return item.completed !== false ? "table-success" : "table-danger"
    }
    const logDelete = (rowInfo) => {
        console.log(`Delete ToDo Id: ${rowInfo}`)
    }
    const logUpdate = (row) => {
        console.log(`Info Client ID: ${row}`)
    }
    const [totalPage, setTotalpage] = useState(0);
    const [page, setPage] = useState(0);
    const [showRows, setShowrows] = useState(10)


    useEffect(() => {
        const updateTotalPage = () => {
            setTotalpage(() => Math.ceil(data.total / data.pageable.size));
            setPage(() => data.pageable.page + 1)
        };
        updateTotalPage()
    }, [data])

    useEffect(() => {
        showSelectedRows(showRows)
        console.log(`Select:${showRows} lines`)
    }, [showRows])


    const selectShowRows = (select) => {
        setShowrows(() => select);
    }


    return (
        <div>
            <table className="table table-striped">
                <thead>
                <tr className="table-primary">
                    <th>#</th>
                    <th>Created</th>
                    <th>Description</th>
                    <th>Modified</th>
                    <th>Name</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {data.content.map((item, index) => (

                    <tr key={item.id} className={checkStatus(item)}>
                        <td>{index + 1}</td>
                        <td>{item.createdTodo}</td>
                        <td onClick={() => onRowSelectInf(item.id)}>
                            {item.description}
                        </td>
                        <td>{item.modifiedTodo}</td>
                        <td onClick={() => logUpdate(item.client_id)}>
                            {item.clientName}</td>
                        <td>
                            <i onClick={() => logDelete(item.id)} className="bi-trash"/>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>

            <hr/>

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
        </div>
    )
};


export default PageableTable;