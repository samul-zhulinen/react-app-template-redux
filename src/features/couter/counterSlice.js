import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        reducer: (state) => {
            state.value -= 1
        },
        incrementByNum: (state, action) => {
            state.value += action.payload
        },
    }
})

export const { reducer, incrementByNum } = counterSlice.actions

export const incrementAsync = (amount) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(incrementByNum(amount));
          }, 1000);
    }
}

export const selectCount = state => state.counter.value;

export default counterSlice.reducer