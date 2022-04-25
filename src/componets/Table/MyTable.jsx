import React from 'react';

const MyTable = ({className, headClassname,
                     theadData, tbodyValue,
                     tbodyData, onRowSelectInf}) => {

    const checkStatus = (item) => {
        return item.completed !== false ? "table-success" : "table-danger"
    }

    const rowSelectInf =(item) => {
        if(item === 'description')
            console.log(item)
    }

    return (
        <div>
            <table className={className}>
                <thead>
                <tr className={headClassname}>
                    {theadData.map(head =>
                        <th key={head}>
                            {head}
                        </th>
                    )}
                </tr>
                </thead>
                <tbody >
                {tbodyData.map((item, index) => (
                    <tr key={item.id} className={checkStatus(item)}>
                        <td>{index + 1}</td>
                        {tbodyValue.map(v =>
                            <td onClick={() => rowSelectInf(v.name)}
                                key={v.value}>
                                {item[v.name]}
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