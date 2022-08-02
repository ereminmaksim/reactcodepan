import React, {ChangeEvent, useCallback} from 'react';

interface InputListType {
    id: string
    removeTaskHandler: (id: string) => void
    setValue: (value: string) => void
}

const InputList = ({id, removeTaskHandler, setValue}: InputListType) => {

    const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onRemoveHandler = useCallback(() => {
        removeTaskHandler(id)
    }, [id, removeTaskHandler])

    return (
        <div
            className="task">
            <input
                placeholder="a"
                onChange={handleOnchange}
            />
            <button
                onClick={onRemoveHandler}
                type="button">Remove input
            </button>
        </div>
    );
}
export default React.memo(InputList);
