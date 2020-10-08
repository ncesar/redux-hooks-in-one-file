import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT_COUNT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

function nameReducer(state = { name: 'césar' }, action) {
  switch (action.type) {
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counterReducer,
  nameReducer,
});

const INITIAL_STATE = {};

const store = createStore(rootReducer, INITIAL_STATE);

function App() {
  return (
    <Provider store={store}>
      <div>hi</div>
      <Counter />
      <Name />
    </Provider>
  );
}

function Counter() {
  const { count, name } = useSelector((state) => ({
    ...state.counterReducer,
    ...state.nameReducer,
  }));
  // const count = useSelector((state) => state.count);
  // const name = useSelector((state) => state.name);
  const dispatch = useDispatch();

  function incrementCount() {
    dispatch({
      type: 'INCREMENT_COUNT',
    });
  }
  function decrementCount() {
    dispatch({
      type: 'DECREMENT_COUNT',
    });
  }

  return (
    <>
      <h2>
        counter: {count} by {name}
      </h2>
      <button onClick={incrementCount}>increment</button>
      <button onClick={decrementCount}>decrement</button>
    </>
  );
}

function Name() {
  const dispatch = useDispatch();
  function handleUpdateName(event) {
    dispatch({
      type: 'UPDATE_NAME',
      payload: event.target.value,
    });
  }
  return (
    <div>
      <input placeholder="Name please" onChange={handleUpdateName} />
    </div>
  );
}

export default App;
