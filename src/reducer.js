const initialState = {value: 1};

export const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'INC': return {...state, value: state.value + 1};
    case 'DEC': return {...state, value: state.value - 1};
    default: return state;
  };
};
