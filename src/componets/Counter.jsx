import React, {useReducer,} from 'react';
import MyButton from "./UI/button/MyButton";

const Counter = () => {
    /*
    Изменим наш счетчик и вместо useState  используем хук useReduce:
    функция reducer принимает в себя 2 параметра - текущее состояние и экшен, и возвращает новое состояние
       reducer(currentState, action)
    useReducer принимает в себя также 2 параметра -  функцию reducer и изначальное состояние
       useReducer(reducer, initialState);
     */
    const initialState = 0;
    const reducer = (state, action) => {
        switch (action) {
            case ('increment'):
                return state + 1;
            case ('decrement'):
                return state - 1;
            default:
                return state;
        }
    }
    const [count, dispatch] = useReducer(reducer, initialState);
    /*
        const increment = () => {
            setCount(count + 1);
        }
        const decrement = () => {
            setCount(count - 1);
        }

     */
    return (
        <div>
            <h1>{count}</h1>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <MyButton onClick={() => dispatch('increment')}>Increment</MyButton>
                <MyButton onClick={() => dispatch('decrement')}>Decrement</MyButton>
            </div>
            <hr/>
        </div>
    )
};

export default Counter;