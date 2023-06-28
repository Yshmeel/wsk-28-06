import React from "react"
import Modal from "../../components/modal";

const ErrorModal = (props) => {
    const {
        isOpen,
        title,
        text,
        onClose,
    } = props;

    return (
        <Modal isOpen={isOpen} 
               title={title}
               onClose={onClose}>
            {text}
        </Modal>
    )
};

export default ErrorModal;
