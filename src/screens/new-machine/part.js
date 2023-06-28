import React from 'react'

const NewMachinePart = (props) => {
    const {
        activeCategory,
        part
    } = props;

    const handleOnDragStart = (e) => {
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData('part', JSON.stringify(part));
        e.dataTransfer.setData('activeCategory', activeCategory);
    };

    return (
        <div className="new-machine__part"
             data-category={activeCategory}
             data-id={part.id}
             draggable={true} onDragStart={handleOnDragStart}>
            <img src={`${process.env.REACT_APP_API_URL}/api/images/${part.imageUrl}`} />

            <div className="new-machine__part-footer">
                <span>{part.name}</span>
            </div>
        </div>
    );
};

export default NewMachinePart;
