import React from 'react';

const MyButton = ({children, ...props}) => {
    return (
        /*
        все пропсы , которые мы будем передавать будут применяться к нашей кнопке
         */
        <button {...props} type="button" >
            {children}
        </button>
    );
};

export default MyButton;
