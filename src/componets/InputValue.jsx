import React, {useState} from "react";

const InputValue = () => {
    const [value, setValue] = useState('Текст в Input');

    return (
        <div>
            <h1>{value}</h1>
            <input
                type="text"
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    )

};

export default InputValue;