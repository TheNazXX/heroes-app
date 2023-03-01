import {Button, Badge, Stack} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {inc, dec} from '../../actions.js';
import { useSelector, useDispatch } from 'react-redux';

import './app.scss';

const  App = () => {

  const {value} = useSelector(state => state);
  const dispatch = useDispatch()

  return (
    <div className="App">
      <Stack direction='horizontal' gap={3}>
        <Button onClick={() => dispatch(inc())} variant="dark">INC</Button>
        <h3><Badge bg="secondary">{value}</Badge></h3>
        <Button onClick={() => dispatch(dec())} variant="dark">DEC</Button>
      </Stack>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     counter: state.value
//   }
// }

// 1) const mapDispatchToProps = (dispatch) => {
//   return {
//     inc: () => dispatch({type: 'INC'}),
//     dec: () => dispatch({type: 'DEC'})
//   }
// }

// 2) const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);


export default App;
