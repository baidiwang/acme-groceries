import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  groceries: [],
  view: ''
};

const viewReducer = (state = window.location.hash.slice(1), action) => {
  if(action.type === 'SET_VIEW'){
   return action.view;
  }
  return state;
}

const groceryReducer = (state = [], action) => {
  // if(action.type === 'LOAD'){
  //   return [...state, action.createGroceries];
  // }
  if(action.type === 'UPDATE'){
    return state.map(grocery => grocery.id === action.grocery.id ? action.grocery : grocery );
  }
  if(action.type === 'CREATE'){
    state = [...state, action.grocery ]
  }
  return state;
 }


const reducer = combineReducers({
  groceries: groceryReducer,
  view: viewReducer
});


const createGroceries = () => {
  return async(dispatch) =>{
    const grocery = (await axios.post('/api/groceries/random')).data;
    dispatch({ type: 'CREATE', grocery });
  }
}


const store = createStore(reducer, applyMiddleware(logger, thunk));
export default store;

export { createGroceries };


