import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { authReducer, appReducer } from "../reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

const configureStore = () => {
  return createStore(rootReducer, compose(applyMiddleware(thunkMiddleware)));
};

export default configureStore;
