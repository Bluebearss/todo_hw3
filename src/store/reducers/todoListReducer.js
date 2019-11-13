import * as actionCreators from '../actions/actionCreators';

const initState = {
    todoLists: [],
    id: ''
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 
        case actionCreators.GO_HOME:
            return
            {
                ...state,
                id: ''
            };
        case actionCreators.CREATE_TODO_LIST:
            return
            {
                ...state,
                id: action.payload
            };
        case actionCreators.CREATE_TODO_LIST_ERROR:
            return
            {
                ...state
            }
        default:
            return state;
            break;
    }
};

export default todoListReducer;