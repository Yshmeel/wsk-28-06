import React, {useCallback} from 'react'
import styles from './index.module.css'
import Input from "../../../../components/input"
import BuilderDroppable from "../droppable"

const BuilderIDParam = (props) => {
    const {
        keyID = '',
        label = '',
        // {
        //     id: '',
        //     imageUrl: '',
        //     name: '',
        // }
        value = null,
        countable = false,
        amount = 0,
        onChange,
        onChangeAmount,
        onDelete,
    } = props;

    const onDeleteHandler = useCallback(() => {
        onDelete(keyID);
    }, [onDelete, keyID]);

    const onChangeHandler = useCallback((value) => {
        onChange(keyID, value);
    }, [onChange]);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    {label}
                </div>

                {value && (
                    <div className={styles.headerRight}>
                        <div className={styles.close}>
                            <button className={styles.closeButton}
                                    onClick={onDeleteHandler}>
                                X
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {value ? (
                <div className={styles.value}>
                    <img src={`${process.env.REACT_APP_API_URL}/api/images/${value.imageUrl}`} className={styles.valueImage}/>
                    <b className={styles.valueText}>{value.name}</b>

                    {(countable && value) && (
                        <div className={styles.count}>
                            <Input type={"number"}
                                   value={amount} onChange={onChangeAmount}/>
                        </div>
                    )}
                </div>
            ) : (
                <BuilderDroppable onChange={onChangeHandler}>
                    <div className={styles.empty}>
                        <span className={styles.emptyText}>
                            Drop your part here
                        </span>
                    </div>
                </BuilderDroppable>
            )}

        </div>
    )
};

export default BuilderIDParam;
