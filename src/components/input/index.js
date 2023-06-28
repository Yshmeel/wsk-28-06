import React from 'react'
import styles from './index.module.css'

const Input = (props) => {
    const {
        label = '',
        value = '',
        type = 'text',

        id = '',

        onChange,
    } = props;

    return (
        <div className={styles.group}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <input type={type} value={value} id={id} className={styles.input} onChange={onChange} />
        </div>
    )
};

export default Input;
