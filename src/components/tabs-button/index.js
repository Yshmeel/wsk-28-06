import React, {useCallback} from 'react'
import "./index.css"

const TabsButton = (props) => {
    const {
        active = false,
        text,
        id,
        onClick,
    } = props;

    const onClickHandler = useCallback(() => {
        onClick(id);
    }, [onClick, id]);

    return (
        <button type={'button'}
                className={`tab-button ${active ? 'active' : ''}`}
                onClick={onClickHandler}>
            {text}
        </button>
    )
};

export default TabsButton;
