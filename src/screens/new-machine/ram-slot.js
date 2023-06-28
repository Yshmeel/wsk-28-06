import React, {useState} from 'react'

const NewMachineRamSlot = (props) => {
    const {
        title,
        part,
        activeCategory,
        category,
        disabled,
        amount,
        onSelect,
        onDelete,
        onChangeAmount
    } = props;

    const [shake, setShake] = useState(false);
    const [over, setOver] = useState(false);

    const handleOnDragOver = (e) => {
        if(disabled) {
            return false;
        }

        if(activeCategory !== category) {
            return false;
        }

        e.preventDefault();
        setOver(true);
    };

    const handleOnDrop = async (e) => {
        if(disabled) {
            return false;
        }

        e.preventDefault();

        const partData = e.dataTransfer.getData('part');

        if(!partData) {
            return false;
        }

        const part = JSON.parse(partData);

        if(activeCategory !== category) {
            return false;
        }

        if(!(await onSelect(part))) {
            setShake(true);

            setTimeout(() => {
                setShake(false);
            }, 500);
        }

        setOver(false);
    };

    const handleOnDragLeave = () => {
        setOver(false);
    };

    const handleOnChangeAmount = async (ev) => {
        onChangeAmount(ev);
    };

    return (
        <div className={`new-machine-slot ${shake ? 'shake-effect' : ''} ${disabled ? 'disabled' : ''}`}
             onDragOver={handleOnDragOver}
             onDragLeave={handleOnDragLeave}
             onDrop={handleOnDrop}>
            <div className="new-machine-slot-header">
                <b>{title}</b>

                {part && (
                    <button type={'button'} onClick={onDelete}>
                        Delete
                    </button>
                )}
            </div>

            <div className="new-machine-slot-ram-item">
                <div className="new-machine-slot-item-view">
                    {part ? (
                        <div className={'new-machine-slot-item-wrapper'}>
                            <img src={`${process.env.REACT_APP_API_URL}/api/images/${part.imageUrl}`} />

                            <div className="new-machine-slot-item-footer">
                                <span>{part.name}</span>
                            </div>
                        </div>
                    ) : (
                        <div className={`new-machine-slot-placeholder ${over ? 'over' : ''}`}>
                            <b>Add a part from category {title}</b>
                        </div>
                    )}
                </div>

                <div className="new-machine-slot-item-input">
                    <span>Quantity</span>
                    <input type="number" value={amount}
                           disabled={disabled || !part}
                           onChange={handleOnChangeAmount}/>
                </div>
            </div>
        </div>
    )
};

export default NewMachineRamSlot;
