import React from 'react'
import styles from './index.module.css'

const Select = (props) => {
    const {
        label = '',
        value = '',

        id = '',
        children,

        onChange,
    } = props;

    return (
        <div className={styles.group}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <select value={value} id={id} className={styles.input} onChange={onChange}>
                {children}
            </select>
        </div>
    )
};

export default Select;
