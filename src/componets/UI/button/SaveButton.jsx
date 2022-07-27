import React from 'react';
import MyButton from "./MyButton";

const SaveButton = ({
                        onClickFunc, isDisabled, isDoing,
                        title, doingTitle
                    }
) => {
    return (
        <MyButton
            className="btn btn-primary"
            onClick={onClickFunc}
            disabled={isDisabled}

        >
            {isDoing ?
                <div>
                    <span className="spinner-border spinner-border-sm"
                          role="status" aria-hidden="true"/>
                    <span>{doingTitle}</span>
                </div>
                :
                <span>{title}</span>}
        </MyButton>
    );
};

export default SaveButton;