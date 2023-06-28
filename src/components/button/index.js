import React from 'react'
import "./index.css"

const Button = (props) => {
    const {
        variant,
        text,
        type = 'text',
        disabled = false,
        onClick
    } = props;

    return (
        <button type={type} className={`button button-${variant} ${disabled ? 'disabled' : ''}`}
                disabled={disabled}
                onClick={onClick}>
            {text}
        </button>  
    );
};

export default Button;
