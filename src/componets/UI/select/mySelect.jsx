import React from 'react';

const MySelect = ({className,options,defaultValue,
                      defaultValueName, value, onChange}) => {
    return (
        <select
            className={className}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option value={defaultValue}>{defaultValueName}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;