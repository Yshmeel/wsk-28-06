import React from 'react'
import styles from './index.module.css'

const EntityCard = (props) => {
    const {
        imageURL,
        name,
        className
    } = props;

    return (
        <div className={`${styles.root} ${className}`}>
            <div className={styles.image}>
                <img src={`${process.env.REACT_APP_API_URL}/api/images/${imageURL}`} alt="" className={styles.imageElement}/>
            </div>

            <div className={styles.footer}>
                <div className={styles.name}>
                    {name}
                </div>
            </div>
        </div>
    );
};

export default EntityCard;
