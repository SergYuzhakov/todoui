import React from 'react';

export default class MyDataList extends React.Component {
    render(props) {
        const clientsData = this.props.clientsData;
        const id = this.props.id;

        return (
            <datalist id={id}>
                {clientsData.map((client) => {
                    return <option key={client.id}
                                   value={client.name + '/' + client.email}
                                   name={client.name + '/' + client.email}
                                   data-id={client.id}/>

                })}
            </datalist>
        );
    }
}
