import React from 'react';
import MyTable from "./MyTable";

const Table = ({data,onRowSelectInf}) => {

    const headTable = ['#', 'Created', 'Description',
        'Modified', 'Name']
    const bodyTable = [
        {value: 'created', name:'createdTodo'},
        {value: 'desc', name: 'description'},
        {value: 'mod', name:'modifiedTodo'},
        {value: 'name', name:'clientName'}]

    return (
        <div>
            <MyTable
                className="table table-striped"
                headClassname="table-primary"
                theadData={headTable}
                tbodyValue={bodyTable}
                tbodyData={data.content}
                onRowSelectInf={onRowSelectInf}
            >
            </MyTable>
        </div>
    );
};

export default Table;