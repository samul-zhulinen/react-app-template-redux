import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    incrementAsync,
    incrementByNum,
    reducer,
    selectCount
} from './counterSlice'
import { Button } from 'ytu-mobile'
import './index.less'

const Counter = props => {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()
    return (
        <div className="counter">
            <Button type="primary" onClick={() => dispatch(reducer())}>reducer</Button>
            <span className="text">{`Hello YuanTu${count}`} </span>
            <Button className="asyncButton" type="primary" onClick={() => dispatch(incrementAsync(1))}>async add</Button>
        </div>
    )
}

export default Counter
