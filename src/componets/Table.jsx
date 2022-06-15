import React from 'react';
import MyTable from "./UI/table/MyTable";

const Table = ({onRowSelectInf}) => {

    const headTable = [
        {value: '#', name: ''},
        {value: 'Created', name: 'createdTodo'},
        {value: 'Description', name: 'description'},
        {value: 'Modified', name: 'modifiedTodo',},
        {value: 'Name', name: 'clientName'}

    ]
    const bodyTable = [
        {value: 'created', name: 'createdTodo'},
        {value: 'desc', name: 'description'},
        {value: 'mod', name: 'modifiedTodo'},
        {value: 'name', name: 'clientName'}]

    return (
        <div>
            <MyTable
                className="table table-striped"
                headClassname="table-primary"
                theadData={headTable}
                tbodyValue={bodyTable}
                funcOnClickRow={onRowSelectInf}
            >
            </MyTable>
        </div>
    );
};

export default Table;