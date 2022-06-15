import React, {useContext, useState} from 'react';
import {PageDataContext} from "../../context";

const MyTable = ({
                     className, headClassname,
                     theadData, tbodyValue,
                     funcOnClickRow
                 }) => {

    const [pageData, setPageData] = useContext(PageDataContext)

    const [sortState, setSortState] = useState({
        sort: 'desc',
        sortField: 'createdTodo'
    })


    const checkStatus = (item) => {
        return item.completed !== false ? "table-success" : "table-danger"
    }

    const clickHeader = (header) => {
        console.log(pageData)
        if (header.value !== '#') {
            setSortState({
                ...sortState, sort: ((sortState.sortField === header.name ?
                    (sortState.sort === 'desc' ? 'asc' : 'desc') :
                    (sortState.sort === 'asc' ? 'desc' : 'asc'))),
                sortField: header.name
            })

            setPageData({
                ...pageData, content: [...pageData.content]
                    .sort(sortState.sort === 'desc' ?
                        (a, b) => a[header.name]
                            .localeCompare(b[header.name]) :
                        (a, b) => b[header.name]
                            .localeCompare(a[header.name])
                    )
            })
        }
    }

    const viewHead = (head) => {
        return (
            (sortState.sortField === head.name) ?
                (sortState.sort === 'desc') ?
                    <i className="bi bi-chevron-double-down">
                        {head.value}
                    </i>
                    :
                    <i className="bi bi-chevron-double-up">
                        {head.value}
                    </i>
                :
                head.value
        )
    }

    return (
        <div>
            <table className={className}>
                <thead>
                <tr className={headClassname}>
                    {theadData.map(head =>
                        <th onClick={() => clickHeader(head)}
                            key={head.value}>
                            {viewHead(head)}
                        </th>
                    )}
                </tr>
                </thead>
                <tbody>
                {pageData.content.map((item, index) => (
                    <tr key={item.id} className={checkStatus(item)}>
                        <td>{index + 1}</td>
                        {tbodyValue.map(value =>
                            <td onClick={() => funcOnClickRow(value.name, item)}
                                key={value.value}>
                                {item[value.name]}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyTable;