import React from 'react';
/********************************************/

interface handleSubmit {
    addTaskHandler: () => void
    handleSubmit: () => void
}

const Controls = ({addTaskHandler, handleSubmit}: handleSubmit) => {

    return (
        <div className="controls">
            <button
                onClick={addTaskHandler}
                type="button">Add input
            </button>
            <button onClick={handleSubmit} type="button">
                Submit values
            </button>
        </div>
    );
}
export default React.memo(Controls);
