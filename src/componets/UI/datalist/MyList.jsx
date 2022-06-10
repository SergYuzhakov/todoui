import React from 'react';

const MyList = React.forwardRef( (props, ref) => {
    return (
        <datalist id={props.id} ref={ref}>
            {props.clientsData.map((client) => {
                return <option key={client.id}
                               value={client.name + '/' + client.email}
                               name={client.name + '/' + client.email}
                               data-id={client.id}/>

            })}
        </datalist>
    );
});

export default MyList;