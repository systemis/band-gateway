const redux = require('redux');

const songInfoReducer = (state = "", action) => {
    switch(action){
        case `CHANGE_SONG_INFO`:
            return action.value;
        default:
            return state
    }
}

const reducer = redux.combineReducers({
    songInfo: songInfoReducer
})

const store = redux.createStore(reducer, redux.compose(

))

export default store;