import React, {ChangeEvent, useCallback} from 'react';
import {ITask} from "../app/App";

interface InputListType {
    item: ITask
    removeTaskHandler: (id: string) => void
    setValue: (id: string, value: string) => void
    value: string
}

const InputRow = ({item, removeTaskHandler, setValue, value}: InputListType) => {

    const handleOnchange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(item.id, e.currentTarget.value)
    }, [item.id, setValue])
    const onRemoveHandler = useCallback(() => {
        removeTaskHandler(item.id)
    }, [item.id, removeTaskHandler])
    return (
        <div
            className="task">
            <input
                placeholder={item.placeholder}
                onChange={handleOnchange}
                value={value}
            />
            <button
                onClick={onRemoveHandler}
                type="button">Remove input
            </button>
        </div>
    );
}
export default React.memo(InputRow);
