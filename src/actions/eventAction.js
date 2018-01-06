import * as actionTypes from './actionTypes';

let nextId = 0

export const createEvent = (event) => {
    event.id = nextId++
    return {
      type: actionTypes.CREATE_NEW_EVENT,
      event: event
    }
  };

export const deleteEvent = (id) => {
    return {
        type: actionTypes.REMOVE_EVENT,
        id: id
    }
}