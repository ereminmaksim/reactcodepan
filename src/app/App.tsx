// 1. Починить инпуты;
// 2. Имплементировать добавление и удаление инпутов;
// 3. По клику на Submit значение каждого из инпутов должно пройти валидацию
//    и в случае успеха в консоль нужно вывести веселый смайлик, а если хоть одно
//    значение не проходит - грустный смайлик;

import {useCallback, useState} from "react";
import {v1} from 'uuid';
import InputList from "../components/InputList";
import Controls from "../components/Controls";
/********************************************/

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
/********************************************/

const validate = (value: string) => sleep(2000).then(() => value === "bob");
/********************************************/

const HAPPY_EMOJI = "😊";
const SAD_EMOJI = "😞";

/********************************************/

export interface TaskType {
    id: string
    value: string
}

/********************************************/

export default function App() {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)

    const [task, setTask] = useState<TaskType[]>([
        {id: v1(), value: ""},
    ])

    const addTaskHandler = useCallback((value: string) => {
        setTask([...task, {id: v1(), value}]);
    }, [task])

    const removeTaskHandler = useCallback((id: string) => {
        setTask(task.filter(t => t.id !== id));
        console.log(task)
    }, [task])

    const handleSubmit = useCallback(() => {
        setLoading(true)
        validate(value)
            .then((isValid) => {
                setLoading(false)
                console.log(`${isValid ? HAPPY_EMOJI : SAD_EMOJI}`)
            })
    }, [value])

    return (
        <div className="App">
            <h2>Bob Form</h2>
            <div>
                {task.map(el => (
                    <InputList
                        key={el.id}
                        id={el.id}
                        removeTaskHandler={removeTaskHandler}
                        setValue={setValue}
                    />
                ))}
            </div>
            {loading && <p>Загрузка</p>}
            {!loading && <Controls
                handleSubmit={handleSubmit}
                addTaskHandler={addTaskHandler}
            />}
        </div>
    );
}
