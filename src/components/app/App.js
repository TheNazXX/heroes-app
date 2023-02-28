import './app.scss';
import { createStore } from 'redux';
import {Button} from 'react-bootstrap';
import {reducer} from '../reducer.js';
import {inc, dec} from '../actions.js'


const {dispatch, subscribe, getState} = createStore(reducer)

const incDispatch = () => dispatch(inc())
const decDispatch = () => dispatch(dec())

subscribe(() => {
  updateDiv();
})

const  App = () => {

  return (
    <div className="App">
      <Button onClick={incDispatch} variant="dark">+</Button>
      <Button onClick={decDispatch} variant="dark">-</Button>
    </div>
  );
}

const div = document.getElementById('counter')

function updateDiv(){
  div.textContent = getState();
}

updateDiv();


export default App;
