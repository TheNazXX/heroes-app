import './app.css';
import { createStore } from 'redux';

const reducer = (state = 0, action) => {
  switch(action.type){
    case 'INC': return state + 1;
    case 'DEC': return state - 1;
    default: return state;
  };
};

const store = createStore(reducer)


const  App = () => {
  return (
    <div className="App">
      <button onClick={() => store.dispatch({type: 'INC'})}>INC</button>
      {store.getState()}
      <button onClick={() => store.dispatch({type: 'DEC'})}>DEC</button>
    </div>
  );
}



export default App;
