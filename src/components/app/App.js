import {Button, Badge, Stack} from 'react-bootstrap';
import {connect} from 'react-redux';

import './app.scss';

const  App = ({counter, inc, dec}) => {
  return (
    <div className="App">
      <Stack direction='horizontal' gap={3}>
        <Button onClick={inc} variant="dark">INC</Button>
        <h3><Badge bg="secondary">{counter}</Badge></h3>
        <Button onClick={dec} variant="dark">DEC</Button>
      </Stack>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    counter: state.value
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inc: () => dispatch({type: 'INC'}),
    dec: () => dispatch({type: 'DEC'})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
