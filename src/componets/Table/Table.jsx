import React from 'react';


const Table = ({data, onRowSelect}) => {

    const checkStatus = (item) => {
        return item.completed === false ? "table-danger" : "table-success"
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
                {data.map((item, index) => (
                    <tr key={item.id} className={checkStatus(item)} >
                        <td>{index + 1}</td>
                        <td>{item.createdTodo}</td>
                        <td onClick={() => onRowSelect(item.id)} >
                            {item.description}
                        </td>
                        <td>{item.modifiedTodo}</td>
                        <td onClick={() => onRowSelect(item.client_id)}>
                            {item.clientName}</td>
                        <td>
                            <i  className="bi-trash"></i>
                        </td>

                    </tr>
                ))}
                </tbody>

            </table>

        </div>
    );
};

export default Table;