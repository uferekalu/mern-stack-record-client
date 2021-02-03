import { 
    SET_USER, 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED, 
    DELETE_USER,
    FILTER_BY_NAME 
} from '../types';

const initialState = {
    authenticated: false,
    list: []
};

export default function(state = initialState, action) {
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return {
                ...state,
                authenticated: false
            }
        case SET_USER:
            return {
                authenticated: true,
                list: [...action.payload]
            };
        case DELETE_USER:
            return {
                ...state,
                list: state.list.filter(x => x._id !== action.payload)
            };
        case FILTER_BY_NAME: 
            let newState = Object.assign({}, state);
            let value = action.payload.value
            return {
                ...state,
                list: state.list.filter(item => {
                    return item.name.toLowerCase().includes(value) || item.dept.toLowerCase().includes(value)
                })
            }
        default:
            return state;
    }
}
