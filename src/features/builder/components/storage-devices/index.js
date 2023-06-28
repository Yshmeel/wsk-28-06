import React, {useEffect, useRef} from 'react'

const BuilderDraggable = (props) => {
    const {
        type = '',
        children,
        className = ''
    } = props;

    const dragRef = useRef(null);

    useEffect(() => {
        const dragStart = () => {

        };

        const dragEnd = () => {

        };

        dragRef.current.addEventListener("dragstart", dragStart);
        dragRef.current.addEventListener("dragend", dragEnd);

        return () => {
            if(dragRef.current) {
                dragRef.current.removeEventListener("dragstart", dragStart);
                dragRef.current.removeEventListener("dragend", dragEnd);
            }
        };
    });

    return (
        <div draggable={true}
             className={className}
             ref={dragRef}>
            {children}
        </div>
    )
};

export default BuilderDraggable;
