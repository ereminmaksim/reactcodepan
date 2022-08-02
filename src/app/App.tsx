// 1. Починить инпуты;
// 2. Имплементировать добавление и удаление инпутов;
// 3. По клику на Submit значение каждого из инпутов должно пройти валидацию
//    и в случае успеха в консоль нужно вывести веселый смайлик, а если хоть одно
//    значение не проходит - грустный смайлик;

import {useCallback, useMemo, useRef, useState} from "react";
import {v1} from 'uuid';
import Controls from "../components/Controls";
import InputRow from "../components/InputRow";
import {ALPHABET} from "../constants/string";
import {Header} from "../components/Header";
/********************************************/
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
/********************************************/
const validate = (value: string) => sleep(2000).then(() => value === "bob");
/********************************************/
const HAPPY_EMOJI = "😊";
const SAD_EMOJI = "😞";
/********************************************/

export interface ITask {
    id: string
    placeholder: string
}
export interface ITaskValue {
    id: string
    value: string
}

/********************************************/

export default function App() {
    const initialId = useRef(v1())
    const [inputValues, setInputValue] = useState<ITaskValue[]>([{id: initialId.current, value: ''}])
    const [loading, setLoading] = useState(false)

    const [taskList, setTaskList] = useState<ITask[]>([
        {id: initialId.current, placeholder: ALPHABET[0]},
    ])

    const addTaskHandler = useCallback(() => {
        const id = v1();
        ///Добавили новый инпут
        setTaskList([...taskList, {id, placeholder: ALPHABET[taskList.length]}]);
        ///Дабавили значение для него
        setInputValue(prev => [...prev, {id, value: ''}]);
    }, [taskList])

    const removeTaskHandler = useCallback((id: string) => {
        setTaskList(prev => prev.filter(t => t.id !== id));
            setInputValue(prev => prev.filter(t => t.id !== id))
    }, [])

    const setValueHandler = useCallback((id: string, value: string) => {
        const updatedValues = inputValues.map(inputValue => {
            if (inputValue.id === id) inputValue.value = value
            return inputValue
        })
        setInputValue(updatedValues)
    }, [inputValues])

    const handleSubmit = useCallback(async () => {
        if (!taskList.length) {
            return console.log('Отправлять нечего')
        }
        setLoading(true)
        const validators = await Promise.all(taskList.map((_, i) => validate(inputValues[i].value)))
        const isValid = validators.every(e => e)
        console.log(`${isValid ? HAPPY_EMOJI : SAD_EMOJI}`)
        setLoading(false)
    }, [inputValues, taskList])

    const inputsView = useMemo(() => taskList.map((task, i) => (
        <InputRow
            value={inputValues[i].value}
            key={task.id}
            item={task}
            removeTaskHandler={removeTaskHandler}
            setValue={setValueHandler}
        />
    )), [inputValues, removeTaskHandler, setValueHandler, taskList])

    return (
        <div className="App">
            <Header />
            <div>{inputsView}</div>
            {loading && <p>Загрузка</p>}
            {!loading && <Controls
                handleSubmit={handleSubmit}
                addTaskHandler={addTaskHandler}
            />}
        </div>
    );
}
