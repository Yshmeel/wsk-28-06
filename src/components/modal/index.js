import React, {useEffect, useMemo, useRef, useState} from 'react'
import { createPortal } from 'react-dom'
import './index.css'
import Button from '../button';

const Modal = (props) => {
    const {
        isOpen,
        title,
        children,
        onClose
    } = props;

    const [shown, setShown] = useState(false);
    const timeoutRef = useRef(null);

    const classNames = useMemo(() => {
        let classNames = [];
        
        if(isOpen) {
            classNames.push("open");
        }

        if(shown) {
            classNames.push("shown");
        }

        return classNames.join(" ");
    }, [isOpen, shown]);

    useEffect(() => {
        window.clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setShown(isOpen);
        }, 100);
    }, [isOpen]);

    return createPortal((
        <div className={`modal ${classNames}`}>
            <div className="modal-wrapper">
                <div className='modal-header'>
                    <div className="modal-header-left">
                        <span>{title}</span>
                    </div>

                    <div className="modal-header-close">
                        <button onClick={onClose}>
                            X
                        </button>
                    </div>
                </div>

                <div className="modal-content">
                    {children}
                </div>

                <div className="modal-footer">
                    <Button text={"Cancel"}
                            variant={"default"}
                            onClick={onClose}/>
                </div>
            </div>
        </div>
    ), document.body);
};

export default Modal;
