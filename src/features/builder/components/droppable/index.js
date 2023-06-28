import React, {useEffect, useRef, useState} from 'react'
import "./index.css"

const BuilderDroppable = (props) => {
    const {
        children,
        className = '',
        onChange
    } = props;

    const dragRef = useRef(null);
    const [over, setOver] = useState(false);

    useEffect(() => {
        const dragOver = (ev) => {
            ev.preventDefault();
            setOver(true);
        };

        const dragLeave = () => {
            setOver(false);
        }

        const drop = (ev) => {
            const data = JSON.parse(ev.dataTransfer.getData("text/html"));
            onChange(data);
        };

        dragRef.current.addEventListener("dragover", dragOver);
        dragRef.current.addEventListener("dragleave", dragLeave);
        dragRef.current.addEventListener("drop", drop);

        return () => {
            if(dragRef.current) {
                dragRef.current.removeEventListener("dragover", dragOver);
                dragRef.current.removeEventListener("dragleave", dragLeave);
                dragRef.current.removeEventListener("drop", drop);
            }
        };
    });

    return (
        <div className={`${className} ${over ? 'drag-over' : ''}`}
             ref={dragRef}>
            {children}
        </div>
    )
};

export default BuilderDroppable;
