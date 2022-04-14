import React from 'react';

const Table = ({data}) => {
    console.log(data)

    function checkStatus(item){
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
                </tr>
                </thead>
                <tbody>
                {data.map ((item, index) => (
                    <tr key={item.id}  className={checkStatus(item)} >
                        <td>{index}</td>
                        <td>{item.created}</td>
                        <td>{item.description}</td>
                        <td>{item.modified}</td>
                        <td>{item.client.name}</td>
                    </tr>
                ))}
                </tbody>

            </table>

        </div>
    );
};

export default Table;