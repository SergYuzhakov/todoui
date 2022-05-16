import React from 'react';

const MyTable = ({className, headClassname,
                     theadData, tbodyValue,
                     tbodyData, funcOnClickRow}) => {

    const checkStatus = (item) => {
        return item.completed !== false ? "table-success" : "table-danger"
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