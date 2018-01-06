import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    switch (action.type){
      case actionTypes.CREATE_NEW_EVENT:
      return [
        ...state,
        Object.assign({}, action.event)
      ];
      case actionTypes.REMOVE_EVENT:
      return state.filter(data => data.id !== action.id);
      default:
            return state;
    }
  };