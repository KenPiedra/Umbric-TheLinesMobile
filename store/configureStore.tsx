import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const configureStore = () => {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunkMiddleware
      ),
    ),
  );
}

export default configureStore;
