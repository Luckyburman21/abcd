import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk";
//import rootReducer from "./reducers";
import combineReducers  from"../src/reducers/index";

const initialState = {};
const middleware = [thunk];

const ReactReduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

let store;

if (window.navigator.userAgent.includes("chrome") && ReactReduxDevTools) {
    store = createStore(
        combineReducers,
        initialState,
        compose(applyMiddleware(...middleware))
    );
} else {
    store = createStore(
        combineReducers,
        initialState,
        compose(applyMiddleware(...middleware))
    );
}

export default store;
